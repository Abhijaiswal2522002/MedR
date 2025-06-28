import { type NextRequest, NextResponse } from "next/server"

// Mark as dynamic to prevent static generation issues
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    const stats = {
      totalMedicines: 150,
      lowStockItems: 5,
      pendingOrders: 8,
      todayRevenue: 2500,
    }

    const inventory = [
      {
        id: "1",
        medicine: {
          name: "Paracetamol 500mg",
          activeCompound: "Paracetamol",
        },
        quantity: 50,
        price: 25,
        expiryDate: "2024-12-31",
        lowStock: false,
      },
      {
        id: "2",
        medicine: {
          name: "Aspirin 75mg",
          activeCompound: "Aspirin",
        },
        quantity: 8,
        price: 30,
        expiryDate: "2024-10-15",
        lowStock: true,
      },
    ]

    const orders = [
      {
        id: "1",
        customerName: "John Doe",
        medicine: "Paracetamol 500mg",
        quantity: 2,
        status: "pending" as const,
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        customerName: "Jane Smith",
        medicine: "Aspirin 75mg",
        quantity: 1,
        status: "confirmed" as const,
        timestamp: "4 hours ago",
      },
    ]

    return NextResponse.json({
      stats,
      inventory,
      orders,
    })
  } catch (error) {
    console.error("Pharmacy dashboard error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
