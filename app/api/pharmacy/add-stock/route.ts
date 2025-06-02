import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Medicine } from "@/models/Medicine"
import { Pharmacy } from "@/models/Pharmacy"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    const { name, activeCompound, description, dosage, manufacturer, category, quantity, price, expiryDate } =
      await request.json()

    await connectDB()

    // Find or create medicine
    let medicine = await Medicine.findOne({ name, activeCompound })
    if (!medicine) {
      medicine = new Medicine({
        name,
        activeCompound,
        description,
        dosage,
        manufacturer,
        category,
      })
      await medicine.save()
    }

    // Add to pharmacy inventory
    const pharmacy = await Pharmacy.findById(decoded.userId)
    if (!pharmacy) {
      return NextResponse.json({ message: "Pharmacy not found" }, { status: 404 })
    }

    // Check if medicine already exists in inventory
    const existingItem = pharmacy.inventory.find((item) => item.medicine.toString() === medicine._id.toString())

    if (existingItem) {
      existingItem.quantity += Number.parseInt(quantity)
      existingItem.price = Number.parseFloat(price)
      existingItem.expiryDate = new Date(expiryDate)
      existingItem.lastUpdated = new Date()
    } else {
      pharmacy.inventory.push({
        medicine: medicine._id,
        quantity: Number.parseInt(quantity),
        price: Number.parseFloat(price),
        expiryDate: new Date(expiryDate),
      })
    }

    await pharmacy.save()

    return NextResponse.json({
      message: "Medicine added to inventory successfully",
      medicine: {
        id: medicine._id,
        name: medicine.name,
        quantity: Number.parseInt(quantity),
        price: Number.parseFloat(price),
      },
    })
  } catch (error) {
    console.error("Add stock error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
