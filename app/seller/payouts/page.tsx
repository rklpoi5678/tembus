"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Wallet, CreditCard, Building2, History, Download, Plus } from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"

export default function PayoutsPage() {
  const [selectedMethod, setSelectedMethod] = useState("bank")
  const [loading, setLoading] = useState(false)

  const payoutHistory = [
    {
      id: "1",
      date: "2024-01-15",
      amount: 1250000,
      status: "completed",
      method: "bank",
      account: "국민은행 123-456-789",
    },
    {
      id: "2",
      date: "2024-01-01",
      amount: 980000,
      status: "completed",
      method: "bank",
      account: "국민은행 123-456-789",
    },
    {
      id: "3",
      date: "2023-12-15",
      amount: 1560000,
      status: "completed",
      method: "bank",
      account: "국민은행 123-456-789",
    },
  ]

  const handlePayout = async () => {
    setLoading(true)
    try {
      // API 호출 로직
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("정산 요청 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">정산 관리</h1>
            <p className="text-gray-600 dark:text-gray-400">수익금을 안전하게 정산받으세요</p>
          </div>
          <Button onClick={handlePayout} disabled={loading} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            {loading ? "처리 중..." : "정산 요청"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 정산 가능 금액 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-purple-500" />
                정산 가능 금액
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">₩2,450,000</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">다음 정산일: 2024년 2월 1일</p>
              </div>
            </CardContent>
          </Card>

          {/* 정산 방법 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                정산 방법
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">계좌 이체</SelectItem>
                    <SelectItem value="card">카드</SelectItem>
                  </SelectContent>
                </Select>
                {selectedMethod === "bank" && (
                  <div className="space-y-2">
                    <Label>은행 계좌</Label>
                    <Input placeholder="은행명과 계좌번호를 입력하세요" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 정산 내역 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-green-500" />
                정산 내역
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₩3,790,000</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">지난 30일 동안의 정산액</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 정산 내역 테이블 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>정산 내역</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                내보내기
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>날짜</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>정산 방법</TableHead>
                  <TableHead>계좌 정보</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell className="font-medium">{payout.amount.toLocaleString()}원</TableCell>
                    <TableCell>
                      <Badge variant="secondary">완료</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span>계좌 이체</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{payout.account}</TableCell>
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
