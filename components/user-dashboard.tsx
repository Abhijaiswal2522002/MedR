"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Truck, MapPin } from "lucide-react"
import Link from "next/link"

interface RecentSearch {
  id: string
  medicine: string
  location: string
  timestamp: string
}

interface DeliveryRequest {
  id: string
  medicine: string
  pharmacy: string
  status: "pending" | "confirmed" | "in-transit" | "delivered"
  estimatedTime: string
}

export function UserDashboard() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  const [deliveryRequests, setDeliveryRequests] = useState<DeliveryRequest[]>([])

  useEffect(() => {
    // Fetch user data
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/user/dashboard")
      const data = await response.json()
      setRecentSearches(data.recentSearches || [])
      setDeliveryRequests(data.deliveryRequests || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in-transit":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Manage your medicine searches and deliveries</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/search">
                  <Search className="mr-2 h-4 w-4" />
                  Search Medicine
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/emergency">
                  <Truck className="mr-2 h-4 w-4" />
                  Emergency Delivery
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/profile">Profile Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Searches
              </CardTitle>
              <CardDescription>Your recent medicine searches</CardDescription>
            </CardHeader>
            <CardContent>
              {recentSearches.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent searches. Start by searching for a medicine.</p>
              ) : (
                <div className="space-y-3">
                  {recentSearches.map((search) => (
                    <div key={search.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{search.medicine}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {search.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{search.timestamp}</p>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/search?query=${search.medicine}&location=${search.location}`}>
                            Search Again
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Delivery Requests
              </CardTitle>
              <CardDescription>Track your medicine delivery requests</CardDescription>
            </CardHeader>
            <CardContent>
              {deliveryRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No delivery requests yet.</p>
              ) : (
                <div className="space-y-3">
                  {deliveryRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{request.medicine}</p>
                          <p className="text-sm text-gray-500">{request.pharmacy}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>{request.status.replace("-", " ")}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">ETA: {request.estimatedTime}</p>
                        <Button size="sm" variant="outline">
                          Track Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
