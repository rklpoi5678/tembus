"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Edit,
  Eye,
  Users,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Info,
  ArrowRight,
  Plus,
} from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

const gettingStartedSteps = [
  {
    title: "Welcome aboard",
    description: "Make a Gumroad account.",
    icon: CheckCircle,
    completed: true,
    color: "bg-green-500",
  },
  {
    title: "Make an impression",
    description: "Customize your profile.",
    icon: Edit,
    completed: false,
    color: "bg-blue-500",
  },
  {
    title: "Showtime",
    description: "Create your first product.",
    icon: Eye,
    completed: false,
    color: "bg-purple-500",
  },
  {
    title: "Build your tribe",
    description: "Get your first follower.",
    icon: Users,
    completed: false,
    color: "bg-orange-500",
  },
  {
    title: "Cha-ching",
    description: "Make your first sale.",
    icon: DollarSign,
    completed: false,
    color: "bg-yellow-500",
  },
  {
    title: "Money inbound",
    description: "Get your first pay out.",
    icon: TrendingUp,
    completed: false,
    color: "bg-green-500",
  },
  {
    title: "Making waves",
    description: "Send out your first email blast.",
    icon: Zap,
    completed: false,
    color: "bg-pink-500",
  },
  {
    title: "Smart move",
    description: "Sign up for Smart Beta.",
    icon: Target,
    completed: false,
    color: "bg-indigo-500",
  },
]

export default function SellerDashboard() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setAnalytics({
          balance: 0,
          last7Days: 0,
          last28Days: 0,
          totalEarnings: 0,
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      setLoading(false)
    }
  }

  const activityCards = [
    {
      title: "Balance",
      value: `$${analytics?.balance || 0}`,
      icon: Info,
      description: "Available for payout",
    },
    {
      title: "Last 7 days",
      value: `$${analytics?.last7Days || 0}`,
      icon: Info,
      description: "Recent earnings",
    },
    {
      title: "Last 28 days",
      value: `$${analytics?.last28Days || 0}`,
      icon: Info,
      description: "Monthly earnings",
    },
    {
      title: "Total earnings",
      value: `$${analytics?.totalEarnings || 0}`,
      icon: Info,
      description: "All-time earnings",
    },
  ]

  return (
    <SellerLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Getting Started Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Getting started</h2>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Show less
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gettingStartedSteps.map((step, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${step.color} flex-shrink-0`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm">{step.title}</h3>
                        {step.completed && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                      </div>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-teal-500 to-blue-500 border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src="/images/seller-hero-illustration.png"
                alt="Seller Hero Illustration"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">We're here to help you get paid for your work.</h2>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Create your first product
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="mt-4">
                    <Link href="/seller/help" className="text-sm text-gray-200 underline hover:text-white">
                      Learn more about creating products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Activity</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityCards.map((card, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-400 text-sm">{card.title}</h3>
                    <Info className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                  <p className="text-xs text-gray-500">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              Followers and sales will show up here as they come in. For now,{" "}
              <Link href="/seller/products/new" className="text-pink-400 underline hover:text-pink-300">
                create a product
              </Link>{" "}
              or{" "}
              <Link href="/seller/profile" className="text-pink-400 underline hover:text-pink-300">
                customize your profile
              </Link>
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500 rounded-lg">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Create Product</h3>
                  <p className="text-gray-400 text-sm">Start selling your work</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Edit className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Customize Profile</h3>
                  <p className="text-gray-400 text-sm">Make a great first impression</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Setup Payouts</h3>
                  <p className="text-gray-400 text-sm">Configure payment methods</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SellerLayout>
  )
}
