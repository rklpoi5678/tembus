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

const COLORS = ["#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

export default function SellerAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setAnalytics({
          totalRevenue: 12450,
          revenueGrowth: 15.3,
          totalSales: 89,
          salesGrowth: 8.2,
          totalViews: 2340,
          viewsGrowth: -2.1,
          conversionRate: 3.8,
          conversionGrowth: 12.5,
          salesByDay: [
            { date: "2024-01-01", sales: 120, revenue: 1200 },
            { date: "2024-01-02", sales: 150, revenue: 1500 },
            { date: "2024-01-03", sales: 180, revenue: 1800 },
            { date: "2024-01-04", sales: 200, revenue: 2000 },
            { date: "2024-01-05", sales: 170, revenue: 1700 },
            { date: "2024-01-06", sales: 220, revenue: 2200 },
            { date: "2024-01-07", sales: 250, revenue: 2500 },
          ],
          topProducts: [
            { name: "Digital Art Pack", sales: 45, revenue: 2250 },
            { name: "UI Kit Pro", sales: 32, revenue: 1920 },
            { name: "Photography Preset", sales: 28, revenue: 840 },
            { name: "Icon Collection", sales: 24, revenue: 720 },
            { name: "Font Bundle", sales: 18, revenue: 540 },
          ],
          salesByCategory: [
            { name: "Digital Art", value: 35, sales: 4200 },
            { name: "UI/UX", value: 25, sales: 3000 },
            { name: "Photography", value: 20, sales: 2400 },
            { name: "Icons", value: 12, sales: 1440 },
            { name: "Fonts", value: 8, sales: 960 },
          ],
          trafficSources: [
            { source: "Direct", visitors: 1200, percentage: 45 },
            { source: "Social Media", visitors: 800, percentage: 30 },
            { source: "Search", visitors: 400, percentage: 15 },
            { source: "Referral", visitors: 267, percentage: 10 },
          ],
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      setLoading(false)
    }
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `$${analytics?.totalRevenue?.toLocaleString() || 0}`,
      change: analytics?.revenueGrowth || 0,
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Total Sales",
      value: analytics?.totalSales?.toLocaleString() || 0,
      change: analytics?.salesGrowth || 0,
      icon: ShoppingCart,
      color: "text-blue-400",
    },
    {
      title: "Total Views",
      value: analytics?.totalViews?.toLocaleString() || 0,
      change: analytics?.viewsGrowth || 0,
      icon: Eye,
      color: "text-purple-400",
    },
    {
      title: "Conversion Rate",
      value: `${analytics?.conversionRate || 0}%`,
      change: analytics?.conversionGrowth || 0,
      icon: TrendingUp,
      color: "text-orange-400",
    },
  ]

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400">Track your performance and insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-full bg-gray-700 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                  )}
                  <span className={`text-sm ${stat.change > 0 ? "text-green-400" : "text-red-400"}`}>
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}%
                  </span>
                  <span className="text-sm text-gray-400 ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics?.salesByDay || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sales by Category */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Sales by Category</CardTitle>
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
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.topProducts?.map((product: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center text-white text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-gray-400">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${product.revenue}</p>
                      <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                        Revenue
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.trafficSources?.map((source: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }}></div>
                      <span className="text-white">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{source.visitors}</p>
                      <p className="text-gray-400 text-sm">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Trend */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analytics?.salesByDay || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
