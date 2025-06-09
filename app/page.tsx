
import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Star,
  Download,
  Filter,
  Grid3X3,
  List,
  Heart,
  Share2,
  Eye,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Product } from "@/lib/types"
import { useUser } from "@clerk/nextjs"
import { type Metadata } from 'next'
import Component from "@/components/component"
import { ProductCard } from "@/components/product-card"
import { ProductListItem } from "@/components/product-list-item"

// API 호출 함수들
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

async function fetchTrendingProducts(): Promise<Product[]> {
  const response = await fetch('/api/products/trending')
  if (!response.ok) {
    throw new Error('Failed to fetch trending products')
  }
  return response.json()
}

async function fetchTags(): Promise<string[]> {
  const response = await fetch ('/api/products/tags')
  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }
  return response.json()
}



const categories = ["All", "Design", "Code", "Education", "Photography", "Music", "3D", "Writing"]
const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

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
