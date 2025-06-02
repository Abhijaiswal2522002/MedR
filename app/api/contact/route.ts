import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, category, message } = await request.json()

    if (!name || !email || !subject || !category || !message) {
      return NextResponse.json({ message: "Required fields are missing" }, { status: 400 })
    }

    await connectDB()

    // In a real application, you would:
    // 1. Save the contact form submission to database
    // 2. Send email notification to support team
    // 3. Send auto-reply email to user
    // 4. Create a support ticket

    // Mock successful submission
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      subject,
      category,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      message: "Contact form submitted successfully",
      ticketId: `TICKET-${Date.now()}`,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
