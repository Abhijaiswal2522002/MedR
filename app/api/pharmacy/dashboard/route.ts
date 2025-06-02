import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { Pharmacy } from "@/models/Pharmacy"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()
    const pharmacy = await Pharmacy.findById(decoded.userId).populate("inventory.medicine")

    if (!pharmacy) {
      return NextResponse.json({ message: "Pharmacy not found" }, { status: 404 })
    }

    // Calculate stats
    const totalMedicines = pharmacy.inventory.length
    const lowStockItems = pharmacy.inventory.filter((item) => item.quantity < 10).length

    // Mock data for demonstration
    const stats = {
      totalMedicines,
      lowStockItems,
      pendingOrders: 5,
      todayRevenue: 2500,
    }

    const inventory = pharmacy.inventory.map((item) => ({
      id: item._id,
      medicine: {
        name: item.medicine?.name || "Unknown Medicine",
        activeCompound: item.medicine?.activeCompound || "Unknown",
      },
      quantity: item.quantity,
      price: item.price,
      expiryDate: item.expiryDate?.toISOString().split("T")[0] || "",
      lowStock: item.quantity < 10,
    }))

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
