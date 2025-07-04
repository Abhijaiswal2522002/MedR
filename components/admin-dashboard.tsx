"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Package, TrendingUp, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { clientApi } from "@/lib/client-api"
import type { Pharmacy, Order, User } from "@/lib/mock-data"

export function AdminDashboard() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const { pharmacies, orders, users } = await clientApi.getAdminDashboard()
        setPharmacies(pharmacies)
        setOrders(orders)
        setUsers(users)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleVerifyPharmacy = async (pharmacyId: string) => {
    try {
      await clientApi.verifyPharmacy(pharmacyId)
      // Update local state
      setPharmacies((prev) => prev.map((p) => (p.id === pharmacyId ? { ...p, verified: true } : p)))
    } catch (error) {
      console.error("Failed to verify pharmacy:", error)
    }
  }

  const stats = {
    totalPharmacies: pharmacies.length,
    totalUsers: users.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">System Overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pharmacies</p>
                <p className="text-2xl font-bold">{stats.totalPharmacies}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pharmacies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="pharmacies">
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pharmacies.map((pharmacy) => (
                  <div key={pharmacy.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                        <p className="text-sm text-gray-600">{pharmacy.address}</p>
                        <p className="text-sm text-gray-600">{pharmacy.phone}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                          {pharmacy.isOpen ? "Open" : "Closed"}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleVerifyPharmacy(pharmacy.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-1" />
                            Suspend
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === "pending" ? "default" : "secondary"}>{order.status}</Badge>
                        <p className="text-lg font-bold mt-1">₹{order.total}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.medicines.map((medicine, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {medicine.name} x {medicine.quantity}
                          </span>
                          <span>₹{medicine.price * medicine.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{user.type}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
