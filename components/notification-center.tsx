"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Package, AlertTriangle, CheckCircle, Clock, Trash2, Settings } from "lucide-react"

interface Notification {
  id: string
  type: "order" | "delivery" | "stock" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()

    // Set up real-time notifications (WebSocket simulation)
    const interval = setInterval(() => {
      // Simulate receiving new notifications
      if (Math.random() > 0.8) {
        addNewNotification()
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      // Mock notifications data
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "delivery",
          title: "Order Delivered",
          message: "Your order #MR123456 has been delivered successfully",
          timestamp: "2 minutes ago",
          read: false,
          priority: "high",
        },
        {
          id: "2",
          type: "order",
          title: "Order Confirmed",
          message: "Your order for Paracetamol has been confirmed",
          timestamp: "1 hour ago",
          read: true,
          priority: "medium",
        },
        {
          id: "3",
          type: "stock",
          title: "Medicine Back in Stock",
          message: "Vitamin D3 is now available at Apollo Pharmacy",
          timestamp: "3 hours ago",
          read: false,
          priority: "low",
        },
        {
          id: "4",
          type: "system",
          title: "System Maintenance",
          message: "Scheduled maintenance tonight from 2 AM to 4 AM",
          timestamp: "1 day ago",
          read: true,
          priority: "medium",
        },
      ]

      setNotifications(mockNotifications)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const addNewNotification = () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: "delivery",
      title: "Order Update",
      message: "Your order is out for delivery",
      timestamp: "Just now",
      read: false,
      priority: "medium",
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-5 w-5 text-blue-600" />
      case "delivery":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "stock":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "system":
        return <Settings className="h-5 w-5 text-gray-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-orange-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading notifications...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">{notification.message}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Badge variant="default" className="bg-blue-600">
                          New
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {notification.timestamp}
                    </div>
                    {!notification.read && (
                      <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-l-4 ${getPriorityColor(notification.priority)} bg-blue-50`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                          <CardDescription className="mt-1">{notification.message}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-blue-600">
                        New
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                        Mark as Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {notifications
              .filter((n) => n.type === "order")
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                          <CardDescription className="mt-1">{notification.message}</CardDescription>
                        </div>
                      </div>
                      {!notification.read && (
                        <Badge variant="default" className="bg-blue-600">
                          New
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                      {!notification.read && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-4">
            {notifications
              .filter((n) => n.type === "delivery")
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                          <CardDescription className="mt-1">{notification.message}</CardDescription>
                        </div>
                      </div>
                      {!notification.read && (
                        <Badge variant="default" className="bg-blue-600">
                          New
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                      {!notification.read && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
