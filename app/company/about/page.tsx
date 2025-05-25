import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Target, Award, Zap, User } from "lucide-react"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"

export default function AboutPage() {
  const stats = [
    { label: "설립년도", value: "2020", icon: Building2 },
    { label: "직원 수", value: "150+", icon: Users },
    { label: "누적 거래", value: "1M+", icon: Target },
    { label: "고객 만족도", value: "98%", icon: Award },
  ]

  const team = [
    {
      name: "김대표",
      position: "대표이사",
      description: "15년간 IT 업계에서 쌓은 경험을 바탕으로 디지털마켓을 이끌고 있습니다.",
    },
    {
      name: "이기술",
      position: "기술이사",
      description: "안전하고 신뢰할 수 있는 플랫폼 구축을 위해 최선을 다하고 있습니다.",
    },
    {
      name: "박마케팅",
      position: "마케팅이사",
      description: "고객과의 소통을 통해 더 나은 서비스를 만들어가고 있습니다.",
    },
  ]

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
          <Link href="/company" className="hover:text-primary">
            {" "}
            회사정보
          </Link>{" "}
          /<span className="text-foreground"> 회사소개</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">디지털마켓</h1>
            <p className="text-xl mb-8 text-blue-100">안전하고 신뢰할 수 있는 디지털 상품 거래 플랫폼을 만들어갑니다</p>
            <p className="text-lg text-blue-100">
              2020년 설립 이후, 우리는 디지털 상품 거래의 새로운 기준을 제시하며 고객들에게 최고의 서비스를 제공하기
              위해 끊임없이 노력하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">우리의 미션</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  디지털 상품 거래에서 발생할 수 있는 모든 불안 요소를 제거하고, 누구나 안심하고 이용할 수 있는 플랫폼을
                  제공합니다.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>100% 정품 보장</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>투명한 거래 과정</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>신속한 고객 지원</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">우리의 비전</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  아시아 최대의 디지털 상품 거래 플랫폼으로 성장하여, 전 세계 고객들에게 최고의 서비스를 제공하는 것이
                  우리의 목표입니다.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>글로벌 시장 진출</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>혁신적인 기술 도입</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>지속 가능한 성장</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">회사 연혁</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-primary">2024</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">글로벌 진출 및 AI 도입</h3>
                  <p className="text-muted-foreground">동남아시아 시장 진출, AI 기반 상품 추천 시스템 도입</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-primary">2023</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">모바일 앱 출시</h3>
                  <p className="text-muted-foreground">iOS/Android 앱 출시, 누적 거래액 100억원 돌파</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-primary">2022</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">서비스 확장</h3>
                  <p className="text-muted-foreground">소프트웨어 및 디지털 음원 카테고리 추가, 회원 수 10만명 돌파</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-primary">2021</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">정식 서비스 오픈</h3>
                  <p className="text-muted-foreground">게임 아이템 거래 서비스 정식 오픈, 첫 해 거래액 10억원 달성</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-primary">2020</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">회사 설립</h3>
                  <p className="text-muted-foreground">디지털마켓 설립, 베타 서비스 시작</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">경영진</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.position}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{member.description}</p>
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
            <h2 className="text-3xl font-bold mb-4">함께 성장할 인재를 찾습니다</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              디지털마켓과 함께 미래를 만들어갈 열정적인 인재를 기다립니다. 다양한 포지션에서 여러분의 능력을
              발휘해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/company/careers">채용정보 보기</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/support/contact">문의하기</Link>
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
