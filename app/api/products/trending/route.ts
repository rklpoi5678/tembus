import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const trendingProducts = await prisma.product.findMany({
      where: {
        featured: true,
        is_active: true
        //추후 삭제 시간 null
      },
      include: {
        seller: {
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true,
                        verified: true
                    }
                }
            }
        },
        product_images: true,
        categories: true
      },
      orderBy: [
        {
            rating: 'desc'
        },
        {
            review_count: 'desc'
        }
      ],
      take: 8
    })
    
    return NextResponse.json(trendingProducts)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch trending products' },
      { status: 500 }
    )
  }
}
