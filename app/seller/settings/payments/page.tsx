"use client"

import { useState } from "react"
import { SellerLayout } from "@/components/seller/seller-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SellerPaymentsPage() {
  const [bank, setBank] = useState("")
  const [account, setAccount] = useState("")
  const [taxEmail, setTaxEmail] = useState("")
  const [method, setMethod] = useState("bank")
  const pathname = usePathname()
  const tabs = [
    { label: "설정", href: "/seller/settings" },
    { label: "프로필", href: "/seller/settings/profile" },
    { label: "팀", href: "/seller/settings/team" },
    { label: "결제", href: "/seller/settings/payments" },
  ]
  
  return (
    <SellerLayout>
        <div className="max-w-xl mx-auto">
        {/* 가로형 탭 네비게이션 */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-8">
          {tabs.map(tab => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-2 -mb-px border-b-2 text-sm font-medium transition-colors duration-150
                ${pathname === tab.href ? "border-pink-500 text-pink-600 dark:text-pink-400" : "border-transparent text-gray-500 hover:text-pink-500"}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        {/* 기존 폼 */}
        <form className="space-y-8 py-8">{/* ... 이하 기존 폼 ... */}</form>
      </div>
      <form className="max-w-xl mx-auto space-y-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">결제 설정</h1>
          <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">저장</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>정산 계좌</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="bank">은행명</Label>
            <Input id="bank" value={bank} onChange={e => setBank(e.target.value)} placeholder="은행명 입력" />
            <Label htmlFor="account">계좌번호</Label>
            <Input id="account" value={account} onChange={e => setAccount(e.target.value)} placeholder="계좌번호 입력" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>결제 수단</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="method">결제 수단 선택</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="결제 수단 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">계좌 이체</SelectItem>
                <SelectItem value="card">카드 결제</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>세금계산서 이메일</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="taxEmail">이메일</Label>
            <Input id="taxEmail" value={taxEmail} onChange={e => setTaxEmail(e.target.value)} placeholder="세금계산서 수신 이메일 입력" />
          </CardContent>
        </Card>
      </form>
    </SellerLayout>
  )
} 