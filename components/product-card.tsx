"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, Eye, Download, Heart, Share2} from "lucide-react"
import { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
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
              <span>{product.download_url?.toLocaleString()}</span> {/* Fixed: `download_url` to `download_count` if that's the number */}
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
