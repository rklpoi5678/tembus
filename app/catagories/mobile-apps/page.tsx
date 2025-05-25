import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smartphone, Star, Filter, Search, Zap, User, Download, Shield } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"

export default function MobileAppsPage() {
  const appProducts = [
    {
      id: 1,
      name: "프리미엄 사진 편집 앱",
      price: "₩15,000",
      originalPrice: "₩25,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 1256,
      badge: "인기",
      category: "사진/비디오",
      platform: "iOS/Android",
    },
    {
      id: 2,
      name: "생산성 관리 도구",
      price: "₩12,000",
      originalPrice: "₩18,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 889,
      badge: "베스트",
      category: "생산성",
      platform: "iOS/Android",
    },
    {
      id: 3,
      name: "언어 학습 앱 프리미엄",
      price: "₩20,000",
      originalPrice: "₩30,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 2134,
      badge: "할인",
      category: "교육",
      platform: "iOS/Android",
    },
    {
      id: 4,
      name: "피트니스 트래커 프로",
      price: "₩18,000",
      originalPrice: "₩25,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 567,
      badge: "건강",
      category: "건강/피트니스",
      platform: "iOS/Android",
    },
    {
      id: 5,
      name: "음악 제작 스튜디오",
      price: "₩35,000",
      originalPrice: "₩50,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 423,
      badge: "프로",
      category: "음악",
      platform: "iOS/Android",
    },
    {
      id: 6,
      name: "게임 개발 도구",
      price: "₩45,000",
      originalPrice: "₩65,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 298,
      badge: "개발자",
      category: "개발자 도구",
      platform: "iOS/Android",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">디지털마켓</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <CartIcon />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">홈</Link> / 
          <span className="text-foreground"> 모바일 앱</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Smartphone className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">모바일 앱</h1>
              <p className="text-xl text-green-100">프리미엄 모바일 앱을 특별가에</p>
            </div>
          </div>
          <p className="text-lg text-green-100 max-w-2xl">
            생산성, 교육, 엔터테인먼트 등 다양한 카테고리의 프리미엄 모바일 앱을 iOS와 Android에서 이용하세요.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">검증된 앱</h3>
                <p className="text-sm text-muted-foreground">안전하고 신뢰할 수 있는 앱</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">즉시 이용</h3>
                <p className="text-sm text-muted-foreground">구매 후 바로 다운로드</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">멀티 플랫폼</h3>
                <p className="text-sm text-muted-foreground">iOS, Android 지원</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="앱 검색..." className="pl-10 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 카테고리</SelectItem>
                  <SelectItem value="productivity">생산성</SelectItem>
                  <SelectItem value="education">교육</SelectItem>
                  <SelectItem value="photo">사진/비디오</SelectItem>
                  <SelectItem value="health">건강/피트니스</SelectItem>
                  <SelectItem value="music">음악</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="플랫폼" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 플랫폼</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="price-low">가격 낮은순</SelectItem>
                  <SelectItem value="price-high">가격 높은순</SelectItem>
                  <SelectItem value="rating">평점순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {appProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-transform"
                      />
                    </Link>
                    <Badge
                      className="absolute top-2 left-2"
                      variant={product.badge === "할인" ? "destructive" : "default"}
                    >
                      {product.badge}
                    </Badge>
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {product.platform}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>상세보기</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
