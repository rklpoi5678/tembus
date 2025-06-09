// import prisma from "@/lib/prisma"
// import bcrypt from "bcryptjs"
// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
// import { UserRole, User } from "@/lib/types"


// export interface AuthResult {
//   success: boolean
//   message: string
//   user?: User
//   token?: string
// }

// // 비밀번호 해싱
// export async function hashPassword(password: string): Promise<string> {
//   return bcrypt.hash(password, 12)
// }

// // 비밀번호 검증
// export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
//   return bcrypt.compare(password, hashedPassword)
// }

// // 세션 토큰 생성
// export function generateSessionToken(): string {
//   return crypto.randomUUID() + "-" + Date.now().toString(36)
// }

// // 리셋 토큰 생성
// export function generateResetToken(): string {
//   return crypto.randomUUID()
// }

// // 사용자 생성
// export async function createUser(
//   email: string, 
//   password: string, 
//   name: string, 
//   role: "admin" | "seller" | "customer" = "customer"
// ): Promise<AuthResult> {
//   try {
//     // 이메일 중복 확인
//     const existingUser = await prisma.users.findFirst({
//       where: {
//         email,
//         deleted_at: null,
//       },
//     })

//     if (existingUser) {
//       return { success: false, message: "이미 사용 중인 이메일입니다." }
//     }

//     const hashedPassword = await hashPassword(password)
    
//     // 트랜잭션으로 사용자와 인증 정보 동시 생성
//     const user = await prisma.$transaction(async (tx) => {
//       const newUser = await tx.users.create({
//         data: {
//           id: crypto.randomUUID(),
//           email,
//           name,
//           role: UserRole.buyer,
//           auth: {
//             create: {
//               password_hash: hashedPassword,
//             },
//           },
//         },
//       })

//       return newUser
//     })

//     return {
//       success: true,
//       message: "회원가입이 완료되었습니다.",
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name || "",
//         role: UserRole.buyer,
//         verified: true,
//         created_at: user.created_at || new Date(),
//       },
//     }
//   } catch (error) {
//     console.error("User creation error:", error)
//     return { success: false, message: "회원가입 중 오류가 발생했습니다." }
//   }
// }

// // 사용자 인증
// export async function authenticateUser(email: string, password: string): Promise<AuthResult> {
//   try {
//     const user = await prisma.users.findFirst({
//       where: {
//         email,
//         deleted_at: null,
//       },
//       include: {
//         auth: true,
//       },
//     })

//     if (!user || !user.auth) {
//       return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." }
//     }

//     const isValidPassword = await verifyPassword(password, user.auth.password_hash)

//     if (!isValidPassword) {
//       return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." }
//     }

//     // 마지막 로그인 시간 업데이트
//     await prisma.user_auth.update({
//       where: { user_id: user.id },
//       data: { last_login: new Date() },
//     })

//     return {
//       success: true,
//       message: "로그인 성공",
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name || "",
//         role: UserRole.seller,
//         verified: true,
//         created_at: user.created_at || new Date(),
//       },
//     }
//   } catch (error) {
//     console.error("Authentication error:", error)
//     return { success: false, message: "로그인 중 오류가 발생했습니다." }
//   }
// }

// // 세션 생성
// export async function createSession(userId: string, rememberMe = false): Promise<string> {
//   const sessionToken = generateSessionToken()
//   const expiresAt = new Date()
  
//   if (rememberMe) {
//     expiresAt.setDate(expiresAt.getDate() + 30) // 30일
//   } else {
//     expiresAt.setDate(expiresAt.getDate() + 7) // 7일
//   }

//   await prisma.user_sessions.create({
//     data: {
//       user_id: userId,
//       session_token: sessionToken,
//       expires_at: expiresAt,
//     },
//   })

//   const cookieStore = await cookies()
//   cookieStore.set("session_token", sessionToken, {
//     expires: expiresAt,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//   })

//   return sessionToken
// }

// // 현재 사용자 가져오기
// export async function getCurrentUser(): Promise<User | null> {
//   try {
//     const cookieStore = await cookies()
//     const sessionToken = cookieStore.get("session_token")?.value

//     if (!sessionToken) {
//       return null
//     }

//     const session = await prisma.user_sessions.findFirst({
//       where: {
//         session_token: sessionToken,
//         expires_at: {
//           gt: new Date(),
//         },
//       },
//       include: {
//         user: {
//           include: {
//             auth: true,
//           },
//         },
//       },
//     })

//     if (!session || !session.user || session.user.deleted_at) {
//       return null
//     }

//     return {
//       id: session.user.id,
//       email: session.user.email,
//       name: session.user.name || "",
//       role: UserRole.seller,
//       verified: session.user.verified ?? false,
//       created_at: session.user.created_at || new Date(),
//     }
//   } catch (error) {
//     console.error("Get current user error:", error)
//     return null
//   }
// }

// // 로그아웃
// export async function logout(): Promise<void> {
//   const cookieStore = await cookies()
//   const sessionToken = cookieStore.get("session_token")?.value

//   if (sessionToken) {
//     await prisma.user_sessions.deleteMany({
//       where: { session_token: sessionToken },
//     })
//   }

//   cookieStore.delete("session_token")
// }

// // 비밀번호 리셋 토큰 생성
// export async function createPasswordResetToken(email: string): Promise<AuthResult> {
//   try {
//     const user = await prisma.users.findFirst({
//       where: {
//         email,
//         deleted_at: null,
//       },
//     })

//     if (!user) {
//       return { success: false, message: "해당 이메일로 등록된 계정을 찾을 수 없습니다." }
//     }

//     const resetToken = generateResetToken()
//     const expiresAt = new Date()
//     expiresAt.setHours(expiresAt.getHours() + 1) // 1시간 후 만료

//     await prisma.user_auth.update({
//       where: { user_id: user.id },
//       data: {
//         reset_token: resetToken,
//         reset_token_expires: expiresAt,
//       },
//     })

//     return { 
//       success: true, 
//       message: "비밀번호 재설정 링크가 이메일로 전송되었습니다.",
//       token: resetToken,
//     }
//   } catch (error) {
//     console.error("Password reset token creation error:", error)
//     return { success: false, message: "비밀번호 재설정 요청 중 오류가 발생했습니다." }
//   }
// }

// // 보호된 페이지를 위한 미들웨어
// export async function requireAuth(): Promise<User> {
//   const user = await getCurrentUser()
//   if (!user) {
//     redirect("/login")
//   }
//   return user
// }
