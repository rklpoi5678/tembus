"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Edit,
  Eye,
  Users,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Info,
  ArrowRight,
  Plus,
} from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

const gettingStartedSteps = [
  {
    title: "환영합니다",
    description: "자유템 계정을 만드세요.",
    icon: CheckCircle,
    completed: true,
    color: "bg-green-500",
  },
  {
    title: "인상을 남기세요",
    description: "프로필을 커스터마이징하세요.",
    icon: Edit,
    completed: false,
    color: "bg-blue-500",
  },
  {
    title: "쇼타임",
    description: "첫 번째 상품을 만드세요.",
    icon: Eye,
    completed: false,
    color: "bg-purple-500",
  },
  {
    title: "팬층을 구축하세요",
    description: "첫 번째 팔로워를 얻으세요.",
    icon: Users,
    completed: false,
    color: "bg-orange-500",
  },
  {
    title: "짜잔",
    description: "첫 번째 판매를 하세요.",
    icon: DollarSign,
    completed: false,
    color: "bg-yellow-500",
  },
  {
    title: "돈이 들어옵니다",
    description: "첫 번째 지급을 받으세요.",
    icon: TrendingUp,
    completed: false,
    color: "bg-green-500",
  },
  {
    title: "파장을 만들어보세요",
    description: "첫 번째 이메일 블라스트를 보내세요.",
    icon: Zap,
    completed: false,
    color: "bg-pink-500",
  },
  {
    title: "현명한 선택",
    description: "스마트 베타에 가입하세요.",
    icon: Target,
    completed: false,
    color: "bg-indigo-500",
  },
]

export default function SellerDashboard() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setAnalytics({
          balance: 0,
          last7Days: 0,
          last28Days: 0,
          totalEarnings: 0,
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      setLoading(false)
    }
  }

  const activityCards = [
    {
      title: "잔액",
      value: `$${analytics?.balance || 0}`,
      icon: Info,
      description: "지급 가능한 금액",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "최근 7일",
      value: `$${analytics?.last7Days || 0}`,
      icon: Info,
      description: "최근 수익",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "최근 28일",
      value: `$${analytics?.last28Days || 0}`,
      icon: Info,
      description: "월간 수익",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "총 수익",
      value: `$${analytics?.totalEarnings || 0}`,
      icon: Info,
      description: "전체 기간 수익",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <SellerLayout>
      <div className="space-y-8">
        {/* Getting Started Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">시작하기</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gettingStartedSteps.map((step, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${step.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{step.title}</h3>
                        {step.completed && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src="/images/seller-hero-illustration.png"
                alt="판매자 히어로 일러스트"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl font-bold mb-4">당신의 작업에 대한 대가를 받을 수 있도록 도와드립니다.</h2>
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 transition-colors duration-200">
                    첫 번째 상품 만들기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="mt-4">
                    <Link href="/seller/help" className="text-sm text-gray-200 underline hover:text-white transition-colors duration-200">
                      상품 만들기에 대해 더 알아보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">활동</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityCards.map((card, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-600 dark:text-gray-400 text-sm">{card.title}</h3>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${card.color}`}>
                      <card.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              팔로워와 판매가 들어오면 여기에 표시됩니다. 지금은{" "}
              <Link href="/seller/products/new" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200">
                상품을 만들거나
              </Link>{" "}
              {" "}
              <Link href="/seller/profile" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200">
                프로필을 커스터마이징
              </Link>
              해보세요
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">상품 만들기</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">작업 판매 시작하기</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <Edit className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">프로필 커스터마이징</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">좋은 첫인상 만들기</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">지급 설정</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">결제 방법 구성하기</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SellerLayout>
  )
}
