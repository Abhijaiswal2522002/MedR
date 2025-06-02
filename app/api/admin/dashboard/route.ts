import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Pharmacy } from "@/models/Pharmacy"
import { Medicine } from "@/models/Medicine"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    await connectDB()

    // Fetch users
    const users = await User.find({}).select("-password").sort({ createdAt: -1 })

    // Fetch pharmacies
    const pharmacies = await Pharmacy.find({}).select("-password").sort({ createdAt: -1 })

    // Fetch medicines count
    const medicinesCount = await Medicine.countDocuments()

    // Calculate analytics
    const analytics = {
      totalUsers: users.length,
      totalPharmacies: pharmacies.length,
      totalMedicines: medicinesCount,
      totalOrders: 156, // Mock data
      revenueToday: 45000, // Mock data
      popularMedicines: [
        { name: "Paracetamol", searches: 1250 },
        { name: "Aspirin", searches: 890 },
        { name: "Ibuprofen", searches: 675 },
        { name: "Amoxicillin", searches: 543 },
        { name: "Omeprazole", searches: 432 },
      ],
    }

    // Format user data
    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: new Date(user.createdAt).toLocaleDateString(),
    }))

    // Format pharmacy data
    const formattedPharmacies = pharmacies.map((pharmacy) => ({
      id: pharmacy._id,
      name: pharmacy.name,
      email: pharmacy.email,
      address: pharmacy.address,
      licenseNumber: pharmacy.licenseNumber,
      isVerified: pharmacy.isVerified,
      createdAt: new Date(pharmacy.createdAt).toLocaleDateString(),
    }))

    return NextResponse.json({
      users: formattedUsers,
      pharmacies: formattedPharmacies,
      analytics,
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
