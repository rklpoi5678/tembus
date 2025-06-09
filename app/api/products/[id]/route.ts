import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    // 제품, 카테고리, 이미지, 리뷰를 한 번에 가져오기
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        is_active: true,
      },
      include: {
        categories: {
          select: {
            name: true,
            icon: true,
          },
        },
        product_images: {
          orderBy: {
            sort_order: 'asc',
          },
          select: {
            image_url: true,
            alt_text: true,
            is_primary: true,
            sort_order: true,
          },
        },
        reviews: {
          take: 10,
          orderBy: {
            created_at: 'desc',
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // 관련 제품 가져오기
    const relatedProducts = await prisma.product.findMany({
      where: {
        category_id: product.category_id,
        id: {
          not: productId,
        },
        is_active: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 4,
      select: {
        id: true,
        name: true,
        price: true,
        original_price: true,
        image_url: true,
        rating: true,
        review_count: true,
      },
    })

    return NextResponse.json({
      product: {
        ...product,
        category_name: product.categories?.name,
        category_icon: product.categories?.icon,
        relatedProducts,
      },
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
