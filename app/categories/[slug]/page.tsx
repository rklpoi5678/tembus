"use client"

import { useState, useMemo } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getCategoryBySlug } from "@/lib/categories-data"
import { SubcategoryNav } from "@/components/categories/subcategory-nav"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"
// Mock products data for demonstration
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Epic Adventure Game",
    description: "An amazing indie adventure game with stunning graphics",
    shortDescription: "Epic adventure awaits",
    price: 19.99,
    originalPrice: 29.99,
    images: [
      { id: "1", url: "/placeholder.svg?height=300&width=400", alt: "Game screenshot", isPrimary: true, sortOrder: 0 },
    ],
    category: "games",
    tags: ["adventure", "indie", "story"],
    sellerId: "1",
    seller: {
      id: "1",
      email: "seller@example.com",
      name: "Game Studio",
      role: "seller",
      emailVerified: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    inventory: 999,
    sku: "GAME001",
    status: "active",
    featured: true,
    digital: true,
    rating: 4.8,
    reviewCount: 124,
    salesCount: 1250,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  // Add more mock products as needed
]

interface CategoryPageProps {
  params: { slug: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(
      (product) =>
        product.category === category.slug || category.children?.some((child) => child.slug === product.category),
    )

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "sales":
          return b.salesCount - a.salesCount
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default: // featured
          return b.featured ? 1 : -1
      }
    })

    return sorted
  }, [searchQuery, sortBy, category])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/categories">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Categories
          </Button>
        </Link>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <Badge variant="secondary">{category.productCount} products</Badge>
        </div>
        <p className="text-lg text-muted-foreground mb-6">{category.description}</p>
      </div>

      {/* Subcategories */}
      {category.children && <SubcategoryNav subcategories={category.children} currentSlug={params.slug} />}

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder={`Search in ${category.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="sales">Best Selling</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
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
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} layout={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No products found in this category</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or browse other categories</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
}
