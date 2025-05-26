"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
  size?: "small" | "medium" | "large"
}

export function CategoryCard({ category, size = "medium" }: CategoryCardProps) {
  const sizeClasses = {
    small: "h-32",
    medium: "h-48",
    large: "h-64",
  }

  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
        <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
          <Image
            src={category.image || "/placeholder.svg?height=200&width=300"}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {category.productCount} products
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
