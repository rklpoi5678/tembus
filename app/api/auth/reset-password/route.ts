import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { neon } from "@neondatabase/serverless"
import { hashPassword } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = resetPasswordSchema.parse(body)

    // 토큰으로 사용자 찾기
    const result = await sql`
      SELECT ua.user_id, ua.reset_token_expires
      FROM public.user_auth ua
      WHERE ua.reset_token = ${validatedData.token}
        AND ua.reset_token_expires > NOW()
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "유효하지 않거나 만료된 토큰입니다." },
        { status: 400 }
      )
    }

    const userId = result[0].user_id
    const hashedPassword = await hashPassword(validatedData.password)

    // 비밀번호 업데이트 및 토큰 초기화
    await sql`
      UPDATE public.user_auth
      SET password_hash = ${hashedPassword},
          reset_token = NULL,
          reset_token_expires = NULL
      WHERE user_id = ${userId}
    `

    return NextResponse.json({
      success: true,
      message: "비밀번호가 성공적으로 변경되었습니다.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 })
    }

    console.error("Reset password error:", error)
    return NextResponse.json(
      { success: false, message: "비밀번호 재설정 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
