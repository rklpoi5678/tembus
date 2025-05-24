import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getCurrentUser } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // 제품 존재 확인
    const productResult = await sql`
      SELECT id, name FROM products WHERE id = ${productId} AND is_active = true
    `

    if (productResult.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // 이미 위시리스트에 있는지 확인
    const existingWishlist = await sql`
      SELECT id FROM wishlists WHERE user_id = ${user.id} AND product_id = ${productId}
    `

    if (existingWishlist.length > 0) {
      // 이미 있으면 제거
      await sql`
        DELETE FROM wishlists WHERE user_id = ${user.id} AND product_id = ${productId}
      `
      return NextResponse.json({ success: true, message: "위시리스트에서 제거되었습니다.", action: "removed" })
    } else {
      // 없으면 추가
      await sql`
        INSERT INTO wishlists (user_id, product_id, created_at)
        VALUES (${user.id}, ${productId}, NOW())
      `
      return NextResponse.json({ success: true, message: "위시리스트에 추가되었습니다.", action: "added" })
    }
  } catch (error) {
    console.error("Error managing wishlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const wishlistResult = await sql`
      SELECT 
        w.*,
        p.name,
        p.price,
        p.original_price,
        p.image_url,
        p.rating,
        p.review_count
      FROM wishlists w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ${user.id} AND p.is_active = true
      ORDER BY w.created_at DESC
    `

    return NextResponse.json({ items: wishlistResult })
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
