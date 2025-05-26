"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/types"

interface SubcategoryNavProps {
  subcategories: Category[]
  currentSlug?: string
}

export function SubcategoryNav({ subcategories, currentSlug }: SubcategoryNavProps) {
  if (!subcategories.length) return null

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Subcategories</h3>
      <div className="flex flex-wrap gap-2">
        {subcategories.map((subcategory) => (
          <Link key={subcategory.id} href={`/categories/${subcategory.slug}`}>
            <Badge
              variant={currentSlug === subcategory.slug ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {subcategory.name}
              <span className="ml-1 text-xs opacity-70">({subcategory.productCount})</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
