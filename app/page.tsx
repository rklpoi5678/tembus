"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  User,
  Menu,
  Star,
  Download,
  Shield,
  Zap,
  Gift,
  Gamepad2,
  Monitor,
  Headphones,
  Smartphone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"

export default function Component() {
  const featuredProducts = [
    {
      id: 1,
      name: "프리미엄 게임 계정",
      price: "₩89,000",
      originalPrice: "₩120,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 156,
      badge: "인기",
      category: "게임",
    },
    {
      id: 2,
      name: "Adobe Creative Suite",
      price: "₩45,000",
      originalPrice: "₩60,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 89,
      badge: "할인",
      category: "소프트웨어",
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
      category: "게임",
    },
    {
      id: 4,
      name: "디지털 음원 컬렉션",
      price: "₩15,000",
      originalPrice: "₩20,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 67,
      badge: "베스트",
      category: "음원",
    },
  ]

  const categories = [
    { name: "게임 아이템", icon: Gamepad2, count: "1,200+" },
    { name: "소프트웨어", icon: Monitor, count: "800+" },
    { name: "디지털 음원", icon: Headphones, count: "500+" },
    { name: "모바일 앱", icon: Smartphone, count: "300+" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">디지털마켓</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm font-medium hover:text-primary">
                홈
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                카테고리
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                베스트
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                이벤트
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="상품을 검색하세요..." className="pl-10 w-64" />
              </div>
            </div>
            <CartIcon />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="container py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              디지털 제품의
              <br />
              <span className="text-yellow-300">새로운 경험</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              게임 아이템부터 프리미엄 소프트웨어까지, 안전하고 빠른 디지털 상품 거래
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                지금 쇼핑하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                카테고리 보기
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">안전한 거래</h3>
                <p className="text-sm text-muted-foreground">100% 보안 결제 시스템</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">즉시 다운로드</h3>
                <p className="text-sm text-muted-foreground">구매 후 바로 이용 가능</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">특별 혜택</h3>
                <p className="text-sm text-muted-foreground">회원 전용 할인 이벤트</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">인기 카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} 상품</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">인기 상품</h2>
            <Button variant="outline">전체 보기</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
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

      {/* Special Offer */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🔥 특별 할인 이벤트</h2>
          <p className="text-xl mb-8">지금 가입하면 첫 구매 30% 할인!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
              회원가입하기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500"
            >
              이벤트 상품 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">디지털마켓</span>
              </div>
              <p className="text-muted-foreground mb-4">안전하고 신뢰할 수 있는 디지털 제품 거래 플랫폼</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">카테고리</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/catagories/games" className="hover:text-primary">
                    게임 아이템
                  </Link>
                </li>
                <li>
                  <Link href="/catagories/software" className="hover:text-primary">
                    소프트웨어
                  </Link>
                </li>
                <li>
                  <Link href="/catagories/music" className="hover:text-primary">
                    디지털 음원
                  </Link>
                </li>
                <li>
                  <Link href="/catagories/mobile-apps" className="hover:text-primary">
                    모바일 앱
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">고객지원</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/support/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support/contact" className="hover:text-primary">
                    고객센터
                  </Link>
                </li>
                <li>
                  <Link href="/support/refund-policy" className="hover:text-primary">
                    환불정책
                  </Link>
                </li>
                <li>
                  <Link href="/support/terms" className="hover:text-primary">
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">회사정보</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/company/about" className="hover:text-primary">
                    회사소개
                  </Link>
                </li>
                <li>
                  <Link href="/company/careers" className="hover:text-primary">
                    채용정보
                  </Link>
                </li>
                <li>
                  <Link href="/company/partnership" className="hover:text-primary">
                    파트너십
                  </Link>
                </li>
                <li>
                  <Link href="/company/privacy-policy" className="hover:text-primary">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 디지털마켓. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
