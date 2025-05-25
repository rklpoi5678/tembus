import { ProductDetailPage } from "@/components/product-detail-page"

export default function AdobeCreativeSuitePage() {
  const product = {
    id: 2,
    name: "Adobe Creative Suite 2024 프리미엄",
    price: "₩89,000",
    originalPrice: "₩150,000",
    description: "포토샵, 일러스트레이터, 프리미어 프로 등 모든 Adobe 앱을 포함한 완전한 크리에이티브 솔루션입니다.",
    longDescription: `Adobe Creative Suite 2024는 전 세계 크리에이터들이 신뢰하는 최고의 디자인 및 영상 편집 소프트웨어 패키지입니다.

이 프리미엄 패키지에는 Photoshop, Illustrator, Premiere Pro, After Effects, InDesign, Lightroom 등 20개 이상의 전문 앱이 포함되어 있습니다.

최신 AI 기능인 Adobe Sensei가 통합되어 더욱 빠르고 효율적인 작업이 가능하며, 클라우드 동기화를 통해 어디서나 작업을 이어갈 수 있습니다.

정품 라이선스로 제공되며, 1년간 무료 업데이트와 기술 지원을 받으실 수 있습니다.`,
    category: "소프트웨어",
    badge: "베스트",
    rating: 4.9,
    reviewCount: 234,
    images: [
      { url: "/placeholder.svg?height=600&width=600", alt: "Adobe Creative Suite 메인", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "Photoshop 인터페이스", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "Premiere Pro 편집", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "Illustrator 작업", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "기능 소개 영상", type: "video" as const },
    ],
    specifications: [
      { label: "포함 앱", value: "20개 이상" },
      { label: "라이선스", value: "1년 구독" },
      { label: "클라우드 저장소", value: "100GB" },
      { label: "동시 설치", value: "2대" },
      { label: "언어", value: "한국어 포함 다국어" },
      { label: "업데이트", value: "무료 (1년)" },
    ],
    systemRequirements: [
      { label: "운영체제", value: "Windows 10/11, macOS 10.15+" },
      { label: "프로세서", value: "Intel i5 또는 AMD 동급 이상" },
      { label: "메모리", value: "8GB RAM (16GB 권장)" },
      { label: "저장공간", value: "4GB 이상" },
      { label: "그래픽카드", value: "DirectX 12 지원" },
      { label: "인터넷", value: "활성화 및 업데이트 필요" },
    ],
    features: [
      "20개 이상의 전문 크리에이티브 앱",
      "최신 AI 기능 (Adobe Sensei) 포함",
      "100GB 클라우드 저장소",
      "모바일 앱 연동",
      "Adobe Fonts 무제한 사용",
      "프리미엄 템플릿 및 에셋",
      "1년간 무료 업데이트",
      "24/7 기술 지원"
    ],
    developer: "Adobe Inc.",
    version: "2024",
    downloadSize: "4.2GB",
    releaseDate: "2024년 1월",
    languages: ["한국어", "영어", "일본어", "중국어", "독일어", "프랑스어"],
    platforms: ["Windows", "Mac"],
    stockQuantity: 15
  }

  const reviews = [
    {
      id: 1,
      userName: "디자이너김",
      rating: 5,
      title: "완벽한 디자인 솔루션",
      comment: "모든 Adobe 앱이 포함되어 있어서 정말 만족합니다. 특히 새로운 AI 기능들이 작업 효율을 크게 높여줘요.",
      date: "2024-01-18",
      verified: true,
      helpful: 45
    },
    {
      id: 2,
      userName: "영상편집자",
      rating: 5,
      title: "프리미어 프로 최고!",
      comment: "영상 편집 작업에 필수적인 프리미어 프로와 애프터 이펙트가 포함되어 있어서 좋습니다. 성능도 훌륭해요.",
      date: "2024-01-15",
      verified: true,
      helpful: 32
    },
    {
      id: 3,
      userName: "프리랜서작가",
      rating: 4,
      title: "가성비 좋은 패키지",
      comment: "개별 구매하는 것보다 훨씬 저렴하고, 클라우드 동기화도 편리합니다. 다만 초기 설치가 조금 오래 걸려요.",
      date: "2024-01-12",
      verified: true,
      helpful: 28
    }
  ]

  const relatedProducts = [
    {
      id: 6,
      name: "Microsoft Office 365 프리미엄",
      price: "₩45,000",
      originalPrice: "₩65,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 189
    },
    {
      id: 7,
      name: "AutoCAD 2024 Professional",
      price: "₩125,000",
      originalPrice: "₩180,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 134
    },
    {
      id: 8,
      name: "Final Cut Pro X",
      price: "₩85,000",
      originalPrice: "₩120,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 9,
      name: "Sketch for Teams",
      price: "₩55,000",
      originalPrice: "₩75,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 98
    }
  ]

  return <ProductDetailPage product={product} reviews={reviews} relatedProducts={relatedProducts} />
}

export async function generateMetadata() {
  return {
    title: "Adobe Creative Suite 2024 프리미엄 - 디지털마켓",
    description: "포토샵, 일러스트레이터, 프리미어 프로 등 모든 Adobe 앱을 포함한 완전한 크리에이티브 솔루션입니다.",
  }
}
