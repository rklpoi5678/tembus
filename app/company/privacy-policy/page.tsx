"use client"

import { Shield, Cookie, User, Database, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Shield,
      title: "개인정보 수집 및 이용",
      content: [
        "디지털마켓은 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 이용합니다:",
        "• 필수항목: 이메일, 비밀번호, 이름",
        "• 선택항목: 전화번호, 주소",
        "",
        "수집된 정보는 회원 관리, 서비스 제공, 고객 지원 등에 사용됩니다."
      ].join("\n")
    },
    {
      icon: Cookie,
      title: "쿠키 정책",
      content: [
        "우리는 다음과 같은 목적으로 쿠키를 사용합니다:",
        "• 로그인 상태 유지",
        "• 사용자 선호도 저장",
        "• 서비스 이용 통계",
        "",
        "쿠키 설정은 브라우저에서 변경할 수 있습니다."
      ].join("\n")
    },
    {
      icon: User,
      title: "사용자 권리",
      content: [
        "사용자는 다음과 같은 권리를 가집니다:",
        "• 개인정보 열람 요청",
        "• 개인정보 수정 요청",
        "• 개인정보 삭제 요청",
        "• 개인정보 처리 중단 요청",
        "",
        "모든 요청은 고객센터를 통해 처리됩니다."
      ].join("\n")
    },
    {
      icon: Database,
      title: "데이터 보안",
      content: [
        "우리는 다음과 같은 보안 조치를 취하고 있습니다:",
        "• 암호화 저장",
        "• 접근 권한 관리",
        "• 정기적인 보안 점검",
        "• 백업 시스템 운영"
      ].join("\n")
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">개인정보 처리방침</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            디지털마켓은 사용자의 개인정보 보호를 최우선으로 생각합니다.
            본 정책은 우리가 수집하는 정보와 그 사용 방법에 대해 설명합니다.
          </p>
        </div>

        {/* 마지막 업데이트 */}
        <div className="text-center mb-12 animate-fade-in-delay">
          <p className="text-sm text-gray-500">
            마지막 업데이트: 2024년 1월 15일
          </p>
        </div>

        {/* 정책 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <section.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-gray-600 leading-relaxed">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* 문의 섹션 */}
        <div className="mt-20 text-center max-w-2xl mx-auto animate-fade-in-up-delay">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">문의하기</h2>
          <p className="text-gray-600 mb-8">
            개인정보 처리방침에 대한 문의사항이 있으시면 아래 연락처로 문의해 주세요.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-gray-700">privacy@digitalmarket.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-gray-700">02-1234-5678</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
