"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
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
  LogOut,
  Settings,
  Package,
  Store,
  Filter,
  Grid3X3,
  List,
  Heart,
  Share2,
  Eye,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Product {
  id: number
  title: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  tags: string[]
  rating: number
  reviews: number
  downloads: number
  creator: {
    name: string
    avatar: string
    verified: boolean
    storeName: string
  }
  featured: boolean
  trending: boolean
  new: boolean
  createdAt: string
}

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "Premium UI Kit for Mobile Apps",
    description: "Complete design system with 200+ components, dark/light themes, and Figma source files",
    price: 49,
    originalPrice: 79,
    image: "/placeholder.svg?height=300&width=400",
    category: "Design",
    tags: ["UI Kit", "Mobile", "Figma", "Design System"],
    rating: 4.9,
    reviews: 234,
    downloads: 1250,
    creator: {
      name: "DesignStudio",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      storeName: "Design Studio",
    },
    featured: true,
    trending: true,
    new: false,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "React Component Library",
    description: "Production-ready React components with TypeScript, Storybook, and comprehensive documentation",
    price: 89,
    image: "/placeholder.svg?height=300&width=400",
    category: "Code",
    tags: ["React", "TypeScript", "Components", "Frontend"],
    rating: 4.8,
    reviews: 156,
    downloads: 890,
    creator: {
      name: "CodeCraft",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      storeName: "Code Craft",
    },
    featured: false,
    trending: true,
    new: true,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Digital Marketing Course Bundle",
    description: "Complete guide to digital marketing with 50+ video lessons, templates, and case studies",
    price: 129,
    originalPrice: 199,
    image: "/placeholder.svg?height=300&width=400",
    category: "Education",
    tags: ["Marketing", "Course", "Business", "Strategy"],
    rating: 4.7,
    reviews: 89,
    downloads: 567,
    creator: {
      name: "MarketingPro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      storeName: "Marketing Pro",
    },
    featured: true,
    trending: false,
    new: false,
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    title: "Minimalist Logo Collection",
    description: "100 premium minimalist logos in vector format, perfect for startups and modern brands",
    price: 35,
    image: "/placeholder.svg?height=300&width=400",
    category: "Design",
    tags: ["Logo", "Branding", "Vector", "Minimalist"],
    rating: 4.6,
    reviews: 312,
    downloads: 2100,
    creator: {
      name: "BrandMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      storeName: "Brand Master",
    },
    featured: false,
    trending: false,
    new: false,
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    title: "Python Automation Scripts",
    description: "Collection of 25 Python scripts for automating daily tasks, web scraping, and data processing",
    price: 25,
    image: "/placeholder.svg?height=300&width=400",
    category: "Code",
    tags: ["Python", "Automation", "Scripts", "Productivity"],
    rating: 4.5,
    reviews: 78,
    downloads: 445,
    creator: {
      name: "AutoDev",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      storeName: "Auto Dev",
    },
    featured: false,
    trending: true,
    new: true,
    createdAt: "2024-01-18",
  },
  {
    id: 6,
    title: "Social Media Templates Pack",
    description: "500+ Instagram, Facebook, and Twitter templates for Photoshop and Canva",
    price: 19,
    originalPrice: 39,
    image: "/placeholder.svg?height=300&width=400",
    category: "Design",
    tags: ["Social Media", "Templates", "Instagram", "Marketing"],
    rating: 4.4,
    reviews: 445,
    downloads: 3200,
    creator: {
      name: "SocialDesign",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      storeName: "Social Design",
    },
    featured: false,
    trending: false,
    new: false,
    createdAt: "2023-12-20",
  },
  {
    id: 7,
    title: "E-commerce Website Template",
    description: "Modern, responsive e-commerce template built with Next.js and Tailwind CSS",
    price: 79,
    image: "/placeholder.svg?height=300&width=400",
    category: "Code",
    tags: ["Next.js", "E-commerce", "Template", "Tailwind"],
    rating: 4.8,
    reviews: 167,
    downloads: 723,
    creator: {
      name: "WebCraft",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      storeName: "Web Craft",
    },
    featured: true,
    trending: false,
    new: false,
    createdAt: "2024-01-12",
  },
  {
    id: 8,
    title: "Photography Lightroom Presets",
    description: "Professional Lightroom presets for portrait, landscape, and street photography",
    price: 15,
    image: "/placeholder.svg?height=300&width=400",
    category: "Photography",
    tags: ["Lightroom", "Presets", "Photography", "Editing"],
    rating: 4.7,
    reviews: 289,
    downloads: 1890,
    creator: {
      name: "PhotoPro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      storeName: "Photo Pro",
    },
    featured: false,
    trending: true,
    new: false,
    createdAt: "2024-01-08",
  },
]

const categories = ["All", "Design", "Code", "Education", "Photography", "Music", "3D", "Writing"]
const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export default function Component() {
  const { user, logout, loading } = useAuth()
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("trending")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFeatured, setShowFeatured] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Get trending products
  const trendingProducts = useMemo(() => {
    return products
      .filter((product) => product.trending)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 8)
  }, [products])

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    products.forEach((product) => {
      product.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !product.title.toLowerCase().includes(query) &&
          !product.description.toLowerCase().includes(query) &&
          !product.tags.some((tag) => tag.toLowerCase().includes(query))
        ) {
          return false
        }
      }

      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Tags filter
      if (selectedTags.length > 0) {
        if (!selectedTags.some((tag) => product.tags.includes(tag))) {
          return false
        }
      }

      // Featured filter
      if (showFeatured && !product.featured) {
        return false
      }

      // New filter
      if (showNew && !product.new) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "popular":
        filtered.sort((a, b) => b.downloads - a.downloads)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "trending":
      default:
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1
          if (!a.trending && b.trending) return 1
          return b.downloads - a.downloads
        })
        break
    }

    return filtered
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, selectedTags, showFeatured, showNew])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setPriceRange([0, 200])
    setSelectedTags([])
    setShowFeatured(false)
    setShowNew(false)
  }

  const loadMore = () => {
    setIsLoading(true)
    // Simulate loading more products
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 ml-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">자유템</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/categories" className="text-sm font-medium hover:text-primary">
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
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {user.role === "seller" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard">
                              <Store className="mr-2 h-4 w-4" />
                              내 상점
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard/products">
                              <Package className="mr-2 h-4 w-4" />
                              상품 관리
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          설정
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                      <Link href="/login">로그인</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">판매시작 하기</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-8">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center ml-16">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                디지털 제품의 새로운 기준
                <br />
                <span className="text-primary">디지털마켓</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                최고의 디지털 제품을 만나보세요. UI/UX 디자인, 코드, 디지털 아트 등 다양한 카테고리의 프리미엄 제품을 제공합니다.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="outline" className="bg-black text-white" asChild>
                  <Link href="#search-section">둘러보기</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register">판매 시작하기</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] hidden lg:block">
              <Image
                src="https://picsum.photos/600/400?random=1"
                alt="Hero Image"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-8 ml-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">인기 상품</h2>
              <p className="text-sm text-muted-foreground">가장 많은 사랑을 받고 있는 상품들을 만나보세요</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="#search-section">더 보기</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingProducts.map((product) => (
                <div key={product.id} className="w-[280px] flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container py-6 ml-16">
        {/* Search and Controls */}
        <div id="search-section" className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="상품, 제작자 또는 태그 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Active Filters */}
          {(selectedTags.length > 0 || showFeatured || showNew || priceRange[0] > 0 || priceRange[1] < 200) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">활성 필터:</span>
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                </Badge>
              ))}
              {showFeatured && (
                <Badge variant="secondary" className="gap-1">
                  Featured
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowFeatured(false)} />
                </Badge>
              )}
              {showNew && (
                <Badge variant="secondary" className="gap-1">
                  New
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowNew(false)} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                모두 지우기
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">필터</h3>

              {/* Price Range */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">가격 범위</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={showFeatured}
                      onCheckedChange={(checked) => setShowFeatured(checked === true)}
                    />
                    <label htmlFor="featured" className="text-sm">
                      추천 상품
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new"
                      checked={showNew}
                      onCheckedChange={(checked) => setShowNew(checked === true)}
                    />
                    <label htmlFor="new" className="text-sm">
                      신규 상품
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium mb-2 block">태그</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => {
                            if (checked === true) {
                              setSelectedTags((prev) => [...prev, tag])
                            } else {
                              setSelectedTags((prev) => prev.filter((t) => t !== tag))
                            }
                          }}
                        />
                        <label htmlFor={tag} className="text-sm">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">상품 둘러보기</h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length}개의 상품
                  {searchQuery && ` "${searchQuery}" 검색 결과`}
                </p>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button onClick={loadMore} disabled={isLoading} size="lg">
                  {isLoading ? "로딩 중..." : "더 보기"}
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
                <p className="text-muted-foreground mb-4">
                  검색 조건을 변경하거나 카테고리를 둘러보세요
                </p>
                <Button onClick={clearFilters}>모든 필터 지우기</Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ml-16">
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
                  <Link href="/categories/games" className="hover:text-primary">
                    게임 아이템
                  </Link>
                </li>
                <li>
                  <Link href="/categories/software" className="hover:text-primary">
                    소프트웨어
                  </Link>
                </li>
                <li>
                  <Link href="/categories/music" className="hover:text-primary">
                    디지털 음원
                  </Link>
                </li>
                <li>
                  <Link href="/categories/mobile-apps" className="hover:text-primary">
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
                  <Link href="/company/privacy" className="hover:text-primary">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground ml-16">
            <p>&copy; 2025 자유템. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.featured && <Badge className="bg-yellow-500">Featured</Badge>}
              {product.trending && <Badge className="bg-red-500">Trending</Badge>}
              {product.new && <Badge className="bg-green-500">New</Badge>}
            </div>
            {/* Actions */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Link>

        <CardContent className="p-4">
          {/* Creator */}
          <div className="flex items-center gap-2 mb-3">
            <Image
              src={product.creator.avatar || "/placeholder.svg"}
              alt={product.creator.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">{product.creator.name}</span>
            {product.creator.verified && (
              <Badge variant="secondary" className="text-xs px-1">
                ✓
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors mb-2">{product.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span>({product.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>{product.downloads.toLocaleString()}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            상세보기
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

function ProductListItem({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        <Link href={`/products/${product.id}`} className="flex-shrink-0">
          <div className="relative w-48 h-32 rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-1">
              {product.featured && <Badge className="bg-yellow-500 text-xs">Featured</Badge>}
              {product.trending && <Badge className="bg-red-500 text-xs">Trending</Badge>}
              {product.new && <Badge className="bg-green-500 text-xs">New</Badge>}
            </div>
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          {/* Creator */}
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={product.creator.avatar || "/placeholder.svg"}
              alt={product.creator.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">{product.creator.name}</span>
            {product.creator.verified && (
              <Badge variant="secondary" className="text-xs px-1">
                ✓
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-2">{product.title}</h3>
          </Link>
          <p className="text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span>({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{product.downloads.toLocaleString()} downloads</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsLiked(!isLiked)} className="h-8 w-8 p-0">
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Price and Button */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              상세보기
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
