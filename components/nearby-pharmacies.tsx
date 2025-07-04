"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Star, Loader2 } from "lucide-react"
import { clientApi } from "@/lib/client-api"
import type { Pharmacy } from "@/lib/mock-data"

interface NearbyPharmaciesProps {
  medicineId: string
}

export function NearbyPharmacies({ medicineId }: NearbyPharmaciesProps) {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true)
        const { pharmacies } = await clientApi.getNearbyPharmacies(medicineId)
        setPharmacies(pharmacies)
      } catch (error) {
        console.error("Failed to fetch pharmacies:", error)
      } finally {
        setLoading(false)
      }
    }

    if (medicineId) {
      fetchPharmacies()
    }
  }, [medicineId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nearby Pharmacies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Pharmacies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {pharmacy.address}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{pharmacy.rating}</span>
                  </div>
                  <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                    <Clock className="h-3 w-3 mr-1" />
                    {pharmacy.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {pharmacy.phone}
                  </div>
                  <span className="text-sm text-gray-600">{pharmacy.distance} km away</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm">Order Now</Button>
                </div>
              </div>

              {pharmacy.medicines.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Available medicines:</p>
                  <div className="flex flex-wrap gap-2">
                    {pharmacy.medicines.map((medicine, index) => (
                      <Badge key={index} variant="outline">
                        {medicine.name} - ₹{medicine.price}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {pharmacies.length === 0 && <p className="text-center text-gray-500 py-8">No nearby pharmacies found.</p>}
        </div>
      </CardContent>
    </Card>
  )
}
