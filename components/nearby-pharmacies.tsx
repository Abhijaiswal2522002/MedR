"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone } from "lucide-react"

interface NearbyPharmacy {
  id: string
  name: string
  address: string
  distance: number
  phone: string
  isOpen: boolean
  hasStock: boolean
  price: number
}

interface Props {
  medicineId: string
}

export function NearbyPharmacies({ medicineId }: Props) {
  const [pharmacies, setPharmacies] = useState<NearbyPharmacy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNearbyPharmacies = async () => {
      try {
        const response = await fetch(`/api/pharmacy/nearby?medicineId=${medicineId}`)
        const data = await response.json()
        setPharmacies(data.pharmacies || [])
      } catch (error) {
        console.error("Error fetching nearby pharmacies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNearbyPharmacies()
  }, [medicineId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nearby Pharmacies</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading nearby pharmacies...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Pharmacies</CardTitle>
        <p className="text-sm text-gray-600">Pharmacies with this medicine in stock</p>
      </CardHeader>
      <CardContent>
        {pharmacies.length === 0 ? (
          <p className="text-gray-500">No nearby pharmacies found with this medicine.</p>
        ) : (
          <div className="space-y-4">
            {pharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{pharmacy.name}</h4>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {pharmacy.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{pharmacy.distance.toFixed(1)} km away</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Badge variant={pharmacy.hasStock ? "default" : "destructive"}>
                      {pharmacy.hasStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    {pharmacy.hasStock && <span className="font-semibold">₹{pharmacy.price}</span>}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    {pharmacy.hasStock && <Button size="sm">Request Delivery</Button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
