"use client"

import { useState } from "react"
import { SellerLayout } from "@/components/seller/seller-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SellerSettingPage() {
  const [email, setEmail] = useState("kjdeok87@gmail.com")
  const [notifications, setNotifications] = useState({
    purchase: true,
    recurring: true,
    free: false,
    announce: true,
    comment: false,
    review: true,
  })
  const [supportEmail, setSupportEmail] = useState("kjdeok87@gmail.com")
  const [timezone, setTimezone] = useState("Asia/Seoul")
  const [currency, setCurrency] = useState("KRW")
  const [parity, setParity] = useState(false)
  const [adult, setAdult] = useState(false)
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
        <form className="space-y-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">설정</h1>
            <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">설정 저장</Button>
          </div>

          {/* 사용자 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>사용자 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" />
            </CardContent>
          </Card>

          {/* 알림 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>알림</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                원하는 알림을 이메일 또는 모바일로 받을 수 있습니다.
              </div>
              <div className="grid grid-cols-3 gap-2 font-medium text-gray-700 dark:text-gray-200">
                <div>알림 종류</div>
                <div className="text-center">이메일</div>
                <div className="text-center">모바일</div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center text-sm">
                <div>구매</div>
                <div className="flex justify-center"><Switch checked={notifications.purchase} onCheckedChange={v => setNotifications(n => ({...n, purchase: v}))} /></div>
                <div className="flex justify-center"><Switch checked={notifications.purchase} onCheckedChange={v => setNotifications(n => ({...n, purchase: v}))} /></div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center text-sm">
                <div>정기 결제</div>
                <div className="flex justify-center"><Switch checked={notifications.recurring} onCheckedChange={v => setNotifications(n => ({...n, recurring: v}))} /></div>
                <div className="flex justify-center"><Switch checked={notifications.recurring} onCheckedChange={v => setNotifications(n => ({...n, recurring: v}))} /></div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center text-sm">
                <div>무료 다운로드</div>
                <div className="flex justify-center"><Switch checked={notifications.free} onCheckedChange={v => setNotifications(n => ({...n, free: v}))} /></div>
                <div className="flex justify-center"><Switch checked={notifications.free} onCheckedChange={v => setNotifications(n => ({...n, free: v}))} /></div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center text-sm">
                <div>공지사항</div>
                <div className="flex justify-center"><Switch checked={notifications.announce} onCheckedChange={v => setNotifications(n => ({...n, announce: v}))} /></div>
                <div className="flex justify-center"><Switch checked={notifications.announce} onCheckedChange={v => setNotifications(n => ({...n, announce: v}))} /></div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center text-sm">
                <div>댓글</div>
                <div className="flex justify-center"><Switch checked={notifications.comment} onCheckedChange={v => setNotifications(n => ({...n, comment: v}))} /></div>
                <div className="flex justify-center"><Switch checked={notifications.comment} onCheckedChange={v => setNotifications(n => ({...n, comment: v}))} /></div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center text-sm">
                <div>리뷰</div>
                <div className="flex justify-center"><Switch checked={notifications.review} onCheckedChange={v => setNotifications(n => ({...n, review: v}))} /></div>
                <div className="flex justify-center"><Switch checked={notifications.review} onCheckedChange={v => setNotifications(n => ({...n, review: v}))} /></div>
              </div>
            </CardContent>
          </Card>

          {/* 고객지원 */}
          <Card>
            <CardHeader>
              <CardTitle>고객지원</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="supportEmail">고객지원 이메일</Label>
              <Input id="supportEmail" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} type="email" autoComplete="email" />
              <div className="text-xs text-gray-500 dark:text-gray-400">모든 판매 알림이 이 이메일로 발송됩니다.</div>
            </CardContent>
          </Card>

          {/* 로컬 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>로컬 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="timezone">시간대</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="시간대 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Seoul">(GMT+9) 서울</SelectItem>
                  <SelectItem value="America/Los_Angeles">(GMT-8) 미국/캐나다</SelectItem>
                  <SelectItem value="Europe/London">(GMT+0) 영국</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="currency">판매 통화</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="통화 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KRW">₩ (원)</SelectItem>
                  <SelectItem value="USD">$ (달러)</SelectItem>
                  <SelectItem value="EUR">€ (유로)</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 mt-2">
                <Switch checked={parity} onCheckedChange={setParity} id="parity" />
                <Label htmlFor="parity" className="text-sm">구매력 기준 가격 적용</Label>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">구매력 기준 가격을 적용하면 국가별로 다른 가격이 적용됩니다.</div>
            </CardContent>
          </Card>

          {/* 성인 콘텐츠 */}
          <Card>
            <CardHeader>
              <CardTitle>성인 콘텐츠</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Switch checked={adult} onCheckedChange={setAdult} id="adult" />
              <Label htmlFor="adult" className="text-sm">성인 콘텐츠를 추천 및 검색 결과에 표시</Label>
            </CardContent>
          </Card>

          <div className="text-right">
            <Button variant="link" className="text-red-500">모든 세션에서 로그아웃</Button>
          </div>
        </form>
      </div>
    </SellerLayout>
  )
} 