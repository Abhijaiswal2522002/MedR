"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, AlertCircle } from "lucide-react"

interface MapMarker {
  id: string
  position: { lat: number; lng: number }
  title: string
  info?: string
  type?: "pharmacy" | "user"
}

interface Props {
  center: { lat: number; lng: number }
  zoom?: number
  markers?: MapMarker[]
  className?: string
  onMarkerClick?: (marker: MapMarker) => void
}

export function SimpleMap({ center, zoom = 13, markers = [], className = "", onMarkerClick }: Props) {
  return (
    <div className={`relative ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Map View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-500 mb-4">Showing {markers.length} locations near you</p>
              <div className="space-y-2">
                {markers.slice(0, 5).map((marker) => (
                  <div
                    key={marker.id}
                    className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
                    onClick={() => onMarkerClick?.(marker)}
                  >
                    <div className="flex items-center">
                      <MapPin className={`h-4 w-4 mr-2 ${marker.type === "user" ? "text-blue-600" : "text-red-600"}`} />
                      <span className="font-medium">{marker.title}</span>
                    </div>
                    <Navigation className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
