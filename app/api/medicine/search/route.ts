import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Pharmacy } from "@/models/Pharmacy"
import { Medicine } from "@/models/Medicine"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const location = searchParams.get("location")

    if (!query) {
      return NextResponse.json({ message: "Query parameter is required" }, { status: 400 })
    }

    await connectDB()

    // Search for medicines matching the query
    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { activeCompound: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })

    if (medicines.length === 0) {
      return NextResponse.json({ pharmacies: [] })
    }

    const medicineIds = medicines.map((med) => med._id)

    // Find pharmacies that have these medicines in stock
    const pharmacyQuery: any = {
      "inventory.medicine": { $in: medicineIds },
      "inventory.quantity": { $gt: 0 },
    }

    // If location is provided, add location-based filtering
    if (location) {
      // Parse location (could be coordinates or address)
      // For now, we'll do a simple text search
      pharmacyQuery.$or = [
        { address: { $regex: location, $options: "i" } },
        { city: { $regex: location, $options: "i" } },
      ]
    }

    const pharmacies = await Pharmacy.find(pharmacyQuery).populate("inventory.medicine").limit(20)

    // Format the response
    const formattedPharmacies = pharmacies.map((pharmacy) => {
      const relevantInventory = pharmacy.inventory.filter((item) =>
        medicineIds.some((id) => id.toString() === item.medicine._id.toString()),
      )

      return {
        id: pharmacy._id,
        name: pharmacy.name,
        address: pharmacy.address,
        phone: pharmacy.phone,
        isOpen: isPharmacyOpen(pharmacy.openingHours),
        distance: calculateDistance(location, pharmacy.coordinates),
        medicines: relevantInventory.map((item) => ({
          name: item.medicine.name,
          price: item.price,
          inStock: item.quantity > 0,
          quantity: item.quantity,
        })),
      }
    })

    // Sort by distance if location is provided
    if (location) {
      formattedPharmacies.sort((a, b) => a.distance - b.distance)
    }

    return NextResponse.json({ pharmacies: formattedPharmacies })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

function isPharmacyOpen(openingHours: any): boolean {
  // Simple implementation - in real app, check against current time
  return true
}

function calculateDistance(location: string | null, coordinates: any): number {
  // Simple implementation - in real app, use proper geolocation calculation
  return Math.random() * 10 + 0.5 // Random distance between 0.5-10.5 km
}
