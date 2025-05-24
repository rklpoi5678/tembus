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

    const { productId, quantity = 1 } = await request.json()

    if (!productId || quantity < 1) {
      return NextResponse.json({ error: "Invalid product ID or quantity" }, { status: 400 })
    }

    // 제품 존재 확인
    const productResult = await sql`
      SELECT id, name, price, stock_quantity
      FROM products
      WHERE id = ${productId} AND is_active = true
    `

    if (productResult.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const product = productResult[0]

    if (product.stock_quantity < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 })
    }

    // 장바구니에 추가 또는 업데이트
    await sql`
      INSERT INTO cart_items (user_id, product_id, quantity, created_at)
      VALUES (${user.id}, ${productId}, ${quantity}, NOW())
      ON CONFLICT (user_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + ${quantity}
    `

    return NextResponse.json({ success: true, message: "장바구니에 추가되었습니다." })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cartResult = await sql`
      SELECT 
        ci.*,
        p.name,
        p.price,
        p.image_url
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ${user.id}
      ORDER BY ci.created_at DESC
    `

    return NextResponse.json({ items: cartResult })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
