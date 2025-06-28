"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Truck } from "lucide-react"
import Link from "next/link"
import { searchMedicines } from "@/lib/client-api"

interface Pharmacy {
  id: string
  name: string
  address: string
  distance: number
  phone: string
  isOpen: boolean
  medicines: {
    name: string
    price: number
    inStock: boolean
    quantity: number
  }[]
}

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")
  const location = searchParams.get("location")
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return

      setLoading(true)
      try {
        const data = await searchMedicines(query, location || undefined)
        setPharmacies(data.pharmacies || [])
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, location])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Enter a medicine name to search</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
        <p className="text-gray-500">{pharmacies.length} pharmacies found</p>
      </div>

      {pharmacies.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No pharmacies found with this medicine in stock.</p>
            <Button asChild>
              <Link href={`/medicine/${query.toLowerCase().replace(/\s+/g, "-")}`}>
                View Medicine Details & Alternatives
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pharmacy.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{pharmacy.distance.toFixed(1)} km away</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {pharmacy.medicines.map((medicine, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{medicine.name}</p>
                      <p className="text-sm text-gray-500">
                        {medicine.inStock ? `${medicine.quantity} in stock` : "Out of stock"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{medicine.price}</p>
                      <Badge variant={medicine.inStock ? "default" : "destructive"} className="text-xs">
                        {medicine.inStock ? "Available" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={() => window.open(`tel:${pharmacy.phone}`, "_self")}>
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>

                  <Button className="bg-green-600 hover:bg-green-700">
                    <Truck className="h-4 w-4 mr-1" />
                    Request Delivery
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
