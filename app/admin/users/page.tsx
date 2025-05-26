"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  UserPlus,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  Package,
  Users,
  Crown,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockUsers = [
  {
    id: "1",
    name: "김민수",
    email: "kim@example.com",
    avatar: "/placeholder.svg",
    role: "admin",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20",
    totalSpent: 0,
    totalProducts: 0,
    totalSales: 0,
    emailVerified: true,
    phone: "+82 10-1234-5678",
  },
  {
    id: "2",
    name: "이지은",
    email: "lee@example.com",
    role: "seller",
    status: "active",
    joinDate: "2023-03-22",
    lastLogin: "2024-01-19",
    totalSpent: 0,
    totalProducts: 15,
    totalSales: 12450,
    emailVerified: true,
  },
  {
    id: "3",
    name: "박준호",
    email: "park@example.com",
    role: "customer",
    status: "active",
    joinDate: "2023-06-10",
    lastLogin: "2024-01-18",
    totalSpent: 299.99,
    totalProducts: 0,
    totalSales: 0,
    emailVerified: true,
  },
  {
    id: "4",
    name: "정수빈",
    email: "jung@example.com",
    role: "seller",
    status: "suspended",
    joinDate: "2023-08-05",
    lastLogin: "2024-01-10",
    totalSpent: 0,
    totalProducts: 8,
    totalSales: 3200,
    emailVerified: false,
  },
  {
    id: "5",
    name: "최현우",
    email: "choi@example.com",
    role: "customer",
    status: "pending",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-15",
    totalSpent: 0,
    totalProducts: 0,
    totalSales: 0,
    emailVerified: false,
  },
]

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "seller" | "customer"
  status: "active" | "suspended" | "pending"
  joinDate: string
  lastLogin: string
  totalSpent: number
  totalProducts: number
  totalSales: number
  emailVerified: boolean
  phone?: string
}

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "seller":
        return <Package className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "seller":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "customer":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const handleUserAction = (action: string, userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    switch (action) {
      case "suspend":
        setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: "suspended" as const } : u)))
        toast({
          title: "User suspended",
          description: `${user.name} has been suspended.`,
        })
        break
      case "activate":
        setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: "active" as const } : u)))
        toast({
          title: "User activated",
          description: `${user.name} has been activated.`,
        })
        break
      case "delete":
        setUsers((prev) => prev.filter((u) => u.id !== userId))
        toast({
          title: "User deleted",
          description: `${user.name} has been deleted.`,
          variant: "destructive",
        })
        break
      case "edit":
        setSelectedUser(user)
        setIsEditDialogOpen(true)
        break
    }
  }

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    pending: users.filter((u) => u.status === "pending").length,
    admins: users.filter((u) => u.role === "admin").length,
    sellers: users.filter((u) => u.role === "seller").length,
    customers: users.filter((u) => u.role === "customer").length,
  }
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">사용자 관리</h1>
            <p className="text-muted-foreground mt-2">사용자 계정, 역할 및 권한을 관리하세요</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            사용자 추가
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">전체 사용자</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">활성 사용자</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">판매자</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.sellers}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">대기 중</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <XCircle className="h-8 w-8 text-yellow-600" />
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
                    placeholder="사용자 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="역할별 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 역할</SelectItem>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="seller">판매자</SelectItem>
                  <SelectItem value="customer">고객</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="상태별 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="suspended">정지됨</SelectItem>
                  <SelectItem value="pending">대기 중</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 사용자 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 ({filteredUsers.length})</CardTitle>
            <CardDescription>사용자 계정 및 권한 관리</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>사용자</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>가입일</TableHead>
                  <TableHead>마지막 로그인</TableHead>
                  <TableHead>활동</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{user.name}</p>
                            {user.emailVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(user.role)}
                          {user.role === "admin" ? "관리자" : user.role === "seller" ? "판매자" : "고객"}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                        {user.status === "active" ? "활성" : user.status === "suspended" ? "정지됨" : "대기 중"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {user.role === "seller" && (
                          <>
                            <p>{user.totalProducts}개 상품</p>
                            <p className="text-muted-foreground">${user.totalSales.toLocaleString()} 매출</p>
                          </>
                        )}
                        {user.role === "customer" && <p>${user.totalSpent.toLocaleString()} 지출</p>}
                        {user.role === "admin" && <p className="text-muted-foreground">관리자</p>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>작업</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            수정
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleUserAction("suspend", user.id)}
                              className="text-yellow-600"
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              정지
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleUserAction("activate", user.id)}
                              className="text-green-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              활성화
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUserAction("delete", user.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            삭제
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
        {/* 사용자 수정 다이얼로그 */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>사용자 수정</DialogTitle>
              <DialogDescription>사용자 계정 정보를 수정하세요.</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    이름
                  </Label>
                  <Input id="name" defaultValue={selectedUser.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    이메일
                  </Label>
                  <Input id="email" defaultValue={selectedUser.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    역할
                  </Label>
                  <Select defaultValue={selectedUser.role}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">관리자</SelectItem>
                      <SelectItem value="seller">판매자</SelectItem>
                      <SelectItem value="customer">고객</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    상태
                  </Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="suspended">정지</SelectItem>
                      <SelectItem value="pending">대기중</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>
                변경 사항 저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
