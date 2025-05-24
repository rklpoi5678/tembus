import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getCurrentUser } from "@/lib/auth"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const reviewSchema = z.object({
  productId: z.number(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(255),
  comment: z.string().min(1).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = reviewSchema.parse(body)

    // 이미 리뷰를 작성했는지 확인
    const existingReview = await sql`
      SELECT id FROM reviews
      WHERE user_id = ${user.id} AND product_id = ${validatedData.productId}
    `

    if (existingReview.length > 0) {
      return NextResponse.json({ error: "이미 이 제품에 대한 리뷰를 작성하셨습니다." }, { status: 400 })
    }

    // 리뷰 추가
    await sql`
      INSERT INTO reviews (user_id, product_id, rating, title, comment, created_at)
      VALUES (${user.id}, ${validatedData.productId}, ${validatedData.rating}, ${validatedData.title}, ${validatedData.comment}, NOW())
    `

    // 제품 평점 업데이트
    const avgRatingResult = await sql`
      SELECT AVG(rating)::numeric(3,2) as avg_rating, COUNT(*) as review_count
      FROM reviews
      WHERE product_id = ${validatedData.productId}
    `

    if (avgRatingResult.length > 0) {
      const { avg_rating, review_count } = avgRatingResult[0]
      await sql`
        UPDATE products
        SET rating = ${avg_rating}, review_count = ${review_count}
        WHERE id = ${validatedData.productId}
      `
    }

    return NextResponse.json({ success: true, message: "리뷰가 등록되었습니다." })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error("Error adding review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
