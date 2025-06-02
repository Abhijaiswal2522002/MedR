"use client"

import { useEffect, useState } from "react"
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl/mapbox"
import { MapPin } from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"

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
  const [viewState, setViewState] = useState({
    longitude: center.lng,
    latitude: center.lat,
    zoom: zoom,
  })

  useEffect(() => {
    setViewState({
      longitude: center.lng,
      latitude: center.lat,
      zoom: zoom,
    })
  }, [center, zoom])

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker)
    onMarkerClick?.(marker)
  }

  return (
    <div className={`relative ${className}`}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />

        {/* Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.position.lng}
            latitude={marker.position.lat}
            anchor="bottom"
            onClick={() => handleMarkerClick(marker)}
          >
            <div
              className={`cursor-pointer transform transition-transform hover:scale-110 ${
                marker.type === "user" ? "text-blue-600" : "text-red-600"
              }`}
            >
              <MapPin size={marker.type === "user" ? 32 : 28} fill="currentColor" className="drop-shadow-lg" />
            </div>
          </Marker>
        ))}

        {/* Popup */}
        {selectedMarker && (
          <Popup
            longitude={selectedMarker.position.lng}
            latitude={selectedMarker.position.lat}
            anchor="top"
            onClose={() => setSelectedMarker(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-sm mb-1">{selectedMarker.title}</h3>
              {selectedMarker.info && (
                <div className="text-xs text-gray-600" dangerouslySetInnerHTML={{ __html: selectedMarker.info }} />
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}
