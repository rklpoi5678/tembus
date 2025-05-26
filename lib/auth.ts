import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "seller" | "customer"
  emailVerified: boolean
  createdAt: string
}

export interface AuthResult {
  success: boolean
  message: string
  user?: User
}

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// 비밀번호 검증
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// 세션 토큰 생성
export function generateSessionToken(): string {
  return crypto.randomUUID() + "-" + Date.now().toString(36)
}

// 리셋 토큰 생성
export function generateResetToken(): string {
  return crypto.randomUUID()
}

// 사용자 생성
export async function createUser(email: string, password: string, name: string, role: "admin" | "seller" | "customer" = "customer"): Promise<AuthResult> {
  try {
    // 이메일 중복 확인
    const existingUser = await sql`
      SELECT id FROM public.users WHERE email = ${email} AND deleted_at IS NULL
    `

    if (existingUser.length > 0) {
      return { success: false, message: "이미 사용 중인 이메일입니다." }
    }

    // 사용자 생성
    const userId = crypto.randomUUID()
    const hashedPassword = await hashPassword(password)

    await sql`
      INSERT INTO public.users (id, email, name, role, created_at, updated_at)
      VALUES (${userId}, ${email}, ${name}, ${role}, NOW(), NOW())
    `

    await sql`
      INSERT INTO public.user_auth (user_id, password_hash, created_at, updated_at)
      VALUES (${userId}, ${hashedPassword}, NOW(), NOW())
    `

    const user: User = {
      id: userId,
      email,
      name,
      role,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    }

    return { success: true, message: "회원가입이 완료되었습니다.", user }
  } catch (error) {
    console.error("User creation error:", error)
    return { success: false, message: "회원가입 중 오류가 발생했습니다." }
  }
}

// 사용자 인증
export async function authenticateUser(email: string, password: string): Promise<AuthResult> {
  try {
    const result = await sql`
      SELECT u.id, u.email, u.name, u.role, ua.password_hash, ua.email_verified
      FROM public.users u
      JOIN public.user_auth ua ON u.id = ua.user_id
      WHERE u.email = ${email} AND u.deleted_at IS NULL
    `

    if (result.length === 0) {
      return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." }
    }

    const userData = result[0]
    const isValidPassword = await verifyPassword(password, userData.password_hash)

    if (!isValidPassword) {
      return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." }
    }

    // 마지막 로그인 시간 업데이트
    await sql`
      UPDATE public.user_auth SET last_login = NOW() WHERE user_id = ${userData.id}
    `

    const user: User = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      emailVerified: userData.email_verified,
      createdAt: userData.created_at,
    }

    return { success: true, message: "로그인 성공", user }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, message: "로그인 중 오류가 발생했습니다." }
  }
}

// 세션 생성
export async function createSession(userId: string, rememberMe = false): Promise<string> {
  const sessionToken = generateSessionToken()
  const expiresAt = new Date()

  if (rememberMe) {
    expiresAt.setDate(expiresAt.getDate() + 30) // 30일
  } else {
    expiresAt.setDate(expiresAt.getDate() + 7) // 7일
  }

  await sql`
    INSERT INTO public.user_sessions (user_id, session_token, expires_at, created_at, updated_at)
    VALUES (${userId}, ${sessionToken}, ${expiresAt.toISOString()}, NOW(), NOW())
  `

  // 쿠키 설정
  const cookieStore = await cookies()
  cookieStore.set("session_token", sessionToken, {
    expires: expiresAt,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return sessionToken
}

// 현재 사용자 가져오기
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session_token")?.value

    if (!sessionToken) {
      return null
    }

    const result = await sql`
      SELECT u.id, u.email, u.name, u.role, ua.email_verified, u.created_at
      FROM public.user_sessions s
      JOIN public.users u ON s.user_id = u.id
      JOIN public.user_auth ua ON u.id = ua.user_id
      WHERE s.session_token = ${sessionToken} 
        AND s.expires_at > NOW() 
        AND u.deleted_at IS NULL
    `

    if (result.length === 0) {
      return null
    }

    const userData = result[0]
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      emailVerified: userData.email_verified,
      createdAt: userData.created_at,
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// 로그아웃
export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session_token")?.value

  if (sessionToken) {
    await sql`
      DELETE FROM public.user_sessions WHERE session_token = ${sessionToken}
    `
  }

  cookieStore.delete("session_token")
}

// 비밀번호 리셋 토큰 생성
export async function createPasswordResetToken(email: string): Promise<AuthResult> {
  try {
    const result = await sql`
      SELECT id FROM public.users WHERE email = ${email} AND deleted_at IS NULL
    `

    if (result.length === 0) {
      return { success: false, message: "해당 이메일로 등록된 계정을 찾을 수 없습니다." }
    }

    const userId = result[0].id
    const resetToken = generateResetToken()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) // 1시간 후 만료

    await sql`
      UPDATE public.user_auth
      SET reset_token = ${resetToken}, reset_token_expires = ${expiresAt.toISOString()}
      WHERE user_id = ${userId}
    `

    return { success: true, message: "비밀번호 재설정 링크가 이메일로 전송되었습니다.", token: resetToken }
  } catch (error) {
    console.error("Password reset token creation error:", error)
    return { success: false, message: "비밀번호 재설정 요청 중 오류가 발생했습니다." }
  }
}

// 보호된 페이지를 위한 미들웨어
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}
