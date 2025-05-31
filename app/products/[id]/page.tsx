import { notFound } from "next/navigation"
import { ProductDetailPage } from "@/components/product-detail-page"
import prisma from "@/lib/prisma"
import { Product, Category, Review, ProductImage } from "@/lib/types"


type ProductWithIncludes = Product & {
  categories: Category | null
  reviews: Review[]
  product_images: ProductImage[]
}

// 리뷰 데이터를 가공하는 함수
function formatReviews(reviews: Review[]) {
  return reviews.map((review) => ({
    id: review.id,
    userName: review.user?.name || "익명",
    rating: review.rating,
    title: review.title || "제목 없음",
    comment: review.comment || "",
    date: review.created_at ? new Date(review.created_at).toLocaleDateString() : "",
    verified: review.is_verified_purchase,
    helpful: review.helpful_count
  }))
}

// 관련 상품 데이터를 가공하는 함수
function formatRelatedProducts(products: Product[]) {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: `₩${Number(product.price).toLocaleString()}`,
    originalPrice: product.original_price ? `₩${Number(product.original_price).toLocaleString()}` : `₩${Number(product.price).toLocaleString()}`,
    image: product.image_url || "/placeholder.svg",
    rating: Number(product.rating),
    reviews: product.review_count
  }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // 제품 정보 조회
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      categories: true,
      reviews: {
        include: {
          user: true
        }
      },
      product_images: true
    }
  }) as ProductWithIncludes | null

  if (!product) {
    notFound()
  }

  // 관련 상품 조회 (같은 카테고리의 다른 상품들)
  const relatedProducts = await prisma.product.findMany({
    where: {
      category_id: product.category_id,
      id: { not: product.id },
      is_active: true
    },
    include: {
      seller: true,
      product_images: true,
      reviews: true
    },
    take: 4
  }) as Product[]

  // ProductDetailPage 컴포넌트에 맞는 형식으로 데이터 가공
  const formattedProduct = {
    id: product.id,
    name: product.name,
    price: `₩${Number(product.price).toLocaleString()}`,
    originalPrice: product.original_price ? `₩${Number(product.original_price).toLocaleString()}` : `₩${Number(product.price).toLocaleString()}`,
    description: product.description || "",
    longDescription: product.description || "",
    category: product.categories?.name || "기타",
    badge: product.featured ? "인기" : product.original_price ? "할인" : "신상품",
    rating: Number(product.rating),
    reviewCount: product.review_count,
    images: product.product_images.map((img: ProductImage) => ({
      url: img.image_url,
      alt: img.alt_text || product.name,
      type: "image" as const
    })),
    specifications: product.specifications ? Object.entries(product.specifications as Record<string, unknown>).map(([key, value]) => ({
      label: key,
      value: String(value)
    })) : [],
    features: product.description?.split("\n") || [],
    stockQuantity: product.stock_quantity,
    downloadSize: product.file_size || undefined,
    version: "1.0.0",
    developer: "개발사",
    releaseDate: new Date(product.created_at).toLocaleDateString(),
    digital: product.type === 'digital'
  }

  return (
    <ProductDetailPage
      product={formattedProduct}
      reviews={formatReviews(product.reviews)}
      relatedProducts={formatRelatedProducts(relatedProducts)}
    />
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    select: { name: true }
  })

  if (!product) {
    return {
      title: "제품을 찾을 수 없습니다 - 디지털마켓",
    }
  }

  return {
    title: `${product.name} - 디지털마켓`,
    description: product.name
  }
}
