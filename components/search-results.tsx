"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Star, Loader2 } from "lucide-react"
import { clientApi } from "@/lib/client-api"
import type { Pharmacy } from "@/lib/mock-data"

interface SearchResultsProps {
  query: string
  location: string
}

export function SearchResults({ query, location }: SearchResultsProps) {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchMedicines = async () => {
      if (!query.trim()) {
        setPharmacies([])
        return
      }

      try {
        setLoading(true)
        const { pharmacies } = await clientApi.searchMedicines(query, location)
        setPharmacies(pharmacies)
      } catch (error) {
        console.error("Search failed:", error)
        setPharmacies([])
      } finally {
        setLoading(false)
      }
    }

    searchMedicines()
  }, [query, location])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Searching pharmacies...</span>
      </div>
    )
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Enter a medicine name to search</p>
      </div>
    )
  }

  if (pharmacies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No pharmacies found for "{query}"</p>
        <p className="text-sm text-gray-400 mt-2">Try searching for a different medicine</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <p className="text-gray-600">{pharmacies.length} pharmacies found</p>
      </div>

      <div className="grid gap-6">
        {pharmacies.map((pharmacy) => (
          <Card key={pharmacy.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{pharmacy.name}</CardTitle>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{pharmacy.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{pharmacy.rating}</span>
                  </div>
                  <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                    <Clock className="h-3 w-3 mr-1" />
                    {pharmacy.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{pharmacy.phone}</span>
                    </div>
                    <span className="text-sm text-gray-600">{pharmacy.distance} km away</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" disabled={!pharmacy.isOpen}>
                      Order Now
                    </Button>
                  </div>
                </div>

                {pharmacy.medicines.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Available Medicines</h4>
                    <div className="grid gap-3">
                      {pharmacy.medicines.map((medicine, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{medicine.name}</p>
                            <p className="text-sm text-gray-600">
                              {medicine.inStock ? `${medicine.quantity} in stock` : "Out of stock"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{medicine.price}</p>
                            <Badge variant={medicine.inStock ? "default" : "secondary"}>
                              {medicine.inStock ? "Available" : "Out of Stock"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
