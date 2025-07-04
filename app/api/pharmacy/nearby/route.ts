import { type NextRequest, NextResponse } from "next/server"

// Mark as dynamic to prevent static generation issues
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const medicineId = searchParams.get("medicineId")

    if (!medicineId) {
      return NextResponse.json({ message: "Medicine ID is required" }, { status: 400 })
    }

    // Mock nearby pharmacies data
    const mockPharmacies = [
      {
        id: "1",
        name: "Apollo Pharmacy",
        address: "123 Main Street, Delhi",
        distance: 0.8,
        phone: "+91-9876543210",
        isOpen: true,
        hasStock: true,
        price: 25,
      },
      {
        id: "2",
        name: "MedPlus Pharmacy",
        address: "456 Park Avenue, Delhi",
        distance: 1.2,
        phone: "+91-9876543211",
        isOpen: true,
        hasStock: true,
        price: 30,
      },
    ]

    return NextResponse.json({
      pharmacies: mockPharmacies,
    })
  } catch (error) {
    console.error("Nearby pharmacies error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
