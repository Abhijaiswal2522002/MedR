"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Plus, TrendingUp, Clock, CheckCircle, Loader2 } from "lucide-react"
import { AddMedicineDialog } from "@/components/add-medicine-dialog"
import { PharmacyVerificationNotice } from "@/components/pharmacy-verification-notice"
import { clientApi } from "@/lib/client-api"
import type { Order, Medicine } from "@/lib/mock-data"

export function PharmacyDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [inventory, setInventory] = useState<(Medicine & { stock: number })[]>([])
  const [loading, setLoading] = useState(true)
  const [isVerified] = useState(false) // Mock verification status

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const { orders, inventory } = await clientApi.getPharmacyDashboard("1") // Mock pharmacy ID
        setOrders(orders)
        setInventory(inventory)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    completedOrders: orders.filter((o) => o.status === "delivered").length,
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
        <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
        <AddMedicineDialog />
      </div>

      {!isVerified && <PharmacyVerificationNotice />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{stats.completedOrders}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              ) : (
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

                      <div className="flex justify-end mt-4 pt-3 border-t">
                        <Button size="sm">Process Order</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medicine Inventory</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medicine
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((medicine) => (
                  <div key={medicine.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{medicine.name}</h3>
                        <p className="text-sm text-gray-600">{medicine.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{medicine.dosage}</Badge>
                          <Badge variant="secondary">{medicine.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{medicine.price}</p>
                        <p className="text-sm text-gray-600">Stock: {medicine.stock}</p>
                        <Badge variant={medicine.stock > 10 ? "default" : "destructive"}>
                          {medicine.stock > 10 ? "In Stock" : "Low Stock"}
                        </Badge>
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
