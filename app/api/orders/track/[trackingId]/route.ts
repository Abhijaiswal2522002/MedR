import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Order } from "@/models/Order"

interface Props {
  params: Promise<{ trackingId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { trackingId } = await params

    await connectDB()

    const order = await Order.findOne({ trackingId })

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 })
    }

    // Mock timeline data - in real app, this would be stored in database
    const timeline = [
      {
        status: "confirmed",
        timestamp: "2024-01-15 10:30 AM",
        description: "Order confirmed and payment received",
      },
      {
        status: "preparing",
        timestamp: "2024-01-15 10:45 AM",
        description: "Pharmacy is preparing your order",
      },
      {
        status: "out-for-delivery",
        timestamp: "2024-01-15 11:15 AM",
        description: "Order picked up by delivery partner",
      },
    ]

    // Mock delivery partner data
    const deliveryPartner =
      order.status === "out-for-delivery" || order.status === "delivered"
        ? {
            name: "Rajesh Kumar",
            phone: "+91 98765 43210",
            vehicleNumber: "DL 01 AB 1234",
          }
        : undefined

    const orderDetails = {
      id: order._id,
      trackingId: order.trackingId,
      status: order.status,
      items: order.items,
      total: order.total,
      estimatedDelivery: order.estimatedDelivery?.toLocaleString() || "Not available",
      deliveryAddress: order.deliveryAddress,
      deliveryPartner,
      timeline,
    }

    return NextResponse.json({ order: orderDetails })
  } catch (error) {
    console.error("Track order error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
