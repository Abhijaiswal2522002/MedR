import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { Pharmacy } from "@/models/Pharmacy"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const { pharmacyId, verify } = await request.json()

    await connectDB()

    const pharmacy = await Pharmacy.findById(pharmacyId)
    if (!pharmacy) {
      return NextResponse.json({ message: "Pharmacy not found" }, { status: 404 })
    }

    pharmacy.isVerified = verify
    await pharmacy.save()

    return NextResponse.json({
      message: `Pharmacy ${verify ? "verified" : "rejected"} successfully`,
    })
  } catch (error) {
    console.error("Verify pharmacy error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
