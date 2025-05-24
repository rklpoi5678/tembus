import { type NextRequest, NextResponse } from "next/server"
import { createUser, createSession } from "@/lib/auth"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  rememberMe: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const result = await createUser(validatedData.email, validatedData.password, validatedData.name)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }

    // 회원가입 성공 시 자동 로그인
    if (result.user) {
      await createSession(result.user.id, validatedData.rememberMe || false)
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      user: result.user,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 })
    }

    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "회원가입 중 오류가 발생했습니다." }, { status: 500 })
  }
}
