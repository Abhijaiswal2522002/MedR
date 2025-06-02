"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapboxMap } from "@/components/mapbox-map"
import { MapPin, Navigation, Phone } from "lucide-react"
import { SimpleMap } from "@/components/simple-map"

interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  isOpen: boolean
  distance: number
  position: { lat: number; lng: number }
  medicines: Array<{
    name: string
    price: number
    inStock: boolean
  }>
}

export function PharmacyMap() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 28.6139, // Default to Delhi
    lng: 77.209,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [mapsAvailable, setMapsAvailable] = useState(true)

  useEffect(() => {
    // Check if Mapbox access token is available
    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      setMapsAvailable(false)
      console.warn("Mapbox access token not found. Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN environment variable.")
    }

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
    try {
      // Mock pharmacy data with coordinates
      const mockPharmacies: Pharmacy[] = [
        {
          id: "1",
          name: "Apollo Pharmacy",
          address: "Connaught Place, New Delhi",
          phone: "+91 98765 43210",
          isOpen: true,
          distance: 1.2,
          position: { lat: 28.6304, lng: 77.2177 },
          medicines: [
            { name: "Paracetamol", price: 25, inStock: true },
            { name: "Aspirin", price: 30, inStock: true },
          ],
        },
        {
          id: "2",
          name: "MedPlus",
          address: "Khan Market, New Delhi",
          phone: "+91 98765 43211",
          isOpen: true,
          distance: 2.1,
          position: { lat: 28.5984, lng: 77.2319 },
          medicines: [
            { name: "Vitamin D3", price: 150, inStock: true },
            { name: "Calcium", price: 120, inStock: false },
          ],
        },
        {
          id: "3",
          name: "Guardian Pharmacy",
          address: "Lajpat Nagar, New Delhi",
          phone: "+91 98765 43212",
          isOpen: false,
          distance: 3.5,
          position: { lat: 28.5677, lng: 77.2431 },
          medicines: [{ name: "Antibiotics", price: 200, inStock: true }],
        },
      ]

      setPharmacies(mockPharmacies)
    } catch (error) {
      console.error("Error fetching pharmacies:", error)
    }
  }

  const mapMarkers = [
    // User location marker
    {
      id: "user-location",
      position: userLocation,
      title: "Your Location",
      info: "<strong>You are here</strong>",
      type: "user" as const,
    },
    // Pharmacy markers
    ...pharmacies.map((pharmacy) => ({
      id: pharmacy.id,
      position: pharmacy.position,
      title: pharmacy.name,
      info: `
        <div>
          <strong>${pharmacy.name}</strong><br/>
          ${pharmacy.address}<br/>
          Distance: ${pharmacy.distance} km<br/>
          Status: <span style="color: ${pharmacy.isOpen ? "green" : "red"}">${pharmacy.isOpen ? "Open" : "Closed"}</span><br/>
          <small>Click for more details</small>
        </div>
      `,
      type: "pharmacy" as const,
    })),
  ]

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleMarkerClick = (marker: any) => {
    if (marker.type === "pharmacy") {
      const pharmacy = pharmacies.find((p) => p.id === marker.id)
      if (pharmacy) {
        setSelectedPharmacy(pharmacy)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Nearby Pharmacies</h1>
        <div className="max-w-md">
          <Input
            placeholder="Search pharmacies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pharmacy List */}
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
          {filteredPharmacies.map((pharmacy) => (
            <Card
              key={pharmacy.id}
              className={`cursor-pointer transition-colors ${
                selectedPharmacy?.id === pharmacy.id ? "border-green-500 bg-green-50" : ""
              }`}
              onClick={() => setSelectedPharmacy(pharmacy)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                  <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
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
                  <Button variant="outline" size="sm">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm">Get Directions</Button>
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
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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
              {!mapsAvailable ? (
                <SimpleMap
                  center={userLocation}
                  zoom={13}
                  markers={mapMarkers}
                  className="rounded-b-lg"
                  onMarkerClick={handleMarkerClick}
                />
              ) : (
                <div className="h-[600px] w-full">
                  <MapboxMap
                    center={userLocation}
                    zoom={13}
                    markers={mapMarkers}
                    className="rounded-b-lg"
                    onMarkerClick={handleMarkerClick}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
