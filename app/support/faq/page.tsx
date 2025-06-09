import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Zap, User, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartIcon } from "@/components/cart-icon"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "계정 및 회원가입",
      items: [
        {
          question: "회원가입은 어떻게 하나요?",
          answer:
            "홈페이지 우상단의 '회원가입' 버튼을 클릭하여 이메일, 비밀번호, 이름을 입력하시면 됩니다. 이메일 인증 후 바로 이용 가능합니다.",
        },
        {
          question: "비밀번호를 잊어버렸어요.",
          answer:
            "로그인 페이지에서 '비밀번호 찾기'를 클릭하고 가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.",
        },
        {
          question: "회원 탈퇴는 어떻게 하나요?",
          answer:
            "마이페이지 > 계정 설정에서 회원 탈퇴를 신청하실 수 있습니다. 탈퇴 시 모든 개인정보가 삭제되며 복구가 불가능합니다.",
        },
      ],
    },
    {
      title: "주문 및 결제",
      items: [
        {
          question: "어떤 결제 방법을 지원하나요?",
          answer: "신용카드, 체크카드, 계좌이체, 무통장입금, 카카오페이, 네이버페이 등 다양한 결제 수단을 지원합니다.",
        },
        {
          question: "주문 취소는 언제까지 가능한가요?",
          answer:
            "디지털 상품의 특성상 다운로드 전까지만 주문 취소가 가능합니다. 다운로드 후에는 환불 정책에 따라 처리됩니다.",
        },
        {
          question: "결제 오류가 발생했어요.",
          answer: "결제 오류 시 고객센터(1588-1234)로 연락주시거나 온라인 문의를 통해 도움을 받으실 수 있습니다.",
        },
      ],
    },
    {
      title: "상품 및 다운로드",
      items: [
        {
          question: "구매한 상품은 어디서 다운로드하나요?",
          answer: "마이페이지 > 구매내역에서 다운로드 링크를 확인하실 수 있습니다. 구매 후 즉시 다운로드 가능합니다.",
        },
        {
          question: "다운로드 횟수에 제한이 있나요?",
          answer: "구매일로부터 1년간 최대 5회까지 다운로드 가능합니다. 기간이나 횟수 초과 시 고객센터로 문의해주세요.",
        },
        {
          question: "상품이 정상적으로 작동하지 않아요.",
          answer:
            "상품 페이지의 시스템 요구사항을 확인해주시고, 문제가 지속되면 구매일로부터 7일 이내 환불 신청이 가능합니다.",
        },
      ],
    },
    {
      title: "환불 및 교환",
      items: [
        {
          question: "환불 정책이 어떻게 되나요?",
          answer:
            "디지털 상품 특성상 다운로드 후 7일 이내, 정상 작동하지 않는 경우에만 환불 가능합니다. 단순 변심으로는 환불이 어렵습니다.",
        },
        {
          question: "환불 처리 기간은 얼마나 걸리나요?",
          answer:
            "환불 신청 승인 후 3-5영업일 내에 결제 수단으로 환불됩니다. 신용카드의 경우 카드사 정책에 따라 다를 수 있습니다.",
        },
        {
          question: "부분 환불이 가능한가요?",
          answer: "번들 상품의 경우 일부 상품만 환불은 불가능하며, 전체 상품에 대해서만 환불 처리됩니다.",
        },
      ],
    },
  ]

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
          /<span className="text-foreground"> FAQ</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <HelpCircle className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">자주 묻는 질문</h1>
              <p className="text-xl text-blue-100">궁금한 점을 빠르게 해결하세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-muted/50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="궁금한 내용을 검색해보세요..." className="pl-12 h-12 text-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">원하는 답변을 찾지 못하셨나요?</h2>
            <p className="text-muted-foreground mb-8">고객센터를 통해 더 자세한 도움을 받으실 수 있습니다.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/support/contact">1:1 문의하기</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="tel:1588-1234">전화 문의: 1588-1234</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
