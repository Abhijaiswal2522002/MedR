import { type NextRequest, NextResponse } from "next/server"

// Mark as dynamic to prevent static generation issues
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Mock orders data
    const orders = [
      {
        id: "ORD-001",
        date: "2024-01-15",
        items: ["Paracetamol 500mg", "Vitamin D"],
        total: 145,
        status: "delivered",
      },
      {
        id: "ORD-002",
        date: "2024-01-14",
        items: ["Aspirin 75mg"],
        total: 30,
        status: "in-transit",
      },
    ]

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
