"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  Search,
  MoreHorizontal,
  Eye,
  Download,
  RefreshCw,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  ShoppingCart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  products: {
    name: string
    price: number
    quantity: number
  }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  orderDate: string
  shippingAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingNumber?: string
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg",
    },
    products: [
      { name: "Premium Game Assets Pack", price: 49.99, quantity: 1 },
      { name: "UI Design Kit", price: 29.99, quantity: 2 },
    ],
    total: 109.97,
    status: "delivered",
    paymentStatus: "paid",
    orderDate: "2024-01-15T10:30:00Z",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    trackingNumber: "1Z999AA1234567890",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
    },
    products: [{ name: "Music Production Software", price: 199.99, quantity: 1 }],
    total: 199.99,
    status: "processing",
    paymentStatus: "paid",
    orderDate: "2024-01-18T14:22:00Z",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
    },
    products: [
      { name: "Mobile App Template", price: 79.99, quantity: 1 },
      { name: "Icon Pack", price: 19.99, quantity: 1 },
    ],
    total: 99.98,
    status: "shipped",
    paymentStatus: "paid",
    orderDate: "2024-01-19T09:15:00Z",
    trackingNumber: "1Z999AA1234567891",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Emily Chen",
      email: "emily@example.com",
    },
    products: [{ name: "E-book: Web Development", price: 24.99, quantity: 1 }],
    total: 24.99,
    status: "pending",
    paymentStatus: "pending",
    orderDate: "2024-01-20T16:45:00Z",
  },
  {
    id: "5",
    orderNumber: "ORD-2024-005",
    customer: {
      name: "David Brown",
      email: "david@example.com",
    },
    products: [{ name: "Video Course: React Mastery", price: 149.99, quantity: 1 }],
    total: 149.99,
    status: "cancelled",
    paymentStatus: "refunded",
    orderDate: "2024-01-17T11:30:00Z",
  },
]

export default function AdminOrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentFilter, setPaymentFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "shipped":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "processing":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "pending":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "refunded":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getPaymentBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "refunded":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const handleOrderAction = (action: string, orderId: string) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order) return

    switch (action) {
      case "process":
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "processing" as const } : o)))
        toast({
          title: "Order updated",
          description: `Order ${order.orderNumber} is now being processed.`,
        })
        break
      case "ship":
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? { ...o, status: "shipped" as const, trackingNumber: "1Z999AA" + Math.random().toString().slice(2, 12) }
              : o,
          ),
        )
        toast({
          title: "Order shipped",
          description: `Order ${order.orderNumber} has been shipped.`,
        })
        break
      case "deliver":
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "delivered" as const } : o)))
        toast({
          title: "Order delivered",
          description: `Order ${order.orderNumber} has been delivered.`,
        })
        break
      case "cancel":
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: "cancelled" as const, paymentStatus: "refunded" as const } : o,
          ),
        )
        toast({
          title: "Order cancelled",
          description: `Order ${order.orderNumber} has been cancelled and refunded.`,
          variant: "destructive",
        })
        break
      case "refund":
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: "refunded" as const } : o)))
        toast({
          title: "Order refunded",
          description: `Order ${order.orderNumber} has been refunded.`,
        })
        break
    }
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0),
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">주문 관리</h1>
            <p className="text-muted-foreground mt-2">고객 주문을 추적하고 관리하세요</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            주문 내보내기
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">전체 주문</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">대기중</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">처리중</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.processing}</p>
                </div>
                <Package className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">배송중</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.shipped}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">매출</p>
                  <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 필터 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="주문 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="상태별 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="processing">처리중</SelectItem>
                  <SelectItem value="shipped">배송중</SelectItem>
                  <SelectItem value="delivered">배송완료</SelectItem>
                  <SelectItem value="cancelled">취소됨</SelectItem>
                  <SelectItem value="refunded">환불됨</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="결제별 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 결제</SelectItem>
                  <SelectItem value="paid">결제완료</SelectItem>
                  <SelectItem value="pending">결제대기</SelectItem>
                  <SelectItem value="failed">결제실패</SelectItem>
                  <SelectItem value="refunded">환불됨</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 주문 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle>주문 ({filteredOrders.length})</CardTitle>
            <CardDescription>고객 주문을 관리하고 상태를 추적하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객</TableHead>
                  <TableHead>상품</TableHead>
                  <TableHead>총액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>결제</TableHead>
                  <TableHead>날짜</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        {order.trackingNumber && (
                          <p className="text-sm text-muted-foreground">운송장: {order.trackingNumber}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
                          <AvatarFallback>{order.customer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.products.length} 개</p>
                        <p className="text-sm text-muted-foreground">
                          {order.products[0].name}
                          {order.products.length > 1 && ` 외 ${order.products.length - 1}개`}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPaymentBadgeColor(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>작업</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            상세 보기
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {order.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleOrderAction("process", order.id)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              처리 시작
                            </DropdownMenuItem>
                          )}
                          {order.status === "processing" && (
                            <DropdownMenuItem onClick={() => handleOrderAction("ship", order.id)}>
                              <Truck className="mr-2 h-4 w-4" />
                              배송 시작
                            </DropdownMenuItem>
                          )}
                          {order.status === "shipped" && (
                            <DropdownMenuItem onClick={() => handleOrderAction("deliver", order.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              배송 완료 처리
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleOrderAction("refund", order.id)}
                            className="text-blue-600"
                          >
                            <DollarSign className="mr-2 h-4 w-4" />
                            환불 처리
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleOrderAction("cancel", order.id)}
                            className="text-red-600"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            주문 취소
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 주문 상세 정보 다이얼로그 */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>주문 상세 정보</DialogTitle>
              <DialogDescription>
                {selectedOrder?.orderNumber} - {selectedOrder?.customer.name}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                {/* 고객 정보 */}
                <div>
                  <h4 className="font-medium mb-3">고객 정보</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedOrder.customer.avatar || "/placeholder.svg"}
                          alt={selectedOrder.customer.name}
                        />
                        <AvatarFallback>{selectedOrder.customer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedOrder.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                      </div>
                    </div>
                    {selectedOrder.shippingAddress && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium mb-1">배송 주소:</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.shippingAddress.street}
                          <br />
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                          {selectedOrder.shippingAddress.zipCode}
                          <br />
                          {selectedOrder.shippingAddress.country}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 상품 목록 */}
                <div>
                  <h4 className="font-medium mb-3">상품 목록</h4>
                  <div className="space-y-2">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">수량: {product.quantity}</p>
                        </div>
                        <p className="font-medium">₩{(product.price * product.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 border-t font-medium">
                      <span>총액:</span>
                      <span>₩{selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* 주문 상태 */}
                <div>
                  <h4 className="font-medium mb-3">주문 상태</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">주문 상태</p>
                      <Badge variant="outline" className={getStatusBadgeColor(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">결제 상태</p>
                      <Badge variant="outline" className={getPaymentBadgeColor(selectedOrder.paymentStatus)}>
                        {selectedOrder.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-1">운송장 번호</p>
                      <p className="font-mono text-sm">{selectedOrder.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
