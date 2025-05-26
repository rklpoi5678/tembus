"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Palette, Settings, Eye, Save, Upload, Mail, Shield, Smartphone, Monitor } from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"

interface CheckoutSettings {
  branding: {
    logo: string
    primaryColor: string
    backgroundColor: string
    fontFamily: string
    customCSS: string
  }
  payments: {
    stripe: boolean
    paypal: boolean
    applePay: boolean
    googlePay: boolean
    cryptocurrency: boolean
  }
  checkout: {
    guestCheckout: boolean
    requirePhone: boolean
    requireAddress: boolean
    showTaxes: boolean
    showShipping: boolean
    autoRedirect: boolean
    redirectUrl: string
  }
  emails: {
    confirmationEmail: boolean
    receiptEmail: boolean
    customEmailTemplate: string
    fromEmail: string
    fromName: string
  }
  security: {
    sslRequired: boolean
    fraudProtection: boolean
    captcha: boolean
    ipBlocking: boolean
  }
}

export default function CheckoutSettings() {
  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [settings, setSettings] = useState({
    branding: {
      logo: "",
      primaryColor: "#4F46E5",
      backgroundColor: "#FFFFFF",
      fontFamily: "Inter",
      customCSS: "",
    },
    payments: {
      stripe: true,
      paypal: true,
      applePay: false,
      googlePay: false,
    },
    checkout: {
      guestCheckout: true,
      requirePhone: false,
      requireAddress: false,
      showTaxes: true,
      showShipping: false,
      autoRedirect: true,
      redirectUrl: "",
    },
    emails: {
      fromName: "",
      fromEmail: "",
      confirmationEmail: true,
      receiptEmail: true,
      customEmailTemplate: "",
    },
    security: {
      sslRequired: true,
      fraudProtection: true,
      captcha: false,
      ipBlocking: false,
    },
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // API 호출 로직
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("설정 저장 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBranding = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      branding: { ...prev.branding, [key]: value },
    }))
  }

  const updatePayments = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      payments: { ...prev.payments, [key]: value },
    }))
  }

  const updateCheckout = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      checkout: { ...prev.checkout, [key]: value },
    }))
  }

  const updateEmails = (key: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      emails: { ...prev.emails, [key]: value },
    }))
  }

  const updateSecurity = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: value },
    }))
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">결제 설정</h1>
            <p className="text-gray-600 dark:text-gray-400">결제 경험을 맞춤 설정하세요</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={previewMode === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleSave} disabled={loading} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
              <Save className="mr-2 h-4 w-4" />
              {loading ? "저장 중..." : "변경사항 저장"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 설정 패널 */}
          <div className="space-y-6">
            <Tabs defaultValue="branding" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="branding">
                  <Palette className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <CreditCard className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="checkout">
                  <Settings className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="emails">
                  <Mail className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="branding" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>브랜딩 및 디자인</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="logo">로고</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="logo"
                          placeholder="로고 URL"
                          value={settings.branding.logo}
                          onChange={(e) => updateBranding("logo", e.target.value)}
                        />
                        <Button variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primaryColor">기본 색상</Label>
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.branding.primaryColor}
                          onChange={(e) => updateBranding("primaryColor", e.target.value)}
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="backgroundColor">배경 색상</Label>
                        <Input
                          id="backgroundColor"
                          type="color"
                          value={settings.branding.backgroundColor}
                          onChange={(e) => updateBranding("backgroundColor", e.target.value)}
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="fontFamily">글꼴</Label>
                      <Select
                        value={settings.branding.fontFamily}
                        onValueChange={(value) => updateBranding("fontFamily", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                          <SelectItem value="Lato">Lato</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>결제 방법</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(settings.payments).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">
                              {key === 'stripe' ? '카드 결제' : 
                               key === 'paypal' ? '페이팔' : 
                               key === 'applePay' ? '애플 페이' : 
                               key === 'googlePay' ? '구글 페이' : key}
                            </p>
                          </div>
                        </div>
                        <Switch checked={enabled} onCheckedChange={(checked) => updatePayments(key, checked)} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="checkout" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>결제 옵션</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(settings.checkout).map(([key, value]) => {
                      if (key === "redirectUrl") {
                        return (
                          <div key={key}>
                            <Label htmlFor={key}>리디렉션 URL</Label>
                            <Input
                              id={key}
                              placeholder="https://yoursite.com/thank-you"
                              value={value as string}
                              onChange={(e) => updateCheckout(key, e.target.value)}
                            />
                          </div>
                        )
                      }

                      return (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {key === 'guestCheckout' ? '게스트 결제' : 
                               key === 'requirePhone' ? '전화번호 필수' :
                               key === 'requireAddress' ? '주소 필수' :
                               key === 'showTaxes' ? '세금 표시' :
                               key === 'showShipping' ? '배송비 표시' :
                               key === 'autoRedirect' ? '자동 리디렉션' : key}
                            </p>
                          </div>
                          <Switch
                            checked={value as boolean}
                            onCheckedChange={(checked) => updateCheckout(key, checked)}
                          />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emails" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>이메일 설정</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fromName">발신자 이름</Label>
                        <Input
                          id="fromName"
                          value={settings.emails.fromName}
                          onChange={(e) => updateEmails("fromName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fromEmail">발신자 이메일</Label>
                        <Input
                          id="fromEmail"
                          type="email"
                          value={settings.emails.fromEmail}
                          onChange={(e) => updateEmails("fromEmail", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">주문 확인 이메일</p>
                        </div>
                        <Switch
                          checked={settings.emails.confirmationEmail}
                          onCheckedChange={(checked) => updateEmails("confirmationEmail", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">영수증 이메일</p>
                        </div>
                        <Switch
                          checked={settings.emails.receiptEmail}
                          onCheckedChange={(checked) => updateEmails("receiptEmail", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>보안 설정</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(settings.security).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {key === 'sslRequired' ? 'SSL 필수' :
                             key === 'fraudProtection' ? '사기 방지' :
                             key === 'captcha' ? '캡차 인증' :
                             key === 'ipBlocking' ? 'IP 차단' : key}
                          </p>
                        </div>
                        <Switch checked={enabled} onCheckedChange={(checked) => updateSecurity(key, checked)} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 미리보기 패널 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  결제 미리보기
                  <Badge variant="secondary" className="ml-auto">
                    {previewMode === 'desktop' ? '데스크톱' : '모바일'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`bg-white rounded-lg p-6 ${previewMode === "mobile" ? "max-w-sm mx-auto" : ""}`}
                  style={{ backgroundColor: settings.branding.backgroundColor }}
                >
                  <div className="space-y-4">
                    <div className="text-center">
                      {settings.branding.logo ? (
                        <img
                          src={settings.branding.logo}
                          alt="로고"
                          className="h-12 mx-auto mb-4"
                        />
                      ) : (
                        <div className="h-12 w-32 bg-gray-100 rounded mx-auto mb-4 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">로고</span>
                        </div>
                      )}
                      <h2 className="text-xl font-bold" style={{ color: settings.branding.primaryColor }}>
                        구매 완료하기
                      </h2>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="font-medium mb-2">주문 요약</h3>
                      <div className="flex justify-between">
                        <span>디지털 상품</span>
                        <span>₩29,900</span>
                      </div>
                      {settings.checkout.showTaxes && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>세금</span>
                          <span>₩2,990</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>총액</span>
                        <span>₩{settings.checkout.showTaxes ? "32,890" : "29,900"}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">이메일</label>
                        <input type="email" className="w-full p-2 border rounded" placeholder="your@email.com" />
                      </div>
                      {settings.checkout.requirePhone && (
                        <div>
                          <label className="block text-sm font-medium mb-1">전화번호</label>
                          <input type="tel" className="w-full p-2 border rounded" placeholder="010-1234-5678" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">결제 방법</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {settings.payments.stripe && <div className="p-2 border rounded text-center text-sm">카드</div>}
                        {settings.payments.paypal && <div className="p-2 border rounded text-center text-sm">페이팔</div>}
                        {settings.payments.applePay && <div className="p-2 border rounded text-center text-sm">애플 페이</div>}
                        {settings.payments.googlePay && <div className="p-2 border rounded text-center text-sm">구글 페이</div>}
                      </div>
                    </div>

                    <button
                      className="w-full py-3 rounded font-medium text-white"
                      style={{ backgroundColor: settings.branding.primaryColor }}
                    >
                      구매 완료
                    </button>

                    {settings.checkout.guestCheckout && (
                      <p className="text-center text-sm text-gray-600">계정 불필요 • 안전한 결제</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SellerLayout>
  )
}
