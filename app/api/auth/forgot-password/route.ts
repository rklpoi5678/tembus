import { type NextRequest, NextResponse } from "next/server"
import { createPasswordResetToken } from "@/lib/auth"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = forgotPasswordSchema.parse(body)

    const result = await createPasswordResetToken(validatedData.email)

    return NextResponse.json({
      success: result.success,
      message: result.message,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 })
    }

    console.error("Forgot password error:", error)
    return NextResponse.json(
      { success: false, message: "비밀번호 재설정 요청 중 오류가 발생했습니다." },
      { status: 500 },
    )
  }
}
