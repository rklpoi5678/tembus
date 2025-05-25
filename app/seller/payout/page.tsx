"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  CreditCard,
  BanknoteIcon as Bank,
  Calendar,
  TrendingUp,
  Settings,
  Plus,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"

export default function SellerPayouts() {
  const [payouts, setPayouts] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    fetchPayoutData()
  }, [])

  const fetchPayoutData = async () => {
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setBalance(2450.75)
        setPaymentMethods([
          {
            id: "1",
            type: "paypal",
            email: "seller@example.com",
            isDefault: true,
            status: "verified",
          },
          {
            id: "2",
            type: "bank",
            accountNumber: "****1234",
            bankName: "Chase Bank",
            isDefault: false,
            status: "pending",
          },
        ])
        setPayouts([
          {
            id: "1",
            amount: 1250.0,
            status: "completed",
            method: "PayPal",
            date: "2024-01-15",
            transactionId: "TXN123456",
          },
          {
            id: "2",
            amount: 890.5,
            status: "processing",
            method: "Bank Transfer",
            date: "2024-01-10",
            transactionId: "TXN123457",
          },
          {
            id: "3",
            amount: 675.25,
            status: "completed",
            method: "PayPal",
            date: "2024-01-05",
            transactionId: "TXN123458",
          },
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch payout data:", error)
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Payouts</h1>
            <p className="text-gray-400">Manage your earnings and payment methods</p>
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>

        {/* Balance and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Available Balance</p>
                  <p className="text-4xl font-bold text-white">${balance.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm mt-1">Ready for payout</p>
                </div>
                <div className="p-4 bg-green-500 rounded-full">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Button className="bg-pink-500 hover:bg-pink-600">Request Payout</Button>
                <Button variant="outline" className="border-gray-700 text-gray-300">
                  <Settings className="mr-2 h-4 w-4" />
                  Payout Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Payout Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-pink-400" />
                  <div>
                    <p className="text-white font-medium">Weekly</p>
                    <p className="text-gray-400 text-sm">Every Friday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Minimum: $50</p>
                    <p className="text-gray-400 text-sm">Auto payout threshold</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-300">
                  <Settings className="mr-2 h-4 w-4" />
                  Change Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Payment Methods</CardTitle>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Method
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {method.type === "paypal" ? (
                          <div className="p-2 bg-blue-500 rounded">
                            <CreditCard className="h-5 w-5 text-white" />
                          </div>
                        ) : (
                          <div className="p-2 bg-green-500 rounded">
                            <Bank className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">
                            {method.type === "paypal" ? "PayPal" : "Bank Account"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {method.type === "paypal" ? method.email : `${method.bankName} ${method.accountNumber}`}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && <Badge className="bg-pink-500 text-white">Default</Badge>}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={`${getStatusColor(method.status)} text-white`}>{method.status}</Badge>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Payout History</CardTitle>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <ExternalLink className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(payout.status)}
                    <div>
                      <p className="text-white font-medium">${payout.amount.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">
                        {payout.method} • {payout.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(payout.status)} text-white mb-1`}>{payout.status}</Badge>
                    <p className="text-gray-400 text-xs">{payout.transactionId}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payout Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Paid Out</p>
                  <p className="text-2xl font-bold text-white">$8,450</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-white">$2,140</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-white">$890</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SellerLayout>
  )
}
