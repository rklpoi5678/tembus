"use client"
import { useState } from "react"
import { SignUpButton, useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import { Button, buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

import { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { Badge, Filter, Grid3X3, List, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Footer } from "@/components/footer"
import { ProductListItem } from "./product-list-item"


async function fetchTrendingProducts(): Promise<Product[]> {
  const response = await fetch('/api/products/trending')
  if (!response.ok) {
    throw new Error('Failed to fetch trending products')
  }
  return response.json()
}

async function fetchTags(): Promise<string[]> {
  const response = await fetch('/api/products/tags')
  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }
  return response.json()
}

export default function Component() {
  const { user, isLoaded } = useUser()
  // --- END Clerk Replacement ---

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("trending")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFeatured, setShowFeatured] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [page, setPage] = useState(1) // `page` and `isLoading` for loadMore might need refactoring with React Query's `useInfiniteQuery` for better performance.
  const [isLoading, setIsLoading] = useState(false) // This isLoading is for the "Load More" button.

  const categories = ["All", "Design", "Code", "Education", "Photography", "Music", "3D", "Writing"]
  const sortOptions = [
    { value: "trending", label: "Trending" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ]
  
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
    // In a real application, you'd increment page and refetch products
    // using React Query's `fetchNextPage` if using `useInfiniteQuery`.
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 1000)
  }


  return (
    <div className="min-h-screen bg-background">
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
                <SignUpButton mode="modal" className={buttonVariants({ variant: "default" })}>판매 시작하기</SignUpButton>
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
              {selectedTags.map((tag) => ( // Use selectedTags here, not all tags
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                </Badge>
              ))}
              {showFeatured && ( // Check showFeatured directly
                <Badge variant="secondary" className="gap-1">
                  추천
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowFeatured(false)} />
                </Badge>
              )}
              {showNew && ( // Check showNew directly
                <Badge variant="secondary" className="gap-1">
                  신규
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowNew(false)} />
                </Badge>
              )}
              {/* Only show price range badge if it's not the default */}
              {(priceRange[0] > 0 || priceRange[1] < 200) && (
                <Badge variant="secondary" className="gap-1">
                  ₩{priceRange[0]} - ₩{priceRange[1]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 200])} />
                </Badge>
              )}

              <Button variant="ghost" size="sm" onClick={clearFilters}>
                모든 필터 지우기
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
            {productsLoading ? (
              <div className="text-center py-12">상품 로딩 중...</div>
            ) : products?.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
                <p className="text-muted-foreground mb-4">
                  검색 조건을 변경하거나 카테고리를 둘러보세요
                </p>
                <Button onClick={clearFilters}>모든 필터 지우기</Button>
              </div>
            ) : viewMode === "grid" ? (
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
            {products && products.length > 0 && (
              <div className="text-center mt-12">
                <Button onClick={loadMore} disabled={isLoading} size="lg">
                  {isLoading ? "로딩 중..." : "더 보기"}
            </Button>
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
