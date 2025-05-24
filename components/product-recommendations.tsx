import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  original_price: number
  image_url: string
  rating: number
  review_count: number
}

interface ProductRecommendationsProps {
  products: Product[]
  title?: string
}

export function ProductRecommendations({ products, title = "관련 상품" }: ProductRecommendationsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price)
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <h4 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{product.name}</h4>
              </Link>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.review_count})</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                {product.original_price > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={`/products/${product.id}`}>상세보기</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
