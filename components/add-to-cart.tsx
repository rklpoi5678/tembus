"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShoppingCart, Loader2, Minus, Plus, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  stock_quantity: number
}

interface AddToCartProps {
  product: Product
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "장바구니에 추가됨",
          description: data.message,
        })

        // 장바구니 업데이트 이벤트 발생
        window.dispatchEvent(new CustomEvent("cartUpdated"))
      } else {
        if (response.status === 401) {
          router.push("/login")
          return
        }
        toast({
          title: "오류",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "장바구니 추가 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToWishlist = async () => {
    setIsWishlistLoading(true)

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "위시리스트에 추가됨",
          description: data.message,
        })
      } else {
        if (response.status === 401) {
          router.push("/login")
          return
        }
        toast({
          title: "오류",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "위시리스트 추가 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsWishlistLoading(false)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const isOutOfStock = product.stock_quantity === 0

  return (
    <div className="space-y-6">
      {/* 재고 상태 */}
      {isOutOfStock ? (
        <Alert>
          <AlertDescription>현재 품절된 상품입니다.</AlertDescription>
        </Alert>
      ) : product.stock_quantity < 10 ? (
        <Alert>
          <AlertDescription>재고가 {product.stock_quantity}개 남았습니다.</AlertDescription>
        </Alert>
      ) : null}

      {/* 수량 선택 */}
      {!isOutOfStock && (
        <div className="space-y-2">
          <Label htmlFor="quantity">수량</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={product.stock_quantity}
              value={quantity}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                if (value >= 1 && value <= product.stock_quantity) {
                  setQuantity(value)
                }
              }}
              className="w-20 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= product.stock_quantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">최대 {product.stock_quantity}개까지 구매 가능</p>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        <Button onClick={handleAddToCart} disabled={isLoading || isOutOfStock} className="flex-1" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              추가 중...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              장바구니 담기
            </>
          )}
        </Button>

        <Button variant="outline" size="lg" onClick={handleAddToWishlist} disabled={isWishlistLoading}>
          {isWishlistLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4" />}
        </Button>
      </div>

      {/* 즉시 구매 */}
      {!isOutOfStock && (
        <Button variant="secondary" size="lg" className="w-full">
          바로 구매하기
        </Button>
      )}
    </div>
  )
}
