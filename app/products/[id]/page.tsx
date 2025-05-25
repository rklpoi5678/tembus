import { notFound, redirect } from "next/navigation"

// Sample product data mapping
const productRoutes: Record<string, string> = {
  "1": "/products/game-account",
  "2": "/products/adobe-creative-suite",
  "3": "/products/kpop-music-collection",
  "4": "/products/photo-editor-app",
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const route = productRoutes[params.id]

  if (route) {
    redirect(route)
  }

  notFound()
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const route = productRoutes[params.id]

  if (!route) {
    return {
      title: "제품을 찾을 수 없습니다 - 디지털마켓",
    }
  }

  return {
    title: "제품 상세 - 디지털마켓",
  }
}
