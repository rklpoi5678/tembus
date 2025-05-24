import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Shield, Download, Truck, RefreshCw } from "lucide-react"
import { ProductGallery } from "@/components/product-gallery"
import { AddToCart } from "@/components/add-to-cart"
import { ProductReviews } from "@/components/product-reviews"
import { ProductRecommendations } from "@/components/product-recommendations"

async function getProduct(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/products/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price)
  }

  const discountPercentage = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      {/* 브레드크럼 */}
      <div className="container py-4">
        <nav className="text-sm text-muted-foreground">
          <span>홈</span> / <span>{product.category_name}</span> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 제품 이미지 */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* 제품 정보 */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category_name}
              </Badge>
              <h1 className="text-3xl font-bold">{product.name}</h1>

              {/* 평점 */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.review_count}개 리뷰)</span>
              </div>
            </div>

            {/* 가격 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.original_price > product.price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.original_price)}
                    </span>
                    <Badge variant="destructive">{discountPercentage}% 할인</Badge>
                  </>
                )}
              </div>
              {product.original_price > product.price && (
                <p className="text-sm text-muted-foreground">
                  {formatPrice(product.original_price - product.price)} 절약
                </p>
              )}
            </div>

            {/* 장바구니 추가 */}
            <AddToCart product={product} />

            {/* 특징 */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    <span className="text-sm">즉시 다운로드</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm">안전한 거래</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-sm">24시간 지원</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <span className="text-sm">환불 보장</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* 제품 설명 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">제품 설명</h2>
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                {product.description.split("\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* 리뷰 섹션 */}
        <ProductReviews
          productId={product.id}
          reviews={product.reviews}
          averageRating={product.rating}
          totalReviews={product.review_count}
        />

        <Separator className="my-12" />

        {/* 관련 상품 */}
        <ProductRecommendations products={product.relatedProducts} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: "제품을 찾을 수 없습니다",
    }
  }

  return {
    title: `${product.name} - 디지털마켓`,
    description: product.description.slice(0, 160),
  }
}
