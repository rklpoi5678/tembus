"use client"

import type { Category } from "@/lib/types"
import { CategoryCard } from "@/components/categories/category-card"

interface CategoryGridProps {
  categories: Category[]
  columns?: 2 | 3 | 4
}

export function CategoryGrid({ categories, columns = 3 }: CategoryGridProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  return (
    <div className={`grid gap-6 ${gridClasses[columns]}`}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
