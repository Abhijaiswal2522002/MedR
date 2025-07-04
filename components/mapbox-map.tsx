"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Navigation, Star, Clock, Search } from "lucide-react"
import { clientApi } from "@/lib/client-api"
import type { Pharmacy } from "@/lib/mock-data"

export function MapboxMap() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true)
        const { pharmacies } = await clientApi.getNearbyPharmacies("1")
        setPharmacies(pharmacies)
        if (pharmacies.length > 0) {
          setSelectedPharmacy(pharmacies[0])
        }
      } catch (error) {
        console.error("Failed to fetch pharmacies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPharmacies()
  }, [])

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleDirections = (pharmacy: Pharmacy) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`
    window.open(url, "_blank")
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
      {/* Map Area */}
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Pharmacy Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            {/* Mock Map Display */}
            <div className="absolute inset-4 bg-white rounded-lg shadow-inner overflow-hidden">
              <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100">
                {/* Mock map markers */}
                {filteredPharmacies.map((pharmacy, index) => (
                  <div
                    key={pharmacy.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      selectedPharmacy?.id === pharmacy.id
                        ? "bg-red-500 text-white scale-125 z-10"
                        : "bg-blue-500 text-white hover:scale-110"
                    }`}
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>
                ))}

                {/* Mock roads */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Pharmacy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pharmacy List */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Pharmacies</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search pharmacies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Loading pharmacies...</p>
            </div>
          ) : filteredPharmacies.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No pharmacies found</p>
            </div>
          ) : (
            filteredPharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedPharmacy?.id === pharmacy.id
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-300 hover:shadow-sm"
                }`}
                onClick={() => setSelectedPharmacy(pharmacy)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {pharmacy.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
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
                    <span className="text-sm text-gray-600">{pharmacy.distance} km away</span>
                    <span className="text-sm text-gray-600">{pharmacy.medicines.length} medicines</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCall(pharmacy.phone)
                      }}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDirections(pharmacy)
                      }}
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </div>

                {pharmacy.medicines.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm font-medium mb-2">Available medicines:</p>
                    <div className="flex flex-wrap gap-1">
                      {pharmacy.medicines.slice(0, 3).map((medicine, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {medicine.name} - ₹{medicine.price}
                        </Badge>
                      ))}
                      {pharmacy.medicines.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{pharmacy.medicines.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
