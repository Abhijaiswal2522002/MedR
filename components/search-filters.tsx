"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function SearchFilters() {
  const [distance, setDistance] = useState([5])
  const [openNow, setOpenNow] = useState(false)
  const [hasStock, setHasStock] = useState(true)
  const [deliveryAvailable, setDeliveryAvailable] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Distance</Label>
          <div className="mt-2">
            <Slider value={distance} onValueChange={setDistance} max={20} min={1} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 km</span>
              <span>{distance[0]} km</span>
              <span>20 km</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="open-now" checked={openNow} onCheckedChange={setOpenNow} />
            <Label htmlFor="open-now" className="text-sm">
              Open now
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="has-stock" checked={hasStock} onCheckedChange={setHasStock} />
            <Label htmlFor="has-stock" className="text-sm">
              In stock only
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="delivery" checked={deliveryAvailable} onCheckedChange={setDeliveryAvailable} />
            <Label htmlFor="delivery" className="text-sm">
              Delivery available
            </Label>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
