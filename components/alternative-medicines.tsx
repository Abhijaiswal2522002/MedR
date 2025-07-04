"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { clientApi } from "@/lib/client-api"
import type { Medicine } from "@/lib/mock-data"

interface AlternativeMedicinesProps {
  compound: string
}

export function AlternativeMedicines({ compound }: AlternativeMedicinesProps) {
  const [alternatives, setAlternatives] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlternatives = async () => {
      try {
        setLoading(true)
        const { alternatives } = await clientApi.getAlternatives(compound)
        setAlternatives(alternatives)
      } catch (error) {
        console.error("Failed to fetch alternatives:", error)
      } finally {
        setLoading(false)
      }
    }

    if (compound) {
      fetchAlternatives()
    }
  }, [compound])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alternative Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alternative Medicines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alternatives.map((medicine) => (
            <div key={medicine.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{medicine.name}</h3>
                <p className="text-sm text-gray-600">{medicine.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{medicine.dosage}</Badge>
                  <Badge variant="outline">{medicine.manufacturer}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{medicine.price}</p>
                <Button size="sm" className="mt-2">
                  View Details
                </Button>
              </div>
            </div>
          ))}
          {alternatives.length === 0 && (
            <p className="text-center text-gray-500 py-8">No alternative medicines found for {compound}.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
