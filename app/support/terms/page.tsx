import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollText, Zap, User } from "lucide-react"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">디지털마켓</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <CartIcon />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

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
          /<span className="text-foreground"> 이용약관</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-600 to-gray-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <ScrollText className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">이용약관</h1>
              <p className="text-xl text-slate-100">서비스 이용을 위한 약관</p>
            </div>
          </div>
          <p className="text-slate-100">최종 업데이트: 2024년 1월 1일</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Terms Sections */}
          <Card>
            <CardHeader>
              <CardTitle>제1조 (목적)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                이 약관은 디지털마켓(이하 "회사")이 제공하는 디지털 상품 거래 서비스(이하 "서비스")의 이용과 관련하여
                회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제2조 (정의)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>"서비스"란 회사가 제공하는 디지털 상품 거래 플랫폼을 의미합니다.</li>
                <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>
                  "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 회사가
                  제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                </li>
                <li>
                  "디지털 상품"이란 게임 아이템, 소프트웨어, 디지털 음원, 모바일 앱 등 디지털 형태로 제공되는 상품을
                  말합니다.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제3조 (약관의 효력 및 변경)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>이 약관은 ��비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.</li>
                <li>
                  회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지
                  또는 통지함으로써 효력을 발생합니다.
                </li>
                <li>이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 회원탈퇴를 할 수 있습니다.</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제4조 (회원가입)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써
                  회원가입을 신청합니다.
                </li>
                <li>
                  회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로
                  등록합니다:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                    <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제5조 (서비스의 제공 및 변경)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  회사는 다음과 같은 업무를 수행합니다:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>디지털 상품 정보 제공 및 구매계약 체결</li>
                    <li>구매계약이 체결된 디지털 상품의 배송</li>
                    <li>기타 회사가 정하는 업무</li>
                  </ul>
                </li>
                <li>
                  회사는 디지털 상품의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할
                  디지털 상품의 내용을 변경할 수 있습니다.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제6조 (서비스의 중단)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는
                  서비스의 제공을 일시적으로 중단할 수 있습니다.
                </li>
                <li>
                  회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에
                  대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제7조 (회원탈퇴 및 자격 상실)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.</li>
                <li>
                  회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                    <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                    <li>서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제8조 (개인정보보호)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
                </li>
                <li>회사는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다.</li>
                <li>
                  회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제9조 (회사의 의무)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라
                  지속적이고, 안정적으로 디지털 상품을 제공하는데 최선을 다하여야 합니다.
                </li>
                <li>
                  회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보보호를 위한 보안 시스템을
                  갖추어야 합니다.
                </li>
                <li>
                  회사는 디지털 상품에 대하여 「표시·광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시·광고행위를
                  함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제10조 (회원의 의무)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  이용자는 다음 행위를 하여서는 안 됩니다:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>신청 또는 변경시 허위 내용의 등록</li>
                    <li>타인의 정보 도용</li>
                    <li>회사에 게시된 정보의 변경</li>
                    <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                    <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                    <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                    <li>
                      외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는
                      행위
                    </li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>문의사항</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">이용약관에 대한 문의사항이 있으시면 고객센터로 연락해주세요.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/support/contact">문의하기</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/company/privacy">개인정보처리방침 보기</Link>
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
