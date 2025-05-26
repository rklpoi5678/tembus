"use client"

import { useState, useMemo } from "react"
import { CategoryGrid } from "@/components/categories/category-grid"
import { CategorySearch } from "@/components/categories/category-search"
import { categoriesData } from "@/lib/categories-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categoriesData

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (filterBy === "popular") {
      filtered = filtered.filter((category) => category.productCount >= 100)
    } else if (filterBy === "new") {
      // For demo purposes, consider categories with fewer products as "new"
      filtered = filtered.filter((category) => category.productCount < 500)
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "products":
          return b.productCount - a.productCount
        case "products-desc":
          return a.productCount - b.productCount
        default:
          return 0
      }
    })

    return sorted
  }, [searchQuery, sortBy, filterBy])

  return (
    <div className="container mx-auto px-4">
      <Header />
      {/* Header */}
      <div className="text-center mt-12 mb-12">
        <h1 className="text-4xl font-bold mb-4">카테고리 둘러보기</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          다양한 카테고리의 놀라운 디지털 제품을 발견해보세요. 게임과 소프트웨어부터 음악과 교육 콘텐츠까지.
        </p>
      </div>

      {/* Search and Filters */}
      <CategorySearch onSearch={setSearchQuery} onSort={setSortBy} onFilter={setFilterBy} />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          총 {categoriesData.length}개 카테고리 중 {filteredAndSortedCategories.length}개 표시
        </p>
      </div>

      {/* Categories Grid */}
      {filteredAndSortedCategories.length > 0 ? (
        <CategoryGrid categories={filteredAndSortedCategories} columns={3} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">카테고리를 찾을 수 없습니다</p>
          <p className="text-sm text-muted-foreground">검색어나 필터 조건을 조정해보세요</p>
        </div>
      )}

      {/* Category Stats */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <h3 className="text-2xl font-bold text-primary">
            {categoriesData.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}
          </h3>
          <p className="text-muted-foreground">전체 상품</p>
        </div>
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <h3 className="text-2xl font-bold text-primary">{categoriesData.length}</h3>
          <p className="text-muted-foreground">카테고리</p>
        </div>
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <h3 className="text-2xl font-bold text-primary">
            {categoriesData.reduce((sum, cat) => sum + (cat.children?.length || 0), 0)}
          </h3>
          <p className="text-muted-foreground">하위 카테고리</p>
        </div>
      </div>
      <Footer />
    </div>

  )
}
