import { type NextRequest, NextResponse } from "next/server"
import { createPasswordResetToken } from "@/lib/auth"
import { z } from "zod"
import nodemailer from "nodemailer"

const forgotPasswordSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
})

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = forgotPasswordSchema.parse(body)

    const result = await createPasswordResetToken(validatedData.email)

    if (result.success) {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: validatedData.email,
        subject: "비밀번호 재설정 요청",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4F46E5; text-align: center;">비밀번호 재설정</h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin-bottom: 15px;">안녕하세요,</p>
              <p style="margin-bottom: 15px;">비밀번호 재설정을 요청하셨습니다. 아래 링크를 클릭하여 비밀번호를 재설정하실 수 있습니다:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${result.token}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
                  비밀번호 재설정하기
                </a>
              </div>
              <p style="margin-bottom: 15px;">이 링크는 1시간 동안 유효합니다.</p>
              <p style="margin-bottom: 15px;">비밀번호 재설정을 요청하지 않으셨다면, 이 이메일을 무시하셔도 됩니다.</p>
            </div>
            <p style="text-align: center; color: #6B7280; font-size: 14px;">© 2024 디지털마켓. All rights reserved.</p>
          </div>
        `,
      }

      try {
        await transporter.sendMail(mailOptions)
      } catch (emailError) {
        console.error("이메일 전송 실패:", emailError)
        return NextResponse.json(
          { success: false, message: "이메일 전송에 실패했습니다." },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      token: result.token,
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
