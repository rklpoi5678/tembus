import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw, Clock, Shield, AlertTriangle, Zap, User } from "lucide-react"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"

export default function RefundPolicyPage() {
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
          /<span className="text-foreground"> 환불정책</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <RefreshCw className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">환불 정책</h1>
              <p className="text-xl text-orange-100">공정하고 투명한 환불 정책</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Important Notice */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              디지털 상품의 특성상 다운로드 후에는 환불이 제한될 수 있습니다. 구매 전 상품 정보를 꼼꼼히 확인해주세요.
            </AlertDescription>
          </Alert>

          {/* General Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                기본 환불 정책
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p>
                  디지털마켓은 고객의 권익 보호를 위해 공정하고 투명한 환불 정책을 운영하고 있습니다. 디지털 상품의
                  특성을 고려하여 다음과 같은 환불 정책을 적용합니다.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>구매 후 7일 이내 환불 신청 가능</li>
                  <li>상품 다운로드 전까지 무조건 환불 가능</li>
                  <li>상품 하자 또는 설명과 다른 경우 환불 보장</li>
                  <li>단순 변심으로 인한 환불은 제한적으로 허용</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Refund Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>환불 가능 조건</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">✅ 환불 가능한 경우</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 상품 다운로드 전 취소 요청</li>
                    <li>• 상품이 설명과 현저히 다른 경우</li>
                    <li>• 상품에 치명적인 오류가 있는 경우</li>
                    <li>• 시스템 요구사항 미충족으로 실행 불가</li>
                    <li>• 중복 구매한 경우</li>
                    <li>• 결제 오류로 인한 잘못된 구매</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600">❌ 환불 불가능한 경우</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 단순 변심 (다운로드 후)</li>
                    <li>• 사용자 실수로 인한 데이터 손실</li>
                    <li>• 상품을 이미 사용하여 혜택을 받은 경우</li>
                    <li>• 구매일로부터 7일 초과</li>
                    <li>• 라이선스 키를 타인에게 공유한 경우</li>
                    <li>• 악의적인 환불 요청</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                환불 절차 및 처리 기간
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      1
                    </div>
                    <h4 className="font-semibold mb-1">환불 신청</h4>
                    <p className="text-xs text-muted-foreground">마이페이지에서 환불 신청</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      2
                    </div>
                    <h4 className="font-semibold mb-1">검토</h4>
                    <p className="text-xs text-muted-foreground">1-2영업일 내 검토</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      3
                    </div>
                    <h4 className="font-semibold mb-1">승인</h4>
                    <p className="text-xs text-muted-foreground">환불 승인 알림</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      4
                    </div>
                    <h4 className="font-semibold mb-1">환불 완료</h4>
                    <p className="text-xs text-muted-foreground">3-5영업일 내 환불</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">환불 처리 기간</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">신용카드/체크카드</h5>
                      <p className="text-sm text-muted-foreground">승인 후 3-5영업일 (카드사 정책에 따라 상이)</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">계좌이체/무통장입금</h5>
                      <p className="text-sm text-muted-foreground">승인 후 1-2영업일</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">간편결제 (카카오페이 등)</h5>
                      <p className="text-sm text-muted-foreground">승인 후 1-3영업일</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">포인트/쿠폰</h5>
                      <p className="text-sm text-muted-foreground">승인 즉시 복원</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Cases */}
          <Card>
            <CardHeader>
              <CardTitle>특별 환불 정책</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">게임 아이템</h4>
                  <p className="text-sm text-blue-700">
                    게임 계정이나 아이템의 경우, 계정 정보 전달 후에는 환불이 불가능합니다. 단, 계정 정보가 잘못되었거나
                    설명과 다른 경우 7일 이내 환불 가능합니다.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">소프트웨어</h4>
                  <p className="text-sm text-green-700">
                    라이선스 키 발급 후에는 환불이 제한됩니다. 단, 소프트웨어가 정상 작동하지 않거나 시스템 요구사항을
                    충족하지 못하는 경우 환불 가능합니다.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">디지털 음원</h4>
                  <p className="text-sm text-purple-700">
                    다운로드 완료 후에는 환불이 불가능합니다. 음질 문제나 파일 손상이 있는 경우에만 교환 또는 환불이
                    가능합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>환불 문의</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  환불과 관련하여 궁금한 점이 있으시면 언제든지 고객센터로 문의해주세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/support/contact">1:1 문의하기</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="tel:1588-1234">전화 문의: 1588-1234</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="mailto:refund@digitalmarket.co.kr">이메일: refund@digitalmarket.co.kr</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
