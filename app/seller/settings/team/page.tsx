"use client"

import { useState } from "react"
import { SellerLayout } from "@/components/seller/seller-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function SellerTeamPage() {
  const [inviteEmail, setInviteEmail] = useState("")
  const [team] = useState([
    { id: 1, name: "홍길동", email: "hong@tembus.com", role: "관리자" },
    { id: 2, name: "김영희", email: "kim@tembus.com", role: "멤버" },
  ])
  const pathname = usePathname()
  const tabs = [
    { label: "설정", href: "/seller/settings" },
    { label: "프로필", href: "/seller/settings/profile" },
    { label: "팀", href: "/seller/settings/team" },
    { label: "결제", href: "/seller/settings/payments" },
  ]

  return (
    <SellerLayout>
      <div className="max-w-2xl mx-auto">
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
        {/* 기존 팀 관리 UI */}
        <div className="space-y-8 py-8">{/* ... 이하 기존 UI ... */}</div>
      </div>
      <div className="max-w-2xl mx-auto space-y-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">팀 관리</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>팀원 초대</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="inviteEmail">이메일</Label>
              <Input id="inviteEmail" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="이메일 입력" />
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">초대</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>팀원 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>역할</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Select value={member.role}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="관리자">관리자</SelectItem>
                          <SelectItem value="멤버">멤버</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
} 