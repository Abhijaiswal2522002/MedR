import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { medicine, urgency, location, phone, notes } = await request.json()

    if (!medicine || !location || !phone) {
      return NextResponse.json({ message: "Required fields missing" }, { status: 400 })
    }

    await connectDB()

    // In a real application, you would:
    // 1. Save the emergency request to database
    // 2. Notify nearby pharmacies
    // 3. Send SMS/email to user
    // 4. Assign delivery partner

    // Mock response for demonstration
    const emergencyRequest = {
      id: `EMR${Date.now()}`,
      medicine,
      urgency,
      location,
      phone,
      notes,
      status: "submitted",
      estimatedTime: urgency === "high" ? "15-30 minutes" : "30-60 minutes",
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Emergency request submitted successfully",
      request: emergencyRequest,
    })
  } catch (error) {
    console.error("Emergency delivery error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
