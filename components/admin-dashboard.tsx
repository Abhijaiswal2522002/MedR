"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Users,
  Building2,
  Pill,
  TrendingUp,
  CheckCircle,
  XCircle,
  Search,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getAdminDashboard } from "@/lib/client-api"

interface User {
  id: string
  name: string
  email: string
  role: string
  isVerified: boolean
  createdAt: string
}

interface Pharmacy {
  id: string
  name: string
  email: string
  address: string
  licenseNumber: string
  isVerified: boolean
  createdAt: string
}

interface Analytics {
  totalUsers: number
  totalPharmacies: number
  totalMedicines: number
  totalOrders: number
  revenueToday: number
  popularMedicines: Array<{ name: string; searches: number }>
}

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalPharmacies: 0,
    totalMedicines: 0,
    totalOrders: 0,
    revenueToday: 0,
    popularMedicines: [],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const data = await getAdminDashboard()
      setUsers(data.users || [])
      setPharmacies(data.pharmacies || [])
      setAnalytics(data.analytics || {})
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPharmacy = async (pharmacyId: string, verify: boolean) => {
    try {
      // Mock verification - in real app, this would call an API
      const updatedPharmacies = pharmacies.map((pharmacy) =>
        pharmacy.id === pharmacyId ? { ...pharmacy, isVerified: verify } : pharmacy,
      )
      setPharmacies(updatedPharmacies)

      toast({
        title: "Success",
        description: `Pharmacy ${verify ? "verified" : "rejected"} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update pharmacy status",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, pharmacies, and platform analytics</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pharmacies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPharmacies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicines</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalMedicines}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{analytics.revenueToday}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage registered users</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                        <Badge variant={user.isVerified ? "default" : "destructive"}>
                          {user.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Joined: {user.createdAt}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="destructive">
                          Suspend
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pharmacies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Pharmacy Management</CardTitle>
                  <CardDescription>Approve and manage pharmacy registrations</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search pharmacies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPharmacies.map((pharmacy) => (
                  <div key={pharmacy.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{pharmacy.name}</h4>
                      <p className="text-sm text-gray-500">{pharmacy.email}</p>
                      <p className="text-sm text-gray-500">{pharmacy.address}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge variant="outline">License: {pharmacy.licenseNumber}</Badge>
                        <Badge variant={pharmacy.isVerified ? "default" : "destructive"}>
                          {pharmacy.isVerified ? "Verified" : "Pending Verification"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Registered: {pharmacy.createdAt}</p>
                      <div className="flex space-x-2 mt-2">
                        {!pharmacy.isVerified && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleVerifyPharmacy(pharmacy.id, true)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleVerifyPharmacy(pharmacy.id, false)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Medicines</CardTitle>
                <CardDescription>Most searched medicines this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.popularMedicines.map((medicine, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{medicine.name}</span>
                      <Badge variant="secondary">{medicine.searches} searches</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Platform status and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Database Status</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Response Time</span>
                    <Badge variant="secondary">120ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Users</span>
                    <Badge variant="secondary">1,234</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pending Verifications</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />5
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
