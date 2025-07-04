import {
  mockMedicines,
  mockPharmacies,
  mockUsers,
  mockOrders,
  type Medicine,
  type Pharmacy,
  type User,
  type Order,
} from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Utility functions
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10 // Round to 1 decimal place
}

// Client API object
export const clientApi = {
  // Medicine search
  searchMedicines: async (query: string, location?: string): Promise<{ pharmacies: Pharmacy[] }> => {
    await delay(500)
    const filteredPharmacies = mockPharmacies.filter((pharmacy) =>
      pharmacy.medicines.some((medicine) => medicine.name.toLowerCase().includes(query.toLowerCase())),
    )
    return { pharmacies: filteredPharmacies }
  },

  // Get medicine alternatives
  getAlternatives: async (compound: string): Promise<{ alternatives: Medicine[] }> => {
    await delay(300)
    const alternatives = mockMedicines.filter(
      (medicine) =>
        medicine.activeCompound.toLowerCase().includes(compound.toLowerCase()) ||
        medicine.category === mockMedicines.find((m) => m.activeCompound === compound)?.category,
    )
    return { alternatives }
  },

  // Get nearby pharmacies
  getNearbyPharmacies: async (medicineId: string): Promise<{ pharmacies: Pharmacy[] }> => {
    await delay(400)
    return { pharmacies: mockPharmacies }
  },

  // User authentication
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay(800)
    const user = mockUsers.find((u) => u.email === email)
    if (!user) throw new Error("Invalid credentials")
    return { user, token: "mock-jwt-token" }
  },

  register: async (userData: Partial<User>): Promise<{ user: User; token: string }> => {
    await delay(1000)
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
      type: userData.type || "user",
    }
    return { user: newUser, token: "mock-jwt-token" }
  },

  // User dashboard
  getUserDashboard: async (userId: string): Promise<{ orders: Order[]; profile: User }> => {
    await delay(600)
    const orders = mockOrders.filter((order) => order.userId === userId)
    const profile = mockUsers.find((user) => user.id === userId) || mockUsers[0]
    return { orders, profile }
  },

  // Pharmacy operations
  addMedicineStock: async (pharmacyId: string, medicine: any): Promise<{ success: boolean }> => {
    await delay(700)
    return { success: true }
  },

  getPharmacyDashboard: async (pharmacyId: string): Promise<{ orders: Order[]; inventory: any[] }> => {
    await delay(500)
    const orders = mockOrders.filter((order) => order.pharmacyId === pharmacyId)
    const inventory = mockMedicines.map((med) => ({ ...med, stock: Math.floor(Math.random() * 100) }))
    return { orders, inventory }
  },

  // Order operations
  createOrder: async (orderData: Partial<Order>): Promise<{ order: Order }> => {
    await delay(800)
    const newOrder: Order = {
      id: Date.now().toString(),
      userId: orderData.userId || "1",
      pharmacyId: orderData.pharmacyId || "1",
      medicines: orderData.medicines || [],
      total: orderData.total || 0,
      status: "pending",
      trackingId: `TRK${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    return { order: newOrder }
  },

  trackOrder: async (trackingId: string): Promise<{ order: Order }> => {
    await delay(400)
    const order = mockOrders.find((o) => o.trackingId === trackingId) || mockOrders[0]
    return { order }
  },

  // Admin operations
  getAdminDashboard: async (): Promise<{ pharmacies: Pharmacy[]; orders: Order[]; users: User[] }> => {
    await delay(600)
    return {
      pharmacies: mockPharmacies,
      orders: mockOrders,
      users: mockUsers,
    }
  },

  verifyPharmacy: async (pharmacyId: string): Promise<{ success: boolean }> => {
    await delay(500)
    return { success: true }
  },

  // Emergency delivery
  requestEmergencyDelivery: async (deliveryData: any): Promise<{ success: boolean; estimatedTime: string }> => {
    await delay(1000)
    return { success: true, estimatedTime: "30-45 minutes" }
  },

  // Payment processing
  processPayment: async (paymentData: any): Promise<{ success: boolean; transactionId: string }> => {
    await delay(1200)
    return { success: true, transactionId: `TXN${Date.now()}` }
  },
}
