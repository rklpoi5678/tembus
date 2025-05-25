import { ProductDetailPage } from "@/components/product-detail-page"

export default function PhotoEditorAppPage() {
  const product = {
    id: 4,
    name: "프리미엄 사진 편집 앱 Pro",
    price: "₩15,000",
    originalPrice: "₩25,000",
    description:
      "전문가 수준의 사진 편집 기능을 제공하는 모바일 앱으로, AI 기반 자동 보정과 200개 이상의 필터를 포함합니다.",
    longDescription: `프리미엄 사진 편집 앱 Pro는 모바일에서 전문가 수준의 사진 편집을 가능하게 하는 혁신적인 앱입니다.

AI 기반 자동 보정 기능으로 한 번의 터치만으로 완벽한 사진을 만들 수 있으며, 200개 이상의 프리미엄 필터와 효과를 제공합니다.

레이어 편집, 마스킹, 색상 조정, 노이즈 제거 등 전문적인 편집 도구들이 모두 포함되어 있어 데스크톱 수준의 편집이 가능합니다.

클라우드 동기화를 통해 여러 기기에서 작업을 이어갈 수 있으며, 소셜 미디어 직접 공유 기능도 지원합니다.`,
    category: "모바일 앱",
    badge: "신상품",
    rating: 4.7,
    reviewCount: 1256,
    images: [
      { url: "/placeholder.svg?height=600&width=600", alt: "앱 메인 인터페이스", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "AI 자동 보정", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "필터 컬렉션", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "레이어 편집", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "편집 과정 영상", type: "video" as const },
    ],
    specifications: [
      { label: "앱 크기", value: "125MB" },
      { label: "필터 수", value: "200개 이상" },
      { label: "지원 포맷", value: "JPEG, PNG, RAW, HEIC" },
      { label: "최대 해상도", value: "8K (7680×4320)" },
      { label: "레이어 지원", value: "무제한" },
      { label: "클라우드 저장소", value: "5GB" },
    ],
    systemRequirements: [
      { label: "iOS", value: "iOS 14.0 이상" },
      { label: "Android", value: "Android 8.0 이상" },
      { label: "RAM", value: "4GB 이상 권장" },
      { label: "저장공간", value: "200MB 이상" },
      { label: "인터넷", value: "클라우드 기능 사용 시 필요" },
    ],
    features: [
      "AI 기반 자동 보정 및 향상",
      "200개 이상의 프리미엄 필터",
      "전문가 수준의 편집 도구",
      "무제한 레이어 편집",
      "RAW 파일 지원",
      "클라우드 동기화",
      "소셜 미디어 직접 공유",
      "광고 없는 프리미엄 경험",
    ],
    developer: "PhotoPro Studios",
    version: "3.2.1",
    downloadSize: "125MB",
    releaseDate: "2024년 1월",
    languages: ["한국어", "영어", "일본어", "중국어"],
    platforms: ["iOS", "Android"],
    stockQuantity: 999,
  }

  const reviews = [
    {
      id: 1,
      userName: "사진작가김",
      rating: 5,
      title: "모바일에서 이런 편집이 가능하다니!",
      comment:
        "정말 놀라운 앱입니다. 데스크톱 포토샵 못지않은 기능들이 모바일에서 구현되어 있어요. AI 보정도 정말 자연스럽고 좋습니다.",
      date: "2024-01-22",
      verified: true,
      helpful: 89,
    },
    {
      id: 2,
      userName: "인스타그래머",
      rating: 5,
      title: "인스타용 사진 편집 최고!",
      comment:
        "필터가 정말 다양하고 예뻐요. 특히 인물 보정 기능이 자연스럽게 잘 되어서 셀카 편집할 때 자주 사용합니다.",
      date: "2024-01-20",
      verified: true,
      helpful: 76,
    },
    {
      id: 3,
      userName: "여행블로거",
      rating: 4,
      title: "여행 사진 편집에 완벽",
      comment:
        "여행 중에 찍은 사진들을 바로바로 편집해서 올릴 수 있어서 좋아요. 클라우드 동기화도 편리하고 기능도 충분합니다.",
      date: "2024-01-18",
      verified: true,
      helpful: 65,
    },
  ]

  const relatedProducts = [
    {
      id: 14,
      name: "비디오 편집 앱 Pro",
      price: "₩18,000",
      originalPrice: "₩28,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 892,
    },
    {
      id: 15,
      name: "음악 제작 스튜디오 앱",
      price: "₩35,000",
      originalPrice: "₩50,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 423,
    },
    {
      id: 16,
      name: "드로잉 & 페인팅 앱",
      price: "₩22,000",
      originalPrice: "₩32,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 567,
    },
    {
      id: 17,
      name: "3D 모델링 앱",
      price: "₩45,000",
      originalPrice: "₩65,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 234,
    },
  ]

  return <ProductDetailPage product={product} reviews={reviews} relatedProducts={relatedProducts} />
}

export async function generateMetadata() {
  return {
    title: "프리미엄 사진 편집 앱 Pro - 디지털마켓",
    description:
      "전문가 수준의 사진 편집 기능을 제공하는 모바일 앱으로, AI 기반 자동 보정과 200개 이상의 필터를 포함합니다.",
  }
}
