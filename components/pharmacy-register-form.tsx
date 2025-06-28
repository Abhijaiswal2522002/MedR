"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export function PharmacyRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    licenseNumber: "",
    description: "",
    agreeToTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    // Trim all string fields
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      licenseNumber: formData.licenseNumber.trim(),
      description: formData.description.trim(),
    }

    // Check for empty required fields
    if (
      !trimmedData.name ||
      !trimmedData.email ||
      !trimmedData.password ||
      !trimmedData.phone ||
      !trimmedData.address ||
      !trimmedData.city ||
      !trimmedData.licenseNumber
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/pharmacy/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...trimmedData,
          role: "pharmacy",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        login(data.user)
        toast({
          title: "Success",
          description: "Pharmacy registered successfully! Please wait for admin verification.",
        })
        router.push("/pharmacy/dashboard")
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
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Pharmacy Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter pharmacy name"
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
            placeholder="pharmacy@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            required
          />
        </div>
        <div>
          <Label htmlFor="licenseNumber">License Number *</Label>
          <Input
            id="licenseNumber"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            placeholder="Pharmacy license number"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Complete Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter complete pharmacy address"
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="City name"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description about your pharmacy services"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <a href="/terms" className="text-green-600 hover:underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-green-600 hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your pharmacy registration will be reviewed by our team</li>
          <li>• We'll verify your license and business details</li>
          <li>• Approval typically takes 24-48 hours</li>
          <li>• You'll receive an email notification once approved</li>
          <li>• After approval, you can start managing inventory and orders</li>
        </ul>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Registering Pharmacy..." : "Register Pharmacy"}
      </Button>
    </form>
  )
}
