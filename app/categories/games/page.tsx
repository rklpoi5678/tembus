import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gamepad2, Star, Filter, Search, Zap, User } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"

export default function GamesPage() {
  const gameProducts = [
    {
      id: 1,
      name: "프리미엄 게임 계정",
      price: "₩89,000",
      originalPrice: "₩120,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 156,
      badge: "인기",
      game: "리그 오브 레전드",
    },
    {
      id: 2,
      name: "레어 스킨 컬렉션",
      price: "₩45,000",
      originalPrice: "₩60,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 89,
      badge: "할인",
      game: "발로란트",
    },
    {
      id: 3,
      name: "프리미엄 스킨 패키지",
      price: "₩25,000",
      originalPrice: "₩35,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 234,
      badge: "신상품",
      game: "오버워치",
    },
    {
      id: 4,
      name: "게임 내 화폐 패키지",
      price: "₩15,000",
      originalPrice: "₩20,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 67,
      badge: "베스트",
      game: "포트나이트",
    },
    {
      id: 5,
      name: "캐릭터 업그레이드 키트",
      price: "₩35,000",
      originalPrice: "₩50,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 123,
      badge: "할인",
      game: "월드 오브 워크래프트",
    },
    {
      id: 6,
      name: "시즌 패스 번들",
      price: "₩55,000",
      originalPrice: "₩75,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 198,
      badge: "인기",
      game: "배틀그라운드",
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
          <span className="text-foreground"> 게임 아이템</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Gamepad2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">게임 아이템</h1>
              <p className="text-xl text-blue-100">최고의 게임 아이템과 계정을 만나보세요</p>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl">
            인기 게임의 프리미엄 아이템, 레어 스킨, 게임 계정 등 다양한 게임 관련 디지털 상품을 안전하게 거래하세요.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="게임 아이템 검색..." className="pl-10 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="게임 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 게임</SelectItem>
                  <SelectItem value="lol">리그 오브 레전드</SelectItem>
                  <SelectItem value="valorant">발로란트</SelectItem>
                  <SelectItem value="overwatch">오버워치</SelectItem>
                  <SelectItem value="fortnite">포트나이트</SelectItem>
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
            {gameProducts.map((product) => (
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
                    {product.game}
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
