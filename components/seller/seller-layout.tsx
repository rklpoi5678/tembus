"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Package,
  Users,
  CreditCard,
  BarChart3,
  DollarSign,
  PackageOpen,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  ChevronDown,
  Zap,
  Tickets,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const sidebarItems = [
  {
    title: "홈",
    href: "/seller",
    icon: Home,
  },
  {
    title: "상품",
    href: "/seller/products",
    icon: Package,
  },
  {
    title: "이벤트",
    href: "/seller/events",
    icon: Tickets,
  },
  {
    title: "협력자",
    href: "/seller/collaborators",
    icon: Users,
  },
  {
    title: "결제",
    href: "/seller/checkout",
    icon: CreditCard,
  },
  {
    title: "분석",
    href: "/seller/analytics",
    icon: BarChart3,
  },
  {
    title: "지급",
    href: "/seller/payouts",
    icon: DollarSign,
  },
  {
    title: "보관함",
    href: "/seller/library",
    icon: PackageOpen,
  },
]

const bottomItems = [
  {
    title: "설정",
    href: "/seller/settings",
    icon: Settings,
  },
  {
    title: "도움말",
    href: "/support/faq",
    icon: HelpCircle,
  },
]

interface SellerLayoutProps {
  children: React.ReactNode
}

export function SellerLayout({ children }: SellerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden text-gray-600 dark:text-gray-300" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">자유템</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
                {user?.seller?.storeName}님

              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 ring-2 ring-gray-200 dark:ring-gray-700">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs leading-none text-gray-500 dark:text-gray-400">{user?.email}</p>
                      {user?.seller?.storeName && <p className="text-xs leading-none text-gray-500 dark:text-gray-400">{user.seller.storeName}</p>}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem asChild className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/seller/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      설정
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  <DropdownMenuItem onClick={logout} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1920px] mx-auto">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="icon" className="lg:hidden text-gray-600 dark:text-gray-300" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex-1 px-3 py-4 overflow-y-auto">
              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                {bottomItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
