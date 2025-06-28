import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Order } from "@/models/Order"

interface Props {
  params: Promise<{ orderId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { orderId } = await params

    await connectDB()

    const order = await Order.findById(orderId)

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 })
    }

    const orderDetails = {
      id: order._id,
      trackingId: order.trackingId,
      items: order.items,
      total: order.total,
      estimatedDelivery: order.estimatedDelivery?.toLocaleString() || "Not available",
      deliveryAddress: order.deliveryAddress,
      status: order.status,
    }

    return NextResponse.json({ order: orderDetails })
  } catch (error) {
    console.error("Order fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
