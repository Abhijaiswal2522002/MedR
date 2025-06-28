import { type NextRequest, NextResponse } from "next/server"

// Mark as dynamic to prevent static generation issues
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    const analytics = {
      totalUsers: 1250,
      totalPharmacies: 85,
      totalMedicines: 5000,
      totalOrders: 156,
      revenueToday: 45000,
      popularMedicines: [
        { name: "Paracetamol", searches: 1250 },
        { name: "Aspirin", searches: 890 },
        { name: "Ibuprofen", searches: 675 },
        { name: "Amoxicillin", searches: 543 },
        { name: "Omeprazole", searches: 432 },
      ],
    }

    const users = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        isVerified: true,
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        isVerified: true,
        createdAt: "2024-01-14",
      },
    ]

    const pharmacies = [
      {
        id: "1",
        name: "Apollo Pharmacy",
        email: "apollo@example.com",
        address: "123 Main Street, Delhi",
        licenseNumber: "DL-PHARM-001",
        isVerified: true,
        createdAt: "2024-01-10",
      },
      {
        id: "2",
        name: "MedPlus Pharmacy",
        email: "medplus@example.com",
        address: "456 Park Avenue, Delhi",
        licenseNumber: "DL-PHARM-002",
        isVerified: false,
        createdAt: "2024-01-12",
      },
    ]

    return NextResponse.json({
      users,
      pharmacies,
      analytics,
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
