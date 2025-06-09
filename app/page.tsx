
import { type Metadata } from 'next'
import Component from "@/components/component"


export const metadata: Metadata = {
  title: '자유템',
  description: '자유템에서 디지털 제품을 만나보세요.',
}


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Component />
    </main>
  )
}
