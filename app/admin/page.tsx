"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import type { Analytics } from "@/lib/types"
import Link from "next/link"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error("분석 데이터 가져오기 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  const stats = [
    {
      title: "총 수익",
      value: `$${analytics?.totalSales.toLocaleString() || 0}`,
      change: analytics?.revenueGrowth || 0,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "총 주문",
      value: analytics?.totalOrders.toLocaleString() || 0,
      change: analytics?.orderGrowth || 0,
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "총 상품",
      value: analytics?.totalProducts.toLocaleString() || 0,
      change: 5.2,
      icon: Package,
      color: "text-purple-600",
    },
    {
      title: "총 사용자",
      value: analytics?.totalUsers.toLocaleString() || 0,
      change: 12.5,
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">대시보드</h1>
            <p className="text-muted-foreground">다시 오신 것을 환영합니다! 스토어 현황을 살펴보세요.</p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Package className="mr-2 h-4 w-4" />
              상품 추가
            </Link>
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${stat.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}%
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">전월 대비</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 매출 차트 */}
          <Card>
            <CardHeader>
              <CardTitle>매출 개요</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.salesByMonth || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 카테고리별 매출 */}
          <Card>
            <CardHeader>
              <CardTitle>카테고리별 매출</CardTitle>
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
                    dataKey="sales"
                  >
                    {(analytics?.salesByCategory || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 인기 상품 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>인기 상품</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/products">
                  전체 보기
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.topProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.salesCount}개 판매</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${product.price}</p>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 최근 주문 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>최근 주문</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">
                  전체 보기
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.recentOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">#{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.user.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total}</p>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status === "delivered" ? "배송 완료" : 
                         order.status === "processing" ? "처리 중" : order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
