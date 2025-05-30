import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Monitor, Star, Filter, Search, Zap, User, Download, Shield } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"

export default function SoftwarePage() {
  const softwareProducts = [
    {
      id: 1,
      name: "Adobe Creative Suite 2024",
      price: "₩89,000",
      originalPrice: "₩120,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 256,
      badge: "인기",
      category: "디자인",
    },
    {
      id: 2,
      name: "Microsoft Office 365",
      price: "₩45,000",
      originalPrice: "₩60,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 189,
      badge: "할인",
      category: "오피스",
    },
    {
      id: 3,
      name: "AutoCAD 2024",
      price: "₩125,000",
      originalPrice: "₩150,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 134,
      badge: "프로",
      category: "CAD",
    },
    {
      id: 4,
      name: "Antivirus Premium",
      price: "₩25,000",
      originalPrice: "₩35,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 167,
      badge: "보안",
      category: "보안",
    },
    {
      id: 5,
      name: "Video Editor Pro",
      price: "₩65,000",
      originalPrice: "₩85,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 223,
      badge: "신상품",
      category: "영상편집",
    },
    {
      id: 6,
      name: "Programming IDE Suite",
      price: "₩55,000",
      originalPrice: "₩75,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 298,
      badge: "개발자",
      category: "개발",
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
          <span className="text-foreground"> 소프트웨어</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Monitor className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">소프트웨어</h1>
              <p className="text-xl text-blue-100">프리미엄 소프트웨어를 합리적인 가격에</p>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl">
            Adobe Creative Suite, Microsoft Office, 개발 도구 등 다양한 프리미엄 소프트웨어를 정품 라이선스로 제공합니다.
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
                <h3 className="font-semibold">정품 라이선스</h3>
                <p className="text-sm text-muted-foreground">100% 정품 소프트웨어 보장</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">즉시 다운로드</h3>
                <p className="text-sm text-muted-foreground">구매 후 바로 설치 가능</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Monitor className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">기술 지원</h3>
                <p className="text-sm text-muted-foreground">설치 및 사용법 지원</p>
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
                <Input placeholder="소프트웨어 검색..." className="pl-10 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 카테고리</SelectItem>
                  <SelectItem value="design">디자인</SelectItem>
                  <SelectItem value="office">오피스</SelectItem>
                  <SelectItem value="development">개발</SelectItem>
                  <SelectItem value="security">보안</SelectItem>
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
            {softwareProducts.map((product) => (
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
