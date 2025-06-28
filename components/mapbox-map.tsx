"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Navigation, Star, Clock, AlertCircle } from "lucide-react"
import { getAllPharmacies, calculateDistance } from "@/lib/client-api"
import type { Pharmacy } from "@/lib/mock-data"

interface MapboxMapProps {
  searchQuery?: string
}

export default function MapboxMap({ searchQuery }: MapboxMapProps) {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    getCurrentLocation()
    fetchPharmacies()
  }, [])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setLocationError(null)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError("Unable to get your location")
          // Set default location (Delhi)
          setUserLocation({ lat: 28.6139, lng: 77.209 })
        },
      )
    } else {
      setLocationError("Geolocation is not supported")
      setUserLocation({ lat: 28.6139, lng: 77.209 })
    }
  }

  const fetchPharmacies = async () => {
    try {
      setLoading(true)
      const data = await getAllPharmacies()
      setPharmacies(data)
    } catch (error) {
      console.error("Error fetching pharmacies:", error)
    } finally {
      setLoading(false)
    }
  }

  const updatePharmacyDistances = () => {
    if (!userLocation) return

    const updatedPharmacies = pharmacies
      .map((pharmacy) => ({
        ...pharmacy,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          pharmacy.coordinates[1],
          pharmacy.coordinates[0],
        ),
      }))
      .sort((a, b) => a.distance - b.distance)

    setPharmacies(updatedPharmacies)
  }

  useEffect(() => {
    if (userLocation && pharmacies.length > 0) {
      updatePharmacyDistances()
    }
  }, [userLocation])

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleDirections = (pharmacy: Pharmacy) => {
    const [lng, lat] = pharmacy.coordinates
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
    window.open(url, "_blank")
  }

  const handleEmergencyCall = () => {
    window.open("tel:108", "_self")
  }

  const filteredPharmacies = searchQuery
    ? pharmacies.filter(
        (pharmacy) =>
          pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : pharmacies

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pharmacies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nearby Pharmacies</h2>
          <p className="text-gray-600">
            {userLocation ? `Found ${filteredPharmacies.length} pharmacies near you` : "Loading location..."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={getCurrentLocation} variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Update Location
          </Button>
          <Button onClick={handleEmergencyCall} variant="destructive" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Emergency (108)
          </Button>
        </div>
      </div>

      {/* Location Error */}
      {locationError && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{locationError}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pharmacy List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPharmacies.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No pharmacies found</p>
              </CardContent>
            </Card>
          ) : (
            filteredPharmacies.map((pharmacy) => (
              <Card
                key={pharmacy.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPharmacy?.id === pharmacy.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedPharmacy(pharmacy)}
              >
                <CardHeader className="pb-3">
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
                      {userLocation && (
                        <p className="text-sm text-gray-500 mt-1">{pharmacy.distance.toFixed(1)} km away</p>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{pharmacy.rating}</span>
                      </div>
                      {pharmacy.isVerified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCall(pharmacy.phone)
                        }}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDirections(pharmacy)
                        }}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Selected Pharmacy Details */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Pharmacy Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPharmacy ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPharmacy.name}</h3>
                    <p className="text-gray-600 text-sm">{selectedPharmacy.address}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="text-sm">{selectedPharmacy.isOpen ? "Open Now" : "Closed"}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{selectedPharmacy.rating}</span>
                    </div>
                  </div>

                  {userLocation && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Distance from your location</p>
                      <p className="font-semibold">{selectedPharmacy.distance.toFixed(1)} km</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => handleCall(selectedPharmacy.phone)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call {selectedPharmacy.phone}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleDirections(selectedPharmacy)}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>

                  {selectedPharmacy.medicines.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Available Medicines</h4>
                      <div className="space-y-2">
                        {selectedPharmacy.medicines.slice(0, 3).map((medicine, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Medicine {index + 1}</span>
                            <Badge variant={medicine.inStock ? "default" : "secondary"}>
                              {medicine.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a pharmacy to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
