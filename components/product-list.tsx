'use client'

import { useState, useMemo } from "react"
import { ProductCard } from "./product-card"
import { ProductListItem } from "./product-list-item"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
// ... 나머지 imports

export function ProductList({ 
  initialProducts, 
  initialTrendingProducts 
}: { 
  initialProducts: any[]
  initialTrendingProducts: any[]
}) {
  const [products, setProducts] = useState(initialProducts)
  // ... 기존의 상태 관리 코드

  return (
    <>
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

      </div>
    </>
  )
}