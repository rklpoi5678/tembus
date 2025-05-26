"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Save, Upload, Globe, CreditCard, Mail, Shield, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PlatformSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    contactEmail: string
    supportEmail: string
    logo: string
    favicon: string
    timezone: string
    language: string
  }
  payments: {
    stripePublishableKey: string
    stripeSecretKey: string
    paypalClientId: string
    paypalClientSecret: string
    commissionRate: number
    minimumPayout: number
    payoutSchedule: string
    taxCalculation: boolean
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
    emailVerificationRequired: boolean
    welcomeEmailEnabled: boolean
  }
  security: {
    twoFactorRequired: boolean
    passwordMinLength: number
    sessionTimeout: number
    maxLoginAttempts: number
    ipWhitelist: string
    sslRequired: boolean
    corsOrigins: string
  }
  notifications: {
    newUserNotifications: boolean
    newOrderNotifications: boolean
    payoutNotifications: boolean
    systemMaintenanceNotifications: boolean
    emailNotifications: boolean
    pushNotifications: boolean
  }
  appearance: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    darkMode: boolean
    customCSS: string
    headerScript: string
    footerScript: string
  }
}

const defaultSettings: PlatformSettings = {
  general: {
    siteName: "디지털 마켓플레이스",
    siteDescription: "디지털 제품을 사고 팔기 위한 최고의 장소",
    siteUrl: "https://marketplace.com",
    contactEmail: "contact@marketplace.com",
    supportEmail: "support@marketplace.com",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    timezone: "UTC",
    language: "ko",
  },
  payments: {
    stripePublishableKey: "",
    stripeSecretKey: "",
    paypalClientId: "",
    paypalClientSecret: "",
    commissionRate: 5,
    minimumPayout: 50,
    payoutSchedule: "weekly",
    taxCalculation: true,
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@marketplace.com",
    fromName: "디지털 마켓플레이스",
    emailVerificationRequired: true,
    welcomeEmailEnabled: true,
  },
  security: {
    twoFactorRequired: false,
    passwordMinLength: 8,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    ipWhitelist: "",
    sslRequired: true,
    corsOrigins: "*",
  },
  notifications: {
    newUserNotifications: true,
    newOrderNotifications: true,
    payoutNotifications: true,
    systemMaintenanceNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
  },
  appearance: {
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    accentColor: "#f59e0b",
    darkMode: false,
    customCSS: "",
    headerScript: "",
    footerScript: "",
  },
}

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)

  const updateSetting = (section: keyof PlatformSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "설정 저장됨",
        description: "플랫폼 설정이 성공적으로 업데이트되었습니다.",
      })
    } catch (error) {
      toast({
        title: "설정 저장 오류",
        description: "나중에 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">플랫폼 설정</h1>
            <p className="text-muted-foreground mt-2">플랫폼 전반의 설정 및 환경설정 구성</p>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "저장 중..." : "변경사항 저장"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">일반</TabsTrigger>
            <TabsTrigger value="payments">결제</TabsTrigger>
            <TabsTrigger value="email">이메일</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
            <TabsTrigger value="appearance">외관</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  일반 설정
                </CardTitle>
                <CardDescription>
                  기본 플랫폼 구성 및 브랜딩
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="siteName">사이트 이름</Label>
                    <Input
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting("general", "siteName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteUrl">사이트 URL</Label>
                    <Input
                      id="siteUrl"
                      value={settings.general.siteUrl}
                      onChange={(e) => updateSetting("general", "siteUrl", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="siteDescription">사이트 설명</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting("general", "siteDescription", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactEmail">연락 이메일</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => updateSetting("general", "contactEmail", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">고객지원 이메일</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.general.supportEmail}
                      onChange={(e) => updateSetting("general", "supportEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="timezone">시간대</Label>
                    <Select value={settings.general.timezone} onValueChange={(value) => updateSetting("general", "timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Asia/Seoul">한국 시간</SelectItem>
                        <SelectItem value="America/New_York">동부 시간</SelectItem>
                        <SelectItem value="America/Chicago">중부 시간</SelectItem>
                        <SelectItem value="America/Denver">산악 시간</SelectItem>
                        <SelectItem value="America/Los_Angeles">태평양 시간</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">기본 언어</Label>
                    <Select value={settings.general.language} onValueChange={(value) => updateSetting("general", "language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ko">한국어</SelectItem>
                        <SelectItem value="en">영어</SelectItem>
                        <SelectItem value="es">스페인어</SelectItem>
                        <SelectItem value="fr">프랑스어</SelectItem>
                        <SelectItem value="de">독일어</SelectItem>
                        <SelectItem value="ja">일본어</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium mb-4">브랜딩</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="logo">로고 URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="logo"
                          value={settings.general.logo}
                          onChange={(e) => updateSetting("general", "logo", e.target.value)}
                        />
                        <Button variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="favicon">파비콘 URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="favicon"
                          value={settings.general.favicon}
                          onChange={(e) => updateSetting("general", "favicon", e.target.value)}
                        />
                        <Button variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  결제 설정
                </CardTitle>
                <CardDescription>
                  결제 게이트웨이 및 수수료 설정 구성
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">스트라이프 설정</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="stripePublishableKey">공개 키</Label>
                      <Input
                        id="stripePublishableKey"
                        value={settings.payments.stripePublishableKey}
                        onChange={(e) => updateSetting("payments", "stripePublishableKey", e.target.value)}
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="stripeSecretKey">비밀 키</Label>
                      <Input
                        id="stripeSecretKey"
                        type="password"
                        value={settings.payments.stripeSecretKey}
                        onChange={(e) => updateSetting("payments", "stripeSecretKey", e.target.value)}
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium mb-4">페이팔 설정</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="paypalClientId">클라이언트 ID</Label>
                      <Input
                        id="paypalClientId"
                        value={settings.payments.paypalClientId}
                        onChange={(e) => updateSetting("payments", "paypalClientId", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="paypalClientSecret">클라이언트 시크릿</Label>
                      <Input
                        id="paypalClientSecret"
                        type="password"
                        value={settings.payments.paypalClientSecret}
                        onChange={(e) => updateSetting("payments", "paypalClientSecret", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium mb-4">수수료 및 지급</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="commissionRate">수수료율 (%)</Label>
                      <Input
                        id="commissionRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={settings.payments.commissionRate}
                        onChange={(e) => updateSetting("payments", "commissionRate", Number.parseFloat(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="minimumPayout">최소 지급액 (₩)</Label>
                      <Input
                        id="minimumPayout"
                        type="number"
                        min="0"
                        value={settings.payments.minimumPayout}
                        onChange={(e) => updateSetting("payments", "minimumPayout", Number.parseFloat(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="payoutSchedule">지급 일정</Label>
                      <Select value={settings.payments.payoutSchedule} onValueChange={(value) => updateSetting("payments", "payoutSchedule", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">매일</SelectItem>
                          <SelectItem value="weekly">매주</SelectItem>
                          <SelectItem value="monthly">매월</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="taxCalculation"
                    checked={settings.payments.taxCalculation}
                    onCheckedChange={(checked) => updateSetting("payments", "taxCalculation", checked)}
                  />
                  <Label htmlFor="taxCalculation">자동 세금 계산 활성화</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  이메일 설정
                </CardTitle>
                <CardDescription>
                  SMTP 설정 및 이메일 기본 설정 구성
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">SMTP 설정</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="smtpHost">SMTP 호스트</Label>
                      <Input
                        id="smtpHost"
                        value={settings.email.smtpHost}
                        onChange={(e) => updateSetting("email", "smtpHost", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">SMTP 포트</Label>
                      <Input
                        id="smtpPort"
                        value={settings.email.smtpPort}
                        onChange={(e) => updateSetting("email", "smtpPort", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpUsername">SMTP 사용자명</Label>
                      <Input
                        id="smtpUsername"
                        value={settings.email.smtpUsername}
                        onChange={(e) => updateSetting("email", "smtpUsername", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">SMTP 비밀번호</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.email.smtpPassword}
                        onChange={(e) => updateSetting("email", "smtpPassword", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium mb-4">이메일 기본값</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fromEmail">발신 이메일</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) => updateSetting("email", "fromEmail", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromName">발신자 이름</Label>
                      <Input
                        id="fromName"
                        value={settings.email.fromName}
                        onChange={(e) => updateSetting("email", "fromName", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium mb-4">이메일 기본 설정</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="emailVerificationRequired"
                        checked={settings.email.emailVerificationRequired}
                        onCheckedChange={(checked) => updateSetting("email", "emailVerificationRequired", checked)}
                      />
                      <Label htmlFor="emailVerificationRequired">새 계정에 이메일 인증 요구</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="welcomeEmailEnabled"
                        checked={settings.email.welcomeEmailEnabled}
                        onCheckedChange={(checked) => updateSetting("email", "welcomeEmailEnabled", checked)}
                      />
                      <Label htmlFor="welcomeEmailEnabled">신규 사용자에게 환영 이메일 발송</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  보안 설정
                </CardTitle>
                <CardDescription>
                  보안 정책 및 접근 제어 구성
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">인증</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="passwordMinLength">최소 비밀번호 길이</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        min="6"
                        max="50"
                        value={settings.security.passwordMinLength}
                        onChange={(e) => updateSetting("security", "passwordMinLength", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sessionTimeout">세션 타임아웃 (시간)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        min="1"
                        max="168"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting("security", "sessionTimeout", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxLoginAttempts">최대 로그인 시도 횟수</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        min="3"
                        max="10"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => updateSetting("security", "maxLoginAttempts", Number.parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="twoFactorRequired"
                    checked={settings.security.twoFactorRequired}
                    onCheckedChange={(checked) => updateSetting("security", "twoFactorRequired", checked)}
                  />
                  <Label htmlFor="twoFactorRequired">모든 사용자에게 이중 인증 요구</Label>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium mb-4">네트워크 보안</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ipWhitelist">IP 화이트리스트 (쉼표로 구분)</Label>
                      <Textarea
                        id="ipWhitelist"
                        value={settings.security.ipWhitelist}
                        onChange={(e) => updateSetting("security", "ipWhitelist", e.target.value)}
                        placeholder="192.168.1.1, 10.0.0.1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="corsOrigins">CORS 출처</Label>
                      <Input
                        id="corsOrigins"
                        value={settings.security.corsOrigins}
                        onChange={(e) => updateSetting("security", "corsOrigins", e.target.value)}
                        placeholder="https://example.com, https://app.example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="sslRequired"
                    checked={settings.security.sslRequired}
                    onCheckedChange={(checked) => updateSetting("security", "sslRequired", checked)}
                  />
                  <Label htmlFor="sslRequired">모든 연결에 SSL/HTTPS 요구</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  알림 설정
                </CardTitle>
                <CardDescription>
                  시스템 알림 및 경고 구성
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">관리자 알림</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="newUserNotifications"
                        checked={settings.notifications.newUserNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "newUserNotifications", checked)}
                      />
                      <Label htmlFor="newUserNotifications">새 사용자 등록</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="newOrderNotifications"
                        checked={settings.notifications.newOrderNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "newOrderNotifications", checked)}
                      />
                      <Label htmlFor="newOrderNotifications">새 주문</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="payoutNotifications"
                        checked={settings.notifications.payoutNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "payoutNotifications", checked)}
                      />
                      <Label htmlFor="payoutNotifications">지급 요청</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="systemMaintenanceNotifications"
                        checked={settings.notifications.systemMaintenanceNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "systemMaintenanceNotifications", checked)}
                      />
                      <Label htmlFor="systemMaintenanceNotifications">시스템 유지보수 알림</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium mb-4">알림 채널</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="emailNotifications"
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "emailNotifications", checked)}
                      />
                      <Label htmlFor="emailNotifications">이메일 알림</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="pushNotifications"
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "pushNotifications", checked)}
                      />
                      <Label htmlFor="pushNotifications">푸시 알림</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    외관 설정
                </CardTitle>
                <CardDescription>
                    플랫폼의 외관 및 느낌 사용자 정의
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                    <Label htmlFor="primaryColor">기본 색상</Label>
                    <Input
                        id="primaryColor"
                        type="color"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => updateSetting("appearance", "primaryColor", e.target.value)}
                    />
                    </div>
                    <div>
                    <Label htmlFor="secondaryColor">보조 색상</Label>
                    <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => updateSetting("appearance", "secondaryColor", e.target.value)}
                    />
                    </div>
                    <div>
                    <Label htmlFor="accentColor">강조 색상</Label>
                    <Input
                        id="accentColor"
                        type="color"
                        value={settings.appearance.accentColor}
                        onChange={(e) => updateSetting("appearance", "accentColor", e.target.value)}
                    />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                    id="darkMode"
                    checked={settings.appearance.darkMode}
                    onCheckedChange={(checked) => updateSetting("appearance", "darkMode", checked)}
                    />
                    <Label htmlFor="darkMode">다크 모드 활성화</Label>
                </div>
                <div>
                    <Label htmlFor="customCSS">사용자 정의 CSS</Label>
                    <Textarea
                    id="customCSS"
                    value={settings.appearance.customCSS}
                    onChange={(e) => updateSetting("appearance", "customCSS", e.target.value)}
                    rows={3}
                    />
                </div>
                <div>
                    <Label htmlFor="headerScript">헤더 스크립트</Label>
                    <Textarea
                    id="headerScript"
                    value={settings.appearance.headerScript}
                    onChange={(e) => updateSetting("appearance", "headerScript", e.target.value)}
                    rows={2}
                    />
                </div>
                <div>
                    <Label htmlFor="footerScript">푸터 스크립트</Label>
                    <Textarea
                    id="footerScript"
                    value={settings.appearance.footerScript}
                    onChange={(e) => updateSetting("appearance", "footerScript", e.target.value)}
                    rows={2}
                    />
                </div>
                </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
