"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Clock, Phone, MapPin } from "lucide-react"
import Link from "next/link"

interface OrderDetails {
  id: string
  trackingId: string
  items: Array<{
    medicine: string
    pharmacy: string
    quantity: number
    price: number
  }>
  total: number
  estimatedDelivery: string
  deliveryAddress: {
    address: string
    city: string
    pincode: string
    phone: string
  }
  status: string
}

export function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      const data = await response.json()
      setOrder(data.order)
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">The order you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We're preparing your medicines for delivery.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Details
            </CardTitle>
            <CardDescription>Order ID: {order.trackingId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{item.medicine}</p>
                  <p className="text-sm text-gray-500">{item.pharmacy}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">Estimated delivery: {order.estimatedDelivery}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                <div className="text-sm">
                  <p>{order.deliveryAddress.address}</p>
                  <p>
                    {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">{order.deliveryAddress.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">{order.status}</Badge>
              <span className="text-sm text-gray-600">Your order is being processed</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href={`/track/${order.trackingId}`}>
              <Package className="mr-2 h-4 w-4" />
              Track Order
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link href="/dashboard">View All Orders</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700 mb-3">
            If you have any questions about your order, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 bg-transparent">
              <Phone className="mr-1 h-3 w-3" />
              Call Support
            </Button>
            <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 bg-transparent">
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
