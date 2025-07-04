"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import MapboxMap from "@/components/mapbox-map"
import { MapPin, Navigation, Phone, AlertCircle, Search } from "lucide-react"
import { getNearbyPharmacies } from "@/lib/client-api"
import type { Pharmacy } from "@/lib/mock-data"

export function PharmacyMap() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 28.6139, // Default to Delhi
    lng: 77.209,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSearch, setActiveSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }

    // Fetch nearby pharmacies
    fetchNearbyPharmacies()
  }, [])

  const fetchNearbyPharmacies = async () => {
    setIsLoading(true)
    try {
      const data = await getNearbyPharmacies(userLocation.lat, userLocation.lng)
      setPharmacies(data)
    } catch (error) {
      console.error("Error fetching pharmacies:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(activeSearch.toLowerCase()),
  )

  const handleCallPharmacy = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleGetDirections = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    window.open(url, "_blank")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveSearch(searchQuery)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Title and Description */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Find Nearby Pharmacies</h1>
        <p className="text-gray-600">Locate pharmacies near you and get directions</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search pharmacies by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pharmacy List */}
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Nearby Pharmacies ({filteredPharmacies.length})
            </h2>
            <p className="text-sm text-gray-600">Click on a pharmacy to see details</p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading pharmacies...</p>
            </div>
          ) : (
            filteredPharmacies.map((pharmacy) => (
              <Card
                key={pharmacy.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedPharmacy?.id === pharmacy.id
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "hover:border-gray-300"
                }`}
                onClick={() => setSelectedPharmacy(pharmacy)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                    <Badge
                      variant={pharmacy.isOpen ? "default" : "secondary"}
                      className={pharmacy.isOpen ? "bg-green-100 text-green-800" : ""}
                    >
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Navigation className="h-4 w-4 mr-1" />
                    <span>{pharmacy.distance} km away</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCallPharmacy(pharmacy.phone)
                      }}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleGetDirections(pharmacy.coordinates[1], pharmacy.coordinates[0])
                      }}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Directions
                    </Button>
                  </div>

                  {pharmacy.medicines.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Available Medicines:</p>
                      <div className="space-y-1">
                        {pharmacy.medicines.slice(0, 2).map((medicine, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span>{medicine.name}</span>
                            <div className="flex items-center space-x-2">
                              <span>₹{medicine.price}</span>
                              <Badge variant={medicine.inStock ? "default" : "destructive"} className="text-xs">
                                {medicine.inStock ? "In Stock" : "Out"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        {pharmacy.medicines.length > 2 && (
                          <p className="text-xs text-gray-500">+{pharmacy.medicines.length - 2} more medicines</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}

          {!isLoading && filteredPharmacies.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No pharmacies found matching your search</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Pharmacy Locations
                {selectedPharmacy && (
                  <Badge variant="outline" className="ml-2">
                    {selectedPharmacy.name}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <MapboxMap searchQuery={activeSearch} className="rounded-b-lg" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Pharmacy Details */}
      {selectedPharmacy && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedPharmacy.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{selectedPharmacy.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{selectedPharmacy.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{selectedPharmacy.distance} km away</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={() => handleCallPharmacy(selectedPharmacy.phone)}>
                      <Phone className="h-4 w-4 mr-1" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleGetDirections(selectedPharmacy.coordinates[1], selectedPharmacy.coordinates[0])
                      }
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Get Directions
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Available Medicines</h4>
                  <div className="space-y-2">
                    {selectedPharmacy.medicines.map((medicine, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{medicine.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">₹{medicine.price}</span>
                          <Badge variant={medicine.inStock ? "default" : "destructive"}>
                            {medicine.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
