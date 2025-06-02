import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Pharmacy } from "@/models/Pharmacy"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const medicineId = searchParams.get("medicineId")

    if (!medicineId) {
      return NextResponse.json({ message: "Medicine ID is required" }, { status: 400 })
    }

    await connectDB()

    // Find pharmacies that have this medicine in stock
    const pharmacies = await Pharmacy.find({
      "inventory.medicine": medicineId,
      "inventory.quantity": { $gt: 0 },
    }).populate("inventory.medicine")

    const nearbyPharmacies = pharmacies
      .map((pharmacy) => {
        const medicineItem = pharmacy.inventory.find((item) => item.medicine._id.toString() === medicineId)

        return {
          id: pharmacy._id,
          name: pharmacy.name,
          address: pharmacy.address,
          distance: Math.random() * 10 + 0.5, // Mock distance
          phone: pharmacy.phone,
          isOpen: true, // Mock opening status
          hasStock: medicineItem ? medicineItem.quantity > 0 : false,
          price: medicineItem ? medicineItem.price : 0,
        }
      })
      .filter((p) => p.hasStock)

    // Sort by distance
    nearbyPharmacies.sort((a, b) => a.distance - b.distance)

    return NextResponse.json({
      pharmacies: nearbyPharmacies.slice(0, 10), // Limit to 10 results
    })
  } catch (error) {
    console.error("Nearby pharmacies error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
