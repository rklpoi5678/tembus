"use client"

import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Star,
  Download,
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
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Product } from "@/lib/types"


// API 호출 함수들
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

async function fetchTrendingProducts(): Promise<Product[]> {
  const response = await fetch('/api/products/trending')
  if (!response.ok) {
    throw new Error('Failed to fetch trending products')
  }
  return response.json()
}

async function fetchTags(): Promise<string[]> {
  const response = await fetch ('/api/products/tags')
  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }
  return response.json()
}



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

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', searchQuery, selectedCategory, priceRange, selectedTags, showFeatured, showNew, sortBy],
    queryFn: () => fetch(`/api/products?${new URLSearchParams({
      query: searchQuery,
      category: selectedCategory,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      tags: selectedTags.join(','),
      featured: showFeatured.toString(),
      new: showNew.toString(),
      sortBy
    })}`).then(res => res.json())
  })

  const { data: trendingProducts , isLoading: trendingLoading } =useQuery({
    queryKey : ['trending-products'],
    queryFn: fetchTrendingProducts
  })

  // 컴포넌트 내부에 쿼리 추가
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags
  })
  
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
      <Header />

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
              {trendingLoading ? (
            <div>로딩 중...</div>
          ) : (
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {trendingProducts?.map((product) => (
                  <div key={product.id} className="w-[280px] flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
              )}
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
          {(tags.length > 0 || showFeatured || showNew || priceRange[0] > 0 || priceRange[1] < 200) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">활성 필터:</span>
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                </Badge>
              ))}
              {tags && (
                <Badge variant="secondary" className="gap-1">
                  Featured
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowFeatured(false)} />
                </Badge>
              )}
              {tags && (
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
                    <span>₩{priceRange[0]}</span>
                    <span>₩{priceRange[1]}</span>
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
                    {tags.map((tag) => (
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
                  {products?.length || 0}개의 상품
                  {searchQuery && ` "${searchQuery}" 검색 결과`}
                </p>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products?.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
            ))}
          </div>
            ) : (
              <div className="space-y-4">
                {products?.map((product: Product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
        </div>
            )}

            {/* Load More */}
            {products?.length > 0 && (
              <div className="text-center mt-12">
                <Button onClick={loadMore} disabled={isLoading} size="lg">
                  {isLoading ? "로딩 중..." : "더 보기"}
            </Button>
          </div>
            )}

            {/* No Results */}
            {products?.length === 0 && (
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
      <Footer />
              
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
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.featured && <Badge className="bg-yellow-500">Featured</Badge>}
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
              src={product.seller.logo_url || "/placeholder.svg"}
              alt={product.seller.storeName || "tembus"}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">{product.seller.storeName}</span>
            {product.seller.verified && (
              <Badge variant="secondary" className="text-xs px-1">
                ✓
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors mb-2">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDescription}</p>

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
              <span>{Number(product.rating).toFixed(1)}</span>
              <span>({product.review_count})</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>{product.download_url?.toLocaleString()}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">₩{Number(product.price).toFixed(0)}</span>
              {product.original_price && (
                <span className="text-sm text-muted-foreground line-through">₩{Number(product.original_price).toFixed(0)}</span>
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
            <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-1">
              {product.featured && <Badge className="bg-yellow-500 text-xs">Featured</Badge>}
            </div>
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          {/* Creator */}
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={product.seller.logo_url || "/placeholder.svg"}
              alt={product.seller.user?.name || "seller"}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">{product.seller.user?.name || "seller"}</span>
            {product.seller.verified && (
              <Badge variant="secondary" className="text-xs px-1">
                ✓
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-2">{product.name}</h3>
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
              <span>{Number(product.rating).toFixed(1)}</span>
              <span>({product.review_count} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{product.download_url?.toLocaleString()} downloads</span>
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
              <span className="text-xl font-bold">₩{Number(product.price).toFixed(0)}</span>
              {product.original_price && (
                <span className="text-sm text-muted-foreground line-through">₩{Number(product.original_price).toFixed(0)}</span>
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
