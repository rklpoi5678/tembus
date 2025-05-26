"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { DollarSign, TrendingUp, TrendingDown, ShoppingCart, Eye, Download } from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"

const COLORS = ["#4F46E5", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

export default function SellerAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      // API 호출 시뮬레이션
      setTimeout(() => {
        setAnalytics({
          totalRevenue: 12450000,
          revenueGrowth: 15.3,
          totalSales: 89,
          salesGrowth: 8.2,
          totalViews: 2340,
          viewsGrowth: -2.1,
          conversionRate: 3.8,
          conversionGrowth: 12.5,
          salesByDay: [
            { date: "1월 1일", sales: 120, revenue: 1200000 },
            { date: "1월 2일", sales: 150, revenue: 1500000 },
            { date: "1월 3일", sales: 180, revenue: 1800000 },
            { date: "1월 4일", sales: 200, revenue: 2000000 },
            { date: "1월 5일", sales: 170, revenue: 1700000 },
            { date: "1월 6일", sales: 220, revenue: 2200000 },
            { date: "1월 7일", sales: 250, revenue: 2500000 },
          ],
          topProducts: [
            { name: "디지털 아트 팩", sales: 45, revenue: 2250000 },
            { name: "UI 키트 프로", sales: 32, revenue: 1920000 },
            { name: "포토 프리셋", sales: 28, revenue: 840000 },
            { name: "아이콘 컬렉션", sales: 24, revenue: 720000 },
            { name: "폰트 번들", sales: 18, revenue: 540000 },
          ],
          salesByCategory: [
            { name: "디지털 아트", value: 35, sales: 4200000 },
            { name: "UI/UX", value: 25, sales: 3000000 },
            { name: "포토그래피", value: 20, sales: 2400000 },
            { name: "아이콘", value: 12, sales: 1440000 },
            { name: "폰트", value: 8, sales: 960000 },
          ],
          trafficSources: [
            { source: "직접 방문", visitors: 1200, percentage: 45 },
            { source: "소셜 미디어", visitors: 800, percentage: 30 },
            { source: "검색", visitors: 400, percentage: 15 },
            { source: "추천", visitors: 267, percentage: 10 },
          ],
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("분석 데이터를 가져오는데 실패했습니다:", error)
      setLoading(false)
    }
  }

  const stats = [
    {
      title: "총 매출",
      value: `${(analytics?.totalRevenue || 0).toLocaleString()}원`,
      change: analytics?.revenueGrowth || 0,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "총 판매량",
      value: (analytics?.totalSales || 0).toLocaleString(),
      change: analytics?.salesGrowth || 0,
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      title: "총 조회수",
      value: (analytics?.totalViews || 0).toLocaleString(),
      change: analytics?.viewsGrowth || 0,
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "전환율",
      value: `${analytics?.conversionRate || 0}%`,
      change: analytics?.conversionGrowth || 0,
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">분석 대시보드</h1>
            <p className="text-gray-600 dark:text-gray-400">성과 및 인사이트를 확인하세요</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">최근 7일</SelectItem>
                <SelectItem value="30d">최근 30일</SelectItem>
                <SelectItem value="90d">최근 90일</SelectItem>
                <SelectItem value="1y">최근 1년</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              내보내기
            </Button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${stat.change > 0 ? "text-green-500" : "text-red-500"}`}>
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}%
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">전월 대비</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 매출 추이 */}
          <Card>
            <CardHeader>
              <CardTitle>매출 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics?.salesByDay || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="date" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip
                    formatter={(value: number) => [`${value.toLocaleString()}원`, "매출"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 카테고리별 판매 */}
          <Card>
            <CardHeader>
              <CardTitle>카테고리별 판매</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.salesByCategory || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(analytics?.salesByCategory || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value.toLocaleString()}원`, "매출"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 인기 상품 */}
          <Card>
            <CardHeader>
              <CardTitle>인기 상품</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.topProducts?.map((product: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded flex items-center justify-center text-white text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales}건 판매</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">{product.revenue.toLocaleString()}원</p>
                      <Badge variant="secondary">매출</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 트래픽 소스 */}
          <Card>
            <CardHeader>
              <CardTitle>트래픽 소스</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.trafficSources?.map((source: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }}></div>
                      <span className="text-gray-900 dark:text-white">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 dark:text-white font-medium">{source.visitors.toLocaleString()}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 판매 추이 */}
        <Card>
          <CardHeader>
            <CardTitle>판매 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analytics?.salesByDay || []}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="date" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()}건`, "판매량"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{ fill: "#4F46E5", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
