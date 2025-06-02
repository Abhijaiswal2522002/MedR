import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()
    const user = await User.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Mock data for demonstration
    const recentSearches = [
      {
        id: "1",
        medicine: "Paracetamol",
        location: "Delhi",
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        medicine: "Aspirin",
        location: "Mumbai",
        timestamp: "1 day ago",
      },
    ]

    const deliveryRequests = [
      {
        id: "1",
        medicine: "Paracetamol 500mg",
        pharmacy: "Apollo Pharmacy",
        status: "in-transit" as const,
        estimatedTime: "30 minutes",
      },
    ]

    return NextResponse.json({
      recentSearches,
      deliveryRequests,
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
