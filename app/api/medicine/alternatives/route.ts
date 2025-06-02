import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Medicine } from "@/models/Medicine"
import { Pharmacy } from "@/models/Pharmacy"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const compound = searchParams.get("compound")

    if (!compound) {
      return NextResponse.json({ message: "Compound parameter is required" }, { status: 400 })
    }

    await connectDB()

    // Find medicines with the same active compound
    const alternatives = await Medicine.find({
      activeCompound: { $regex: compound, $options: "i" },
    }).limit(10)

    // For each alternative, check availability in pharmacies
    const alternativesWithAvailability = await Promise.all(
      alternatives.map(async (medicine) => {
        const pharmaciesWithStock = await Pharmacy.countDocuments({
          "inventory.medicine": medicine._id,
          "inventory.quantity": { $gt: 0 },
        })

        // Get average price
        const pharmaciesWithPrices = await Pharmacy.find(
          {
            "inventory.medicine": medicine._id,
            "inventory.quantity": { $gt: 0 },
          },
          {
            "inventory.$": 1,
          },
        )

        const prices = pharmaciesWithPrices.map((p) => p.inventory[0]?.price || 0).filter((p) => p > 0)
        const averagePrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0

        return {
          id: medicine._id,
          name: medicine.name,
          manufacturer: medicine.manufacturer || "Generic",
          price: averagePrice,
          availability: pharmaciesWithStock,
        }
      }),
    )

    return NextResponse.json({
      alternatives: alternativesWithAvailability.filter((alt) => alt.availability > 0),
    })
  } catch (error) {
    console.error("Alternatives error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
