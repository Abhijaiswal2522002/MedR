"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package, AlertTriangle, TrendingUp, Users } from "lucide-react"
import { AddMedicineDialog } from "@/components/add-medicine-dialog"
import { PharmacyVerificationNotice } from "@/components/pharmacy-verification-notice"
import { useAuth } from "@/hooks/use-auth"

interface InventoryItem {
  id: string
  medicine: {
    name: string
    activeCompound: string
  }
  quantity: number
  price: number
  expiryDate: string
  lowStock: boolean
}

interface Order {
  id: string
  customerName: string
  medicine: string
  quantity: number
  status: "pending" | "confirmed" | "delivered"
  timestamp: string
}

export function PharmacyDashboard() {
  const { user } = useAuth()
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStockItems: 0,
    pendingOrders: 0,
    todayRevenue: 0,
  })
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/pharmacy/dashboard")
      const data = await response.json()
      setInventory(data.inventory || [])
      setOrders(data.orders || [])
      setStats(data.stats || {})
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
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isVerified = user?.isVerified

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard</h1>
        <p className="text-gray-600">Manage your inventory and orders</p>
      </div>

      <PharmacyVerificationNotice />

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Medicines</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMedicines}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.lowStockItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{stats.todayRevenue}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Medicine Inventory</CardTitle>
                  <CardDescription>Manage your medicine stock</CardDescription>
                </div>
                <Button onClick={() => setShowAddDialog(true)} disabled={!isVerified}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medicine
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!isVerified ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Inventory management will be available after verification</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inventory.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.medicine.name}</h4>
                        <p className="text-sm text-gray-500">{item.medicine.activeCompound}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge variant={item.lowStock ? "destructive" : "default"}>{item.quantity} in stock</Badge>
                          {item.lowStock && (
                            <Badge variant="outline" className="text-orange-600">
                              Low Stock
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price}</p>
                        <p className="text-xs text-gray-500">Expires: {item.expiryDate}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            Restock
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage customer orders and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              {!isVerified ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Order management will be available after verification</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.customerName}</h4>
                        <p className="text-sm text-gray-500">
                          {order.medicine} × {order.quantity}
                        </p>
                        <p className="text-xs text-gray-400">{order.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <div className="flex space-x-2 mt-2">
                          {order.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline">
                                Accept
                              </Button>
                              <Button size="sm" variant="destructive">
                                Decline
                              </Button>
                            </>
                          )}
                          {order.status === "confirmed" && <Button size="sm">Mark Delivered</Button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View your pharmacy performance</CardDescription>
            </CardHeader>
            <CardContent>
              {!isVerified ? (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Analytics will be available after verification</p>
                </div>
              ) : (
                <p className="text-gray-500">Analytics dashboard coming soon...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddMedicineDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={fetchDashboardData} />
    </div>
  )
}
