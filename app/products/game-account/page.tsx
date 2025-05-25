import { ProductDetailPage } from "@/components/product-detail-page"

export default function GameAccountPage() {
  const product = {
    id: 1,
    name: "리그 오브 레전드 프리미엄 계정",
    price: "₩89,000",
    originalPrice: "₩120,000",
    description: "다이아몬드 티어 프리미엄 게임 계정으로 150개 이상의 챔피언과 50개 이상의 스킨을 포함합니다.",
    longDescription: `이 프리미엄 리그 오브 레전드 계정은 수년간 정성스럽게 관리된 고급 계정입니다.

다이아몬드 티어에 도달한 이 계정은 뛰어난 실력을 증명하며, 150개 이상의 챔피언을 보유하고 있어 어떤 메타에도 대응할 수 있습니다.

50개 이상의 프리미엄 스킨을 포함하여 게임을 더욱 즐겁게 만들어줍니다. 모든 스킨은 정품이며, 계정 이전 후에도 영구적으로 사용 가능합니다.

계정에는 충분한 BE(블루 에센스)와 RP(라이엇 포인트)가 포함되어 있어 추가 구매 없이도 바로 게임을 즐기실 수 있습니다.`,
    category: "게임",
    badge: "인기",
    rating: 4.8,
    reviewCount: 156,
    images: [
      { url: "/placeholder.svg?height=600&width=600", alt: "계정 메인 화면", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "챔피언 목록", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "스킨 컬렉션", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "랭크 정보", type: "image" as const },
      { url: "/placeholder.svg?height=600&width=600", alt: "게임플레이 영상", type: "video" as const },
    ],
    specifications: [
      { label: "게임", value: "리그 오브 레전드" },
      { label: "서버", value: "한국 서버" },
      { label: "티어", value: "다이아몬드 4" },
      { label: "레벨", value: "150+" },
      { label: "챔피언 수", value: "150개" },
      { label: "스킨 수", value: "50개" },
    ],
    features: [
      "다이아몬드 티어 달성 계정",
      "150개 이상의 챔피언 보유",
      "50개 이상의 프리미엄 스킨",
      "충분한 BE 및 RP 보유",
      "깨끗한 계정 히스토리",
      "이메일 변경 가능",
      "24시간 고객 지원",
      "7일 환불 보장"
    ],
    developer: "Riot Games",
    version: "최신 버전",
    releaseDate: "2009년",
    languages: ["한국어", "영어", "일본어", "중국어"],
    platforms: ["Windows", "Mac"],
    genre: "MOBA",
    stockQuantity: 5
  }

  const reviews = [
    {
      id: 1,
      userName: "게이머123",
      rating: 5,
      title: "정말 만족스러운 계정입니다!",
      comment: "설명대로 다이아몬드 티어에 챔피언도 많고 스킨도 예쁜 것들로 많이 있어요. 계정 이전도 빠르게 처리해주셔서 감사합니다.",
      date: "2024-01-15",
      verified: true,
      helpful: 23
    },
    {
      id: 2,
      userName: "롤러코스터",
      rating: 4,
      title: "가격 대비 만족",
      comment: "다이아 계정을 이 가격에 살 수 있어서 좋았습니다. 스킨도 생각보다 많고 BE도 충분해요.",
      date: "2024-01-12",
      verified: true,
      helpful: 15
    },
    {
      id: 3,
      userName: "프로게이머지망생",
      rating: 5,
      title: "완벽한 계정",
      comment: "모든 챔피언이 있어서 연습하기 좋고, 랭크도 높아서 바로 고티어 게임을 즐길 수 있어요. 추천합니다!",
      date: "2024-01-10",
      verified: true,
      helpful: 31
    }
  ]

  const relatedProducts = [
    {
      id: 2,
      name: "발로란트 프리미엄 계정",
      price: "₩65,000",
      originalPrice: "₩85,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      name: "오버워치 레어 스킨 패키지",
      price: "₩45,000",
      originalPrice: "₩60,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 124
    },
    {
      id: 4,
      name: "배틀그라운드 시즌패스",
      price: "₩25,000",
      originalPrice: "₩35,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 67
    },
    {
      id: 5,
      name: "포트나이트 V-Bucks 패키지",
      price: "₩35,000",
      originalPrice: "₩45,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 198
    }
  ]

  return <ProductDetailPage product={product} reviews={reviews} relatedProducts={relatedProducts} />
}

export async function generateMetadata() {
  return {
    title: "리그 오브 레전드 프리미엄 계정 - 디지털마켓",
    description: "다이아몬드 티어 프리미엄 게임 계정으로 150개 이상의 챔피언과 50개 이상의 스킨을 포함합니다.",
  }
}
