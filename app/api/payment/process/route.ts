import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Order } from "@/models/Order"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const { orderItems, paymentMethod, paymentDetails, total } = await request.json()

    await connectDB()

    // In a real application, you would integrate with payment gateways like:
    // - Stripe
    // - Razorpay
    // - PayU
    // - Paytm

    // Mock payment processing
    const paymentSuccess = Math.random() > 0.1 // 90% success rate for demo

    if (!paymentSuccess) {
      return NextResponse.json(
        {
          message: "Payment failed. Please try again.",
        },
        { status: 400 },
      )
    }

    // Create order in database
    const order = new Order({
      userId: decoded.userId,
      items: orderItems.map((item: any) => ({
        medicine: item.medicine,
        pharmacy: item.pharmacy,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      paymentMethod,
      paymentStatus: "completed",
      deliveryAddress: {
        address: paymentDetails.address,
        city: paymentDetails.city,
        pincode: paymentDetails.pincode,
        phone: paymentDetails.phone,
      },
      status: "confirmed",
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    })

    await order.save()

    // In a real app, you would also:
    // 1. Send confirmation email/SMS
    // 2. Notify pharmacies
    // 3. Update inventory
    // 4. Assign delivery partner

    return NextResponse.json({
      message: "Payment successful",
      orderId: order._id,
      estimatedDelivery: order.estimatedDelivery,
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
