"use client"

import { useState } from "react"
import { Handshake, Rocket, Target, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PartnershipPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const benefits = [
    {
      icon: Rocket,
      title: "성장 기회",
      description: "전문적인 지원과 함께 비즈니스를 확장하세요",
      features: [
        "맞춤형 마케팅 전략",
        "데이터 분석 지원",
        "성장 컨설팅"
      ]
    },
    {
      icon: Target,
      title: "수익 창출",
      description: "높은 수익률과 안정적인 수익 모델",
      features: [
        "경쟁력 있는 수수료",
        "정기적인 수익 정산",
        "수익 최적화 지원"
      ]
    },
    {
      icon: Users,
      title: "네트워크",
      description: "전문가 네트워크와의 협업 기회",
      features: [
        "파트너 커뮤니티",
        "전문가 멘토링",
        "비즈니스 매칭"
      ]
    }
  ]

  const partnershipTypes = [
    {
      type: "기술 파트너",
      description: "기술 솔루션을 제공하는 파트너",
      requirements: [
        "기술 전문성",
        "안정적인 서비스 제공",
        "보안 인증"
      ]
    },
    {
      type: "비즈니스 파트너",
      description: "비즈니스 확장을 위한 전략적 파트너",
      requirements: [
        "시장 경험",
        "네트워크",
        "비즈니스 모델"
      ]
    },
    {
      type: "리셀러 파트너",
      description: "제품/서비스 판매 파트너",
      requirements: [
        "영업 채널",
        "고객 기반",
        "마케팅 역량"
      ]
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4">파트너십 프로그램</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            디지털마켓과 함께 성장하는 파트너가 되어보세요.
            우리는 파트너의 성공을 위해 최선을 다합니다.
          </p>
        </div>
      </div>

      {/* 혜택 섹션 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">파트너십 혜택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <benefit.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{benefit.title}</CardTitle>
                  <CardDescription className="text-center">{benefit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* 파트너십 유형 섹션 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">파트너십 유형</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnershipTypes.map((type, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{type.type}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">요구사항:</h3>
                  <ul className="space-y-2">
                    {type.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* 신청 섹션 */}
      <div className="max-w-2xl mx-auto">
        <Card className="animate-fade-in-up-delay">
          <CardHeader>
            <CardTitle className="text-center">파트너십 신청</CardTitle>
            <CardDescription className="text-center">
              파트너십 신청을 위해 아래 양식을 작성해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">회사명</label>
                  <Input required />
                </div>
                <div>
                  <label className="text-sm font-medium">대표자명</label>
                  <Input required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">이메일</label>
                  <Input type="email" required />
                </div>
                <div>
                  <label className="text-sm font-medium">연락처</label>
                  <Input type="tel" required />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">파트너십 유형</label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="파트너십 유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {partnershipTypes.map((type, index) => (
                      <SelectItem key={index} value={type.type}>
                        {type.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">비즈니스 설명</label>
                <Textarea
                  placeholder="회사와 비즈니스에 대해 설명해주세요"
                  required
                  className="h-32"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    처리 중...
                  </>
                ) : (
                  "신청하기"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* 성공 다이얼로그 */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>신청 완료</DialogTitle>
            <DialogDescription>
              파트너십 신청이 완료되었습니다. 검토 후 3일 이내에 연락드리겠습니다.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
