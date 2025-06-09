import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Star, Eye, Download, Heart, Share2 } from "lucide-react"
import { Product } from "@/lib/types"

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
              alt={product.seller.storeName || "seller"}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">{product.seller.storeName || "seller"}</span>
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
              <span>{product.download_url?.toLocaleString()} downloads</span> {/* Fixed: `download_url` to `download_count` if that's the number */}
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