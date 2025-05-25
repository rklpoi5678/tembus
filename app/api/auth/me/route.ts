import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ success: false, message: "인증되지 않은 사용자입니다." }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Get current user error:", error)
    return NextResponse.json({ success: false, message: "사용자 정보를 가져오는 중 오류가 발생했습니다." }, { status: 500 })
  }
} 