"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from "lucide-react"

interface OrderDetails {
  id: string
  trackingId: string
  status: string
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
  deliveryPartner?: {
    name: string
    phone: string
    vehicleNumber: string
  }
  timeline: Array<{
    status: string
    timestamp: string
    description: string
  }>
}

interface Props {
  trackingId: string
}

export function OrderTracking({ trackingId }: Props) {
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrderDetails()
  }, [trackingId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/track/${trackingId}`)
      const data = await response.json()
      setOrder(data.order)
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "preparing":
        return <Package className="h-5 w-5 text-blue-600" />
      case "out-for-delivery":
        return <Truck className="h-5 w-5 text-orange-600" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "out-for-delivery":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600">The tracking ID you entered is invalid or the order doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600">Tracking ID: {order.trackingId}</p>
        </div>

        {/* Order Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                {getStatusIcon(order.status)}
                <span className="ml-2">Order Status</span>
              </CardTitle>
              <Badge className={getStatusColor(order.status)}>{order.status.replace("-", " ").toUpperCase()}</Badge>
            </div>
            <CardDescription>Estimated delivery: {order.estimatedDelivery}</CardDescription>
          </CardHeader>
        </Card>

        {/* Delivery Partner Info */}
        {order.deliveryPartner && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Delivery Partner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{order.deliveryPartner.name}</p>
                  <p className="text-sm text-gray-500">Vehicle: {order.deliveryPartner.vehicleNumber}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">{getStatusIcon(event.status)}</div>
                  <div className="flex-1">
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-gray-500">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.medicine}</p>
                    <p className="text-sm text-gray-500">{item.pharmacy}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p>{order.deliveryAddress.address}</p>
              <p>
                {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
              <p>Phone: {order.deliveryAddress.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
