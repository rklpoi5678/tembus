import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const category = searchParams.get('category') || 'All'
    const minPrice = Number(searchParams.get('minPrice')) || 0
    const maxPrice = Number(searchParams.get('maxPrice')) || 200
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const featured = searchParams.get('featured') === 'true'
    const isNew = searchParams.get('new') === 'true'
    const sortBy = searchParams.get('sortBy') || 'trending'

    const products = await prisma.product.findMany({
      where: {
        AND: [
          query ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } }
            ]
          } : {},
          category !== 'All' ? { category } : {},
          { price: { gte: minPrice, lte: maxPrice } },
          tags.length > 0 ? { tags: { hasSome: tags } } : {},
          featured ? { featured: true } : {},
          isNew ? { new: true } : {}
        ]
      },
      include: {
        creator: true,
      },
      orderBy: sortBy === 'trending' 
        ? [{ trending: 'desc' }, { downloads: 'desc' }]
        : sortBy === 'newest' 
        ? { createdAt: 'desc' }
        : sortBy === 'price-low'
        ? { price: 'asc' }
        : sortBy === 'price-high'
        ? { price: 'desc' }
        : sortBy === 'rating'
        ? { rating: 'desc' }
        : { downloads: 'desc' },
      take: 20
    })
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}