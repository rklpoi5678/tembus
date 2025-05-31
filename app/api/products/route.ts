// app/api/products/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
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