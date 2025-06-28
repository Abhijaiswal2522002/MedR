"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"

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

export function MapboxMap({ center, zoom = 13, markers = [], className = "", onMarkerClick }: Props) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Check if Mapbox token is available
    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      console.warn("Mapbox access token not found")
      return
    }

    // Dynamically import Mapbox GL JS
    const loadMapbox = async () => {
      try {
        const mapboxgl = await import("mapbox-gl")
        const Map = (await import("react-map-gl")).default
        setMapLoaded(true)
      } catch (error) {
        console.error("Failed to load Mapbox:", error)
      }
    }

    loadMapbox()
  }, [])

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker)
    onMarkerClick?.(marker)
  }

  // Fallback map component when Mapbox is not available
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || !mapLoaded) {
    return (
      <div className={`relative bg-gray-100 rounded-lg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
            <p className="text-gray-500 mb-4">Map functionality requires Mapbox configuration</p>
            <div className="space-y-2">
              {markers.map((marker) => (
                <div
                  key={marker.id}
                  className="p-3 bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleMarkerClick(marker)}
                >
                  <div className="flex items-center">
                    <MapPin className={`h-4 w-4 mr-2 ${marker.type === "user" ? "text-blue-600" : "text-red-600"}`} />
                    <div>
                      <p className="font-medium text-sm">{marker.title}</p>
                      {marker.info && (
                        <p className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: marker.info }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // This would be the actual Mapbox implementation
  // For now, returning the fallback since we need proper Mapbox setup
  return (
    <div className={`relative bg-gray-100 rounded-lg ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-gray-500 mb-4">Mapbox integration ready for configuration</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {markers.map((marker) => (
              <div
                key={marker.id}
                className="p-3 bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMarkerClick(marker)}
              >
                <div className="flex items-center">
                  <MapPin className={`h-4 w-4 mr-2 ${marker.type === "user" ? "text-blue-600" : "text-red-600"}`} />
                  <div className="text-left">
                    <p className="font-medium text-sm">{marker.title}</p>
                    {marker.info && (
                      <div className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: marker.info }} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
