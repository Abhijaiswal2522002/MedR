import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { Order } from "@/models/Order"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()
    const orders = await Order.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(20)

    const formattedOrders = orders.map((order) => ({
      id: order.trackingId,
      date: order.createdAt.toLocaleDateString(),
      items: order.items.map((item: any) => item.medicine),
      total: order.total,
      status: order.status,
    }))

    return NextResponse.json({ orders: formattedOrders })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
