import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Pharmacy } from "@/models/Pharmacy"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone, role, address, city, licenseNumber } = body

    // Basic validation
    if (!name?.trim() || !email?.trim() || !password || !phone?.trim()) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    // Pharmacy-specific validation
    if (role === "pharmacy" && (!address?.trim() || !city?.trim() || !licenseNumber?.trim())) {
      return NextResponse.json(
        { message: "Address, city, and license number are required for pharmacy registration" },
        { status: 400 },
      )
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists" }, { status: 400 })
    }

    // Check if pharmacy with same license exists (for pharmacy registration)
    if (role === "pharmacy") {
      const existingPharmacy = await Pharmacy.findOne({ licenseNumber: licenseNumber.trim() })
      if (existingPharmacy) {
        return NextResponse.json({ message: "A pharmacy with this license number already exists" }, { status: 400 })
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    let user

    if (role === "pharmacy") {
      // Create pharmacy account
      user = new Pharmacy({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        licenseNumber: licenseNumber.trim(),
        isVerified: false, // Pharmacies need admin verification
      })
    } else {
      // Create regular user account
      user = new User({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        phone: phone.trim(),
        role: "user",
        isVerified: true, // Regular users are auto-verified
      })
    }

    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: role === "pharmacy" ? "pharmacy" : "user" },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({
      message:
        role === "pharmacy"
          ? "Pharmacy account created successfully. Please wait for admin verification."
          : "Account created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: role === "pharmacy" ? "pharmacy" : "user",
        isVerified: user.isVerified,
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
    console.error("Registration error:", error)

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json({ message: `An account with this ${field} already exists` }, { status: 400 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
