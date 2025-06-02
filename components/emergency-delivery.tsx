"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EmergencyDelivery() {
  const [formData, setFormData] = useState({
    medicine: "",
    urgency: "high",
    location: "",
    phone: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/delivery/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Emergency Request Submitted",
          description: "We're finding the nearest pharmacy for urgent delivery",
        })
        setFormData({
          medicine: "",
          urgency: "high",
          location: "",
          phone: "",
          notes: "",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to submit emergency request",
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Medicine Delivery</h1>
          <p className="text-gray-600">Get urgent medicine delivery when every minute counts</p>
        </div>

        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Emergency Request Form
            </CardTitle>
            <CardDescription className="text-red-600">
              Fill out this form for urgent medicine delivery. Our team will contact you within 5 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="medicine">Medicine Name *</Label>
                <Input
                  id="medicine"
                  value={formData.medicine}
                  onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                  placeholder="Enter medicine name or active compound"
                  required
                />
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <div className="flex gap-2 mt-2">
                  {["high", "medium", "low"].map((level) => (
                    <Badge
                      key={level}
                      variant={formData.urgency === level ? "default" : "outline"}
                      className={`cursor-pointer ${
                        level === "high"
                          ? "bg-red-600 hover:bg-red-700"
                          : level === "medium"
                            ? "bg-orange-600 hover:bg-orange-700"
                            : "bg-yellow-600 hover:bg-yellow-700"
                      }`}
                      onClick={() => setFormData({ ...formData, urgency: level })}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)} Priority
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="location">Delivery Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter your complete address"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Contact Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific requirements or medical conditions..."
                  rows={3}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Important Notice:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Emergency delivery available 24/7</li>
                      <li>Additional charges may apply for urgent delivery</li>
                      <li>Prescription required for prescription medicines</li>
                      <li>Our team will verify medicine availability before delivery</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg" disabled={loading}>
                {loading ? "Submitting Request..." : "Submit Emergency Request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            For immediate assistance, call our emergency hotline:{" "}
            <a href="tel:+911234567890" className="font-semibold text-red-600">
              +91 123-456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
