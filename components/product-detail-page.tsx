"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Shield,
  Download,
  Truck,
  RefreshCw,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Play,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  User,
} from "lucide-react"
import { CartIcon } from "@/components/cart-icon"
import { AddToCart } from "@/components/add-to-cart"

interface ProductImage {
  url: string
  alt: string
  type: "image" | "video"
}

interface ProductSpec {
  label: string
  value: string
}

interface ProductReview {
  id: number
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
}

interface RelatedProduct {
  id: number
  name: string
  price: string
  originalPrice: string
  image: string
  rating: number
  reviews: number
}

interface ProductDetailProps {
  product: {
    id: number
    name: string
    price: string
    originalPrice: string
    description: string
    longDescription: string
    category: string
    badge: string
    rating: number
    reviewCount: number
    images: ProductImage[]
    specifications: ProductSpec[]
    features: string[]
    systemRequirements?: ProductSpec[]
    downloadSize?: string
    version?: string
    developer?: string
    releaseDate?: string
    languages?: string[]
    platforms?: string[]
    genre?: string
    duration?: string
    trackCount?: number
    format?: string[]
    stockQuantity: number
  }
  reviews: ProductReview[]
  relatedProducts: RelatedProduct[]
}

export function ProductDetailPage({ product, reviews, relatedProducts }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  const discountPercentage =
    product.originalPrice && product.price
      ? Math.round(
          ((Number.parseFloat(product.originalPrice.replace(/[^0-9]/g, "")) -
            Number.parseFloat(product.price.replace(/[^0-9]/g, ""))) /
            Number.parseFloat(product.originalPrice.replace(/[^0-9]/g, ""))) *
            100,
        )
      : 0

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const ratingDistribution = [
    { stars: 5, count: Math.floor(reviews.length * 0.6), percentage: 60 },
    { stars: 4, count: Math.floor(reviews.length * 0.25), percentage: 25 },
    { stars: 3, count: Math.floor(reviews.length * 0.1), percentage: 10 },
    { stars: 2, count: Math.floor(reviews.length * 0.03), percentage: 3 },
    { stars: 1, count: Math.floor(reviews.length * 0.02), percentage: 2 },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Breadcrumb */}
      <div className="container py-6 px-8">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-500">
            홈
          </Link>
          {" / "}
          <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-blue-500">
            {product.category}
          </Link>
          {" / "}
          <span className="text-gray-800">{product.name}</span>
        </nav>
      </div>

      <div className="container pb-16 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-5">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
              {product.images[currentImageIndex]?.type === "video" ? (
                <video
                  src={product.images[currentImageIndex].url}
                  className="w-full h-full object-cover"
                  controls
                  poster="/placeholder.svg?height=600&width=600"
                />
              ) : (
                <Image
                  src={product.images[currentImageIndex]?.url || "/placeholder.svg?height=600&width=600"}
                  alt={product.images[currentImageIndex]?.alt || product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  priority
                />
              )}

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Badge */}
              <Badge className="absolute top-4 left-4" variant={product.badge === "할인" ? "destructive" : "default"}>
                {product.badge}
              </Badge>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image.url || "/placeholder.svg?height=150&width=150"}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {image.type === "video" && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary">{product.category}</Badge>
                {product.platforms && (
                  <div className="flex gap-1">
                    {product.platforms.includes("iOS") && <Smartphone className="h-4 w-4 text-gray-600" />}
                    {product.platforms.includes("Android") && <Tablet className="h-4 w-4 text-gray-600" />}
                    {product.platforms.includes("Windows") && <Monitor className="h-4 w-4 text-gray-600" />}
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                {renderStars(product.rating, "w-5 h-5")}
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviewCount}개 리뷰)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-blue-500">{product.price}</span>
                {product.originalPrice && product.originalPrice !== product.price && (
                  <>
                    <span className="text-xl text-gray-600 line-through">{product.originalPrice}</span>
                    {discountPercentage > 0 && <Badge variant="destructive">{discountPercentage}% 할인</Badge>}
                  </>
                )}
              </div>
              {product.originalPrice && product.originalPrice !== product.price && (
                <p className="text-sm text-gray-600">
                  {(
                    Number.parseFloat(product.originalPrice.replace(/[^0-9]/g, "")) -
                    Number.parseFloat(product.price.replace(/[^0-9]/g, ""))
                  ).toLocaleString()}
                  원 절약
                </p>
              )}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-5 p-4 bg-gray-50 rounded-lg">
              {product.developer && (
                <div>
                  <p className="text-sm text-gray-600">개발사</p>
                  <p className="font-medium">{product.developer}</p>
                </div>
              )}
              {product.version && (
                <div>
                  <p className="text-sm text-gray-600">버전</p>
                  <p className="font-medium">{product.version}</p>
                </div>
              )}
              {product.downloadSize && (
                <div>
                  <p className="text-sm text-gray-600">용량</p>
                  <p className="font-medium">{product.downloadSize}</p>
                </div>
              )}
              {product.releaseDate && (
                <div>
                  <p className="text-sm text-gray-600">출시일</p>
                  <p className="font-medium">{product.releaseDate}</p>
                </div>
              )}
              {product.trackCount && (
                <div>
                  <p className="text-sm text-gray-600">트랙 수</p>
                  <p className="font-medium">{product.trackCount}곡</p>
                </div>
              )}
              {product.duration && (
                <div>
                  <p className="text-sm text-gray-600">재생시간</p>
                  <p className="font-medium">{product.duration}</p>
                </div>
              )}
            </div>

            {/* Languages */}
            {product.languages && (
              <div>
                <p className="text-sm text-gray-600 mb-2">지원 언어</p>
                <div className="flex flex-wrap gap-2">
                  {product.languages.map((lang, index) => (
                    <Badge key={index} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Format */}
            {product.format && (
              <div>
                <p className="text-sm text-gray-600 mb-2">지원 포맷</p>
                <div className="flex flex-wrap gap-2">
                  {product.format.map((fmt, index) => (
                    <Badge key={index} variant="outline">
                      {fmt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart */}
            <AddToCart
              product={{
                id: product.id,
                name: product.name,
                price: Number.parseFloat(product.price.replace(/[^0-9]/g, "")),
                stock_quantity: product.stockQuantity,
              }}
            />

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">즉시 다운로드</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">안전한 거래</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">24시간 지원</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">환불 보장</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">상품설명</TabsTrigger>
            <TabsTrigger value="specifications">사양</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="qa">Q&A</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>상품 설명</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                  <div className="space-y-4">
                    {product.longDescription.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">주요 기능</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>상품 사양</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.specifications && product.specifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4">기본 사양</h3>
                      <div className="space-y-3">
                        {product.specifications.map((spec, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">{spec.label}</span>
                            <span className="font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.systemRequirements && product.systemRequirements.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4">시스템 요구사항</h3>
                      <div className="space-y-3">
                        {product.systemRequirements.map((req, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">{req.label}</span>
                            <span className="font-medium">{req.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-8">
              {/* Review Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>고객 리뷰</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{product.rating}</div>
                      {renderStars(product.rating, "w-6 h-6")}
                      <p className="text-gray-600 mt-2">{product.reviewCount}개의 리뷰</p>
                    </div>
                    <div className="space-y-2">
                      {ratingDistribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{item.stars}점</span>
                          <Progress value={item.percentage} className="flex-1" />
                          <span className="text-sm text-gray-600 w-12">{item.count}개</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                구매 확인
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{review.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{review.comment}</p>
                      <Button variant="ghost" size="sm">
                        도움됨 ({review.helpful})
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qa" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>자주 묻는 질문</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Q: 다운로드는 어떻게 하나요?</h4>
                    <p className="text-gray-600">
                      A: 구매 완료 후 마이페이지에서 다운로드 링크를 확인하실 수 있습니다.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Q: 환불이 가능한가요?</h4>
                    <p className="text-gray-600">
                      A: 다운로드 전까지는 무조건 환불 가능하며, 다운로드 후에는 7일 이내 상품 하자 시에만 환불
                      가능합니다.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Q: 여러 기기에서 사용할 수 있나요?</h4>
                    <p className="text-gray-600">
                      A: 라이선스 정책에 따라 다르며, 상품 설명에서 자세한 내용을 확인하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">관련 상품</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="relative aspect-square">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg?height=200&width=200"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover rounded-t-lg hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h4 className="font-semibold line-clamp-2 hover:text-blue-500 transition-colors mb-2">
                        {relatedProduct.name}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{relatedProduct.rating}</span>
                      <span className="text-sm text-muted-foreground">({relatedProduct.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 디지털마켓. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
