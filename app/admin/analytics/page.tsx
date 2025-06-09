"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, DollarSign, Users, ShoppingCart, Download, CreditCard, Globe } from "lucide-react"

const revenueData = [
  { month: "1월", revenue: 45000, orders: 120, users: 1200 },
  { month: "2월", revenue: 52000, orders: 145, users: 1350 },
  { month: "3월", revenue: 48000, orders: 132, users: 1280 },
  { month: "4월", revenue: 61000, orders: 168, users: 1520 },
  { month: "5월", revenue: 55000, orders: 155, users: 1420 },
  { month: "6월", revenue: 67000, orders: 189, users: 1680 },
  { month: "7월", revenue: 72000, orders: 201, users: 1750 },
  { month: "8월", revenue: 69000, orders: 195, users: 1690 },
  { month: "9월", revenue: 78000, orders: 218, users: 1890 },
  { month: "10월", revenue: 82000, orders: 235, users: 1950 },
  { month: "11월", revenue: 89000, orders: 252, users: 2100 },
  { month: "12월", revenue: 95000, orders: 268, users: 2250 },
]

const categoryData = [
  { name: "게임", value: 35, revenue: 285000, color: "#8b5cf6" },
  { name: "소프트웨어", value: 28, revenue: 228000, color: "#06b6d4" },
  { name: "음악", value: 18, revenue: 146000, color: "#10b981" },
  { name: "모바일 앱", value: 12, revenue: 98000, color: "#f59e0b" },
  { name: "디자인", value: 7, revenue: 57000, color: "#ef4444" },
]

const trafficData = [
  { source: "직접 방문", visitors: 12500, percentage: 35 },
  { source: "구글", visitors: 8900, percentage: 25 },
  { source: "소셜 미디어", visitors: 6200, percentage: 17 },
  { source: "이메일", visitors: 4300, percentage: 12 },
  { source: "추천", visitors: 3900, percentage: 11 },
]

const topProducts = [
  { name: "프리미엄 게임 에셋 팩", sales: 1250, revenue: 62500 },
  { name: "UI 디자인 시스템", sales: 980, revenue: 49000 },
  { name: "음악 제작 스위트", sales: 750, revenue: 149250 },
  { name: "모바일 앱 템플릿", sales: 650, revenue: 51350 },
  { name: "비디오 강의 번들", sales: 420, revenue: 62580 },
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12months")

  const currentMonthRevenue = 95000
  const previousMonthRevenue = 89000
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100

  const currentMonthOrders = 268
  const previousMonthOrders = 252
  const ordersGrowth = ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100

  const currentMonthUsers = 2250
  const previousMonthUsers = 2100
  const usersGrowth = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0)
  const totalUsers = currentMonthUsers
  const averageOrderValue = totalRevenue / totalOrders

  return (
<AdminLayout>
  <div className="space-y-6">
    {/* 헤더 */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">분석 대시보드</h1>
        <p className="text-muted-foreground mt-2">플랫폼 성능 및 인사이트 모니터링</p>
      </div>
      <div className="flex gap-2">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">지난 7일</SelectItem>
            <SelectItem value="30days">지난 30일</SelectItem>
            <SelectItem value="3months">지난 3개월</SelectItem>
            <SelectItem value="12months">지난 12개월</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          보고서 내보내기
        </Button>
      </div>
    </div>

    {/* 주요 지표 */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">총 수익</p>
              <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+{revenueGrowth.toFixed(1)}%</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">총 주문</p>
              <p className="text-2xl font-bold">{totalOrders.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+{ordersGrowth.toFixed(1)}%</span>
              </div>
            </div>
            <ShoppingCart className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">총 사용자</p>
              <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+{usersGrowth.toFixed(1)}%</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">평균 주문 가치</p>
              <p className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+2.3%</span>
              </div>
            </div>
            <CreditCard className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>

    {/* 차트 */}
    <Tabs defaultValue="revenue" className="space-y-6">
      <TabsList>
        <TabsTrigger value="revenue">수익 추세</TabsTrigger>
        <TabsTrigger value="categories">카테고리</TabsTrigger>
        <TabsTrigger value="traffic">트래픽 소스</TabsTrigger>
        <TabsTrigger value="products">상위 제품</TabsTrigger>
      </TabsList>

      <TabsContent value="revenue" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>시간에 따른 수익</CardTitle>
              <CardDescription>월별 수익 추세</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "수익",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      fill="var(--color-revenue)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>주문 및 사용자</CardTitle>
              <CardDescription>월별 주문 및 사용자 성장</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  orders: {
                    label: "주문",
                    color: "hsl(var(--chart-2))",
                  },
                  users: {
                    label: "사용자",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} />
                    <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="categories" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>카테고리별 판매</CardTitle>
              <CardDescription>카테고리별 판매 분포</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "비율",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>카테고리 수익</CardTitle>
              <CardDescription>카테고리별 수익 분포</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${category.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{category.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="traffic" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>트래픽 소스</CardTitle>
              <CardDescription>방문자가 어디에서 오는지</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  visitors: {
                    label: "방문자",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="visitors" fill="var(--color-visitors)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>트래픽 분석</CardTitle>
              <CardDescription>상세한 트래픽 소스 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficData.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Globe className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{source.visitors.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="products" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>상위 성과 제품</CardTitle>
            <CardDescription>수익 및 판매량 기준 베스트셀러 제품</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} 판매</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(product.revenue / product.sales).toFixed(2)} 평균
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</AdminLayout>
  )
}
