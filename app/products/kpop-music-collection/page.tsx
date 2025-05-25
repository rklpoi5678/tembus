import { ProductDetailPage } from "@/components/product-detail-page"

export default function KpopMusicCollectionPage() {
  const product = {
    id: 3,
    name: "K-POP 히트곡 컬렉션 2024",
    price: "₩15,000",
    originalPrice: "₩25,000",
    description: "2024년 최신 K-POP 히트곡 50곡을 고음질 FLAC 포맷으로 제공하는 프리미엄 음원 컬렉션입니다.",
    longDescription: `K-POP 히트곡 컬렉션 2024는 올해 가장 인기 있었던 K-POP 곡들을 엄선하여 구성한 프리미엄 음원 패키지입니다.

BTS, BLACKPINK, NewJeans, IVE, (G)I-DLE, SEVENTEEN 등 최고의 아티스트들의 히트곡 50곡이 포함되어 있습니다.

모든 음원은 CD 품질을 뛰어넘는 24bit/96kHz FLAC 포맷으로 제공되어 최고의 음질을 경험하실 수 있습니다.

각 곡마다 고해상도 앨범 아트와 가사가 포함되어 있으며, 다양한 음악 플레이어에서 호환됩니다.`,
    category: "음원",
    badge: "인기",
    rating: 4.8,
    reviewCount: 312,
    images: [
      { url: "/placeholder.svg?height=600&width=600", alt: "앨범 커버 컬렉션", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "음원 목록", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "고음질 스펙트럼", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "플레이어 호환성", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "미리듣기 영상", type: "video" as const },
    ],
    specifications: [
      { label: "트랙 수", value: "50곡" },
      { label: "총 재생시간", value: "3시간 25분" },
      { label: "음질", value: "24bit/96kHz FLAC" },
      { label: "파일 크기", value: "약 2.8GB" },
      { label: "앨범 아트", value: "고해상도 포함" },
      { label: "가사", value: "한국어/영어 포함" },
    ],
    features: [
      "2024년 최신 K-POP 히트곡 50곡",
      "24bit/96kHz 고음질 FLAC 포맷",
      "고해상도 앨범 아트 포함",
      "한국어/영어 가사 제공",
      "모든 주요 음악 플레이어 호환",
      "DRM-Free 무제한 재생",
      "모바일/PC 동시 지원",
      "평생 다운로드 보장",
    ],
    trackCount: 50,
    duration: "3시간 25분",
    format: ["FLAC", "MP3 320kbps", "WAV"],
    genre: "K-POP",
    releaseDate: "2024년 1월",
    languages: ["한국어", "영어"],
    stockQuantity: 999,
  }

  const reviews = [
    {
      id: 1,
      userName: "케이팝러버",
      rating: 5,
      title: "최고의 K-POP 컬렉션!",
      comment:
        "올해 히트곡들이 모두 들어있고 음질도 정말 좋아요. FLAC 포맷이라 고급 헤드폰으로 들으면 차이가 확실히 느껴집니다.",
      date: "2024-01-20",
      verified: true,
      helpful: 67,
    },
    {
      id: 2,
      userName: "음악매니아",
      rating: 5,
      title: "음질 최고!",
      comment:
        "24bit 고음질이라서 스튜디오에서 녹음한 것처럼 깨끗하게 들려요. 가사도 포함되어 있어서 따라 부르기 좋습니다.",
      date: "2024-01-18",
      verified: true,
      helpful: 54,
    },
    {
      id: 3,
      userName: "뉴진스팬",
      rating: 4,
      title: "좋은 곡들이 많아요",
      comment: "최신 곡들이 잘 정리되어 있고, 앨범 아트도 예뻐요. 다만 좀 더 많은 곡이 있었으면 좋겠어요.",
      date: "2024-01-15",
      verified: true,
      helpful: 43,
    },
  ]

  const relatedProducts = [
    {
      id: 10,
      name: "클래식 마스터피스 컬렉션",
      price: "₩25,000",
      originalPrice: "₩35,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 11,
      name: "재즈 레전드 컬렉션",
      price: "₩18,000",
      originalPrice: "₩28,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 12,
      name: "일렉트로닉 댄스 믹스",
      price: "₩12,000",
      originalPrice: "₩20,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 234,
    },
    {
      id: 13,
      name: "힙합 & R&B 컬렉션",
      price: "₩16,000",
      originalPrice: "₩24,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 198,
    },
  ]

  return <ProductDetailPage product={product} reviews={reviews} relatedProducts={relatedProducts} />
}

export async function generateMetadata() {
  return {
    title: "K-POP 히트곡 컬렉션 2024 - 디지털마켓",
    description: "2024년 최신 K-POP 히트곡 50곡을 고음질 FLAC 포맷으로 제공하는 프리미엄 음원 컬렉션입니다.",
  }
}
