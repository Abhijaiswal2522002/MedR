"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
  })
  const [pharmacyData, setPharmacyData] = useState({
    address: "",
    city: "",
    licenseNumber: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    // Validate pharmacy data if role is pharmacy
    if (formData.role === "pharmacy") {
      const trimmedPharmacyData = {
        address: pharmacyData.address.trim(),
        city: pharmacyData.city.trim(),
        licenseNumber: pharmacyData.licenseNumber.trim(),
      }

      if (!trimmedPharmacyData.address || !trimmedPharmacyData.city || !trimmedPharmacyData.licenseNumber) {
        toast({
          title: "Error",
          description: "Please fill in all pharmacy details.",
          variant: "destructive",
        })
        return
      }
    }

    setLoading(true)

    try {
      const requestBody = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        role: formData.role,
        ...(formData.role === "pharmacy" && {
          address: pharmacyData.address.trim(),
          city: pharmacyData.city.trim(),
          licenseNumber: pharmacyData.licenseNumber.trim(),
        }),
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (response.ok) {
        login(data.user)
        toast({
          title: "Success",
          description: "Account created successfully",
        })
        router.push(formData.role === "pharmacy" ? "/pharmacy/dashboard" : "/dashboard")
      } else {
        toast({
          title: "Error",
          description: data.message || "Registration failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div>
        <Label htmlFor="role">Account Type *</Label>
        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Customer</SelectItem>
            <SelectItem value="pharmacy">Pharmacy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.role === "pharmacy" && (
        <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800">Pharmacy Information</h3>

          <div>
            <Label htmlFor="address">Pharmacy Address *</Label>
            <Input
              id="address"
              value={pharmacyData.address}
              onChange={(e) => setPharmacyData({ ...pharmacyData, address: e.target.value })}
              placeholder="Complete pharmacy address"
              required
            />
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={pharmacyData.city}
              onChange={(e) => setPharmacyData({ ...pharmacyData, city: e.target.value })}
              placeholder="City name"
              required
            />
          </div>

          <div>
            <Label htmlFor="licenseNumber">Pharmacy License Number *</Label>
            <Input
              id="licenseNumber"
              value={pharmacyData.licenseNumber}
              onChange={(e) => setPharmacyData({ ...pharmacyData, licenseNumber: e.target.value })}
              placeholder="Valid pharmacy license number"
              required
            />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a strong password"
          required
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  )
}
