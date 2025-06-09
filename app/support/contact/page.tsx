"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Mail, Clock, MapPin, Send, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitStatus("success")
    setIsSubmitting(false)
    setFormData({ name: "", email: "", category: "", subject: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            홈
          </Link>{" "}
          /
          <Link href="/support" className="hover:text-primary">
            {" "}
            고객지원
          </Link>{" "}
          /<span className="text-foreground"> 고객센터</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Mail className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">고객센터</h1>
              <p className="text-xl text-green-100">언제든지 문의해주세요</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>연락처 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">전화 문의</p>
                    <p className="text-sm text-muted-foreground">1588-1234</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">이메일</p>
                    <p className="text-sm text-muted-foreground">support@digitalmarket.co.kr</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">운영시간</p>
                    <p className="text-sm text-muted-foreground">평일 09:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground">(주말, 공휴일 휴무)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">주소</p>
                    <p className="text-sm text-muted-foreground">서울시 강남구 테헤란로 123</p>
                    <p className="text-sm text-muted-foreground">디지털마켓 빌딩 10층</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>빠른 도움말</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/support/faq" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                  <p className="font-medium">자주 묻는 질문</p>
                  <p className="text-sm text-muted-foreground">일반적인 질문들의 답변</p>
                </Link>
                <Link href="/support/refund-policy" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                  <p className="font-medium">환불 정책</p>
                  <p className="text-sm text-muted-foreground">환불 및 교환 안내</p>
                </Link>
                <Link href="/support/terms" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                  <p className="font-medium">이용약관</p>
                  <p className="text-sm text-muted-foreground">서비스 이용 규정</p>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>1:1 문의하기</CardTitle>
                <p className="text-muted-foreground">
                  궁금한 점이나 문제가 있으시면 언제든지 문의해주세요. 빠른 시간 내에 답변드리겠습니다.
                </p>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" && (
                  <Alert className="mb-6">
                    <AlertDescription>
                      문의가 성공적으로 접수되었습니다. 빠른 시간 내에 답변드리겠습니다.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="홍길동"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">문의 유형 *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="문의 유형을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">계정 관련</SelectItem>
                        <SelectItem value="payment">결제 관련</SelectItem>
                        <SelectItem value="product">상품 관련</SelectItem>
                        <SelectItem value="technical">기술 지원</SelectItem>
                        <SelectItem value="refund">환불 문의</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">제목 *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="문의 제목을 입력해주세요"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">문의 내용 *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="문의하실 내용을 자세히 작성해주세요"
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        문의 전송
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 디지털마켓. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
