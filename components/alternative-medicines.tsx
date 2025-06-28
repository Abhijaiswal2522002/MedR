"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getMedicineAlternatives } from "@/lib/client-api"

interface Alternative {
  id: string
  name: string
  manufacturer: string
  price: number
  availability: number
}

interface Props {
  compound: string
}

export function AlternativeMedicines({ compound }: Props) {
  const [alternatives, setAlternatives] = useState<Alternative[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlternatives = async () => {
      try {
        const data = await getMedicineAlternatives(compound)
        setAlternatives(data.alternatives || [])
      } catch (error) {
        console.error("Error fetching alternatives:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlternatives()
  }, [compound])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alternative Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading alternatives...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alternative Medicines</CardTitle>
        <p className="text-sm text-gray-600">Other medicines with the same active compound: {compound}</p>
      </CardHeader>
      <CardContent>
        {alternatives.length === 0 ? (
          <p className="text-gray-500">No alternatives found.</p>
        ) : (
          <div className="space-y-4">
            {alternatives.map((alt) => (
              <div key={alt.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{alt.name}</h4>
                  <p className="text-sm text-gray-500">{alt.manufacturer}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant={alt.availability > 0 ? "default" : "secondary"}>
                      {alt.availability > 0 ? `${alt.availability} stores` : "Out of stock"}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{alt.price}</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/search?query=${alt.name}`}>Find Stores</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
