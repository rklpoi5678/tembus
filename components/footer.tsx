"use client"

import { Zap } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-background border-t py-12">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ml-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <Zap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-bold text-xl">자유템</span>
                        </div>
                        <p className="text-muted-foreground mb-4">안전하고 신뢰할 수 있는 디지털 제품 거래 플랫폼</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">카테고리</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link href="/categories/games" className="hover:text-primary">
                                    게임 아이템
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/software" className="hover:text-primary">
                                    소프트웨어
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/music" className="hover:text-primary">
                                    디지털 음원
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/mobile-apps" className="hover:text-primary">
                                    모바일 앱
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">고객지원</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link href="/support/faq" className="hover:text-primary">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/support/contact" className="hover:text-primary">
                                    고객센터
                                </Link>
                            </li>
                            <li>
                                <Link href="/support/refund-policy" className="hover:text-primary">
                                    환불정책
                                </Link>
                            </li>
                            <li>
                                <Link href="/support/terms" className="hover:text-primary">
                                    이용약관
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">회사정보</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link href="/company/about" className="hover:text-primary">
                                    회사소개
                                </Link>
                            </li>
                            <li>
                                <Link href="/company/partnership" className="hover:text-primary">
                                    파트너십
                                </Link>
                            </li>
                            <li>
                                <Link href="/company/privacy-policy" className="hover:text-primary">
                                    개인정보처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-muted-foreground ml-16">
                    <p>&copy; 2025 자유템. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}