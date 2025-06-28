import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { Pharmacy } from "@/models/Pharmacy"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone, address, city, licenseNumber, description } = body

    // Validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !licenseNumber?.trim()
    ) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    await connectDB()

    // Check if pharmacy already exists
    const existingPharmacy = await Pharmacy.findOne({
      $or: [{ email: email.trim().toLowerCase() }, { licenseNumber: licenseNumber.trim() }],
    })

    if (existingPharmacy) {
      if (existingPharmacy.email === email.trim().toLowerCase()) {
        return NextResponse.json({ message: "A pharmacy with this email already exists" }, { status: 400 })
      }
      if (existingPharmacy.licenseNumber === licenseNumber.trim()) {
        return NextResponse.json({ message: "A pharmacy with this license number already exists" }, { status: 400 })
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create pharmacy
    const pharmacy = new Pharmacy({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      licenseNumber: licenseNumber.trim(),
      description: description?.trim() || "",
      isVerified: false,
      inventory: [],
      deliveryAvailable: false,
      deliveryRadius: 5,
    })

    await pharmacy.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: pharmacy._id, email: pharmacy.email, role: "pharmacy" },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({
      message: "Pharmacy registered successfully. Please wait for admin verification.",
      user: {
        id: pharmacy._id,
        email: pharmacy.email,
        name: pharmacy.name,
        role: "pharmacy",
        isVerified: pharmacy.isVerified,
      },
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Pharmacy registration error:", error)

    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json({ message: `A pharmacy with this ${field} already exists` }, { status: 400 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
