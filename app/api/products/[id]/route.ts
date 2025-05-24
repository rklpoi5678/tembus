import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    // 제품 정보 가져오기
    const productResult = await sql`
      SELECT 
        p.*,
        c.name as category_name,
        c.icon as category_icon
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${productId} AND p.is_active = true
    `

    if (productResult.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const product = productResult[0]

    // 제품 이미지 가져오기
    const imagesResult = await sql`
      SELECT image_url, alt_text, is_primary, sort_order
      FROM product_images
      WHERE product_id = ${productId}
      ORDER BY sort_order ASC
    `

    // 리뷰 가져오기
    const reviewsResult = await sql`
      SELECT 
        r.*,
        u.name as user_name
      FROM reviews r
      LEFT JOIN neon_auth.users_sync u ON r.user_id = u.id
      WHERE r.product_id = ${productId}
      ORDER BY r.created_at DESC
      LIMIT 10
    `

    // 관련 제품 가져오기 (같은 카테고리)
    const relatedResult = await sql`
      SELECT id, name, price, original_price, image_url, rating, review_count
      FROM products
      WHERE category_id = ${product.category_id} 
        AND id != ${productId} 
        AND is_active = true
      ORDER BY rating DESC
      LIMIT 4
    `

    return NextResponse.json({
      product: {
        ...product,
        images: imagesResult,
        reviews: reviewsResult,
        relatedProducts: relatedResult,
      },
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
