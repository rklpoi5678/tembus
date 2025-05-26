import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  layout?: "grid" | "list"
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0]

  if (layout === "list") {
    return (
      <div className="flex gap-4 p-4 border rounded-lg">
        <div className="relative w-32 h-32">
          <Image
            src={primaryImage?.url || "/placeholder.svg"}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
          <div className="mt-2">
            <span className="font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="border rounded-lg overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image
            src={primaryImage?.url || "/placeholder.svg"}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.shortDescription}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="mt-2">
            <span className="font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
} 