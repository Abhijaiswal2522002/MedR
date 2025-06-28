import {
  mockMedicines,
  mockPharmacies,
  mockUsers,
  mockOrders,
  type Medicine,
  type Pharmacy,
  type User,
} from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Medicine API functions
export const searchMedicines = async (
  query: string,
  location?: string,
): Promise<{
  pharmacies: Array<{
    id: string
    name: string
    address: string
    phone: string
    isOpen: boolean
    distance: number
    medicines: Array<{
      name: string
      price: number
      inStock: boolean
      quantity: number
    }>
  }>
}> => {
  await delay(500)

  if (!query.trim()) {
    return { pharmacies: [] }
  }

  // Find medicines matching the query
  const matchingMedicines = mockMedicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(query.toLowerCase()) ||
      medicine.category.toLowerCase().includes(query.toLowerCase()),
  )

  if (matchingMedicines.length === 0) {
    return { pharmacies: [] }
  }

  // Find pharmacies that have these medicines
  const pharmaciesWithMedicines = mockPharmacies
    .map((pharmacy) => {
      const availableMedicines = matchingMedicines
        .map((medicine) => {
          const pharmacyMedicine = pharmacy.medicines.find((pm) => pm.medicineId === medicine.id)
          if (pharmacyMedicine && pharmacyMedicine.inStock) {
            return {
              name: medicine.name,
              price: pharmacyMedicine.price,
              inStock: true,
              quantity: pharmacyMedicine.quantity,
            }
          }
          return null
        })
        .filter(Boolean) as Array<{
        name: string
        price: number
        inStock: boolean
        quantity: number
      }>

      if (availableMedicines.length > 0) {
        return {
          id: pharmacy.id,
          name: pharmacy.name,
          address: pharmacy.address,
          phone: pharmacy.phone,
          isOpen: pharmacy.isOpen,
          distance: pharmacy.distance,
          medicines: availableMedicines,
        }
      }
      return null
    })
    .filter(Boolean) as Array<{
    id: string
    name: string
    address: string
    phone: string
    isOpen: boolean
    distance: number
    medicines: Array<{
      name: string
      price: number
      inStock: boolean
      quantity: number
    }>
  }>

  return { pharmacies: pharmaciesWithMedicines }
}

export const getMedicineById = async (id: string): Promise<Medicine | null> => {
  await delay(300)
  return mockMedicines.find((medicine) => medicine.id === id) || null
}

export const getMedicineAlternatives = async (
  compound: string,
): Promise<{
  alternatives: Array<{
    id: string
    name: string
    manufacturer: string
    price: number
    availability: number
  }>
}> => {
  await delay(400)

  const alternatives = mockMedicines
    .filter((medicine) => medicine.activeCompound.toLowerCase().includes(compound.toLowerCase()))
    .map((medicine) => {
      // Count how many pharmacies have this medicine
      const availability = mockPharmacies.filter((pharmacy) =>
        pharmacy.medicines.some((pm) => pm.medicineId === medicine.id && pm.inStock),
      ).length

      // Get average price
      const prices = mockPharmacies
        .map((pharmacy) => pharmacy.medicines.find((pm) => pm.medicineId === medicine.id))
        .filter((pm) => pm && pm.inStock)
        .map((pm) => pm!.price)

      const averagePrice =
        prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : medicine.price

      return {
        id: medicine.id,
        name: medicine.name,
        manufacturer: medicine.manufacturer,
        price: averagePrice,
        availability,
      }
    })
    .filter((alt) => alt.availability > 0)

  return { alternatives }
}

// Pharmacy API functions
export const getNearbyPharmacies = async (
  medicineId: string,
): Promise<{
  pharmacies: Array<{
    id: string
    name: string
    address: string
    distance: number
    phone: string
    isOpen: boolean
    hasStock: boolean
    price: number
  }>
}> => {
  await delay(600)

  const pharmaciesWithMedicine = mockPharmacies
    .map((pharmacy) => {
      const medicine = pharmacy.medicines.find((pm) => pm.medicineId === medicineId)
      if (medicine && medicine.inStock) {
        return {
          id: pharmacy.id,
          name: pharmacy.name,
          address: pharmacy.address,
          distance: pharmacy.distance,
          phone: pharmacy.phone,
          isOpen: pharmacy.isOpen,
          hasStock: true,
          price: medicine.price,
        }
      }
      return null
    })
    .filter(Boolean) as Array<{
    id: string
    name: string
    address: string
    distance: number
    phone: string
    isOpen: boolean
    hasStock: boolean
    price: number
  }>

  return { pharmacies: pharmaciesWithMedicine }
}

export const getAllPharmacies = async (lat?: number, lng?: number): Promise<Pharmacy[]> => {
  await delay(400)

  if (lat && lng) {
    // Calculate distances and sort by proximity
    return mockPharmacies
      .map((pharmacy) => ({
        ...pharmacy,
        distance: calculateDistance(lat, lng, pharmacy.coordinates[1], pharmacy.coordinates[0]),
      }))
      .sort((a, b) => a.distance - b.distance)
  }

  return mockPharmacies
}

// User API functions
export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  await delay(800)

  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    return {
      user,
      token: `mock-token-${user.id}-${Date.now()}`,
    }
  }

  return null
}

export const registerUser = async (userData: {
  name: string
  email: string
  phone: string
  password: string
}): Promise<{ user: User; token: string }> => {
  await delay(1000)

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: "",
    role: "user",
    isVerified: false,
  }

  mockUsers.push(newUser)

  return {
    user: newUser,
    token: `mock-token-${newUser.id}-${Date.now()}`,
  }
}

export const registerPharmacy = async (pharmacyData: {
  name: string
  email: string
  phone: string
  address: string
  licenseNumber: string
  password: string
}): Promise<{ pharmacy: Pharmacy; token: string }> => {
  await delay(1200)

  const newPharmacy: Pharmacy = {
    id: `pharmacy-${Date.now()}`,
    name: pharmacyData.name,
    address: pharmacyData.address,
    phone: pharmacyData.phone,
    email: pharmacyData.email,
    licenseNumber: pharmacyData.licenseNumber,
    isVerified: false,
    isOpen: true,
    rating: 0,
    distance: 0,
    coordinates: [77.5946, 12.9716], // Default coordinates
    medicines: [],
  }

  mockPharmacies.push(newPharmacy)

  return {
    pharmacy: newPharmacy,
    token: `mock-token-${newPharmacy.id}-${Date.now()}`,
  }
}

// Dashboard API functions
export const getUserDashboard = async (): Promise<{
  recentSearches: Array<{
    id: string
    medicine: string
    location: string
    timestamp: string
  }>
  deliveryRequests: Array<{
    id: string
    medicine: string
    pharmacy: string
    status: "pending" | "confirmed" | "in-transit" | "delivered"
    estimatedTime: string
  }>
}> => {
  await delay(500)

  return {
    recentSearches: [
      {
        id: "1",
        medicine: "Paracetamol",
        location: "Delhi",
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        medicine: "Aspirin",
        location: "Mumbai",
        timestamp: "1 day ago",
      },
    ],
    deliveryRequests: [
      {
        id: "1",
        medicine: "Paracetamol 500mg",
        pharmacy: "Apollo Pharmacy",
        status: "in-transit",
        estimatedTime: "30 minutes",
      },
    ],
  }
}

export const getPharmacyDashboard = async (): Promise<{
  stats: {
    totalMedicines: number
    lowStockItems: number
    pendingOrders: number
    todayRevenue: number
  }
  inventory: Array<{
    id: string
    medicine: {
      name: string
      activeCompound: string
    }
    quantity: number
    price: number
    expiryDate: string
    lowStock: boolean
  }>
  orders: Array<{
    id: string
    customerName: string
    medicine: string
    quantity: number
    status: "pending" | "confirmed" | "delivered"
    timestamp: string
  }>
}> => {
  await delay(600)

  return {
    stats: {
      totalMedicines: 150,
      lowStockItems: 5,
      pendingOrders: 8,
      todayRevenue: 2500,
    },
    inventory: [
      {
        id: "1",
        medicine: {
          name: "Paracetamol 500mg",
          activeCompound: "Paracetamol",
        },
        quantity: 50,
        price: 25,
        expiryDate: "2024-12-31",
        lowStock: false,
      },
      {
        id: "2",
        medicine: {
          name: "Aspirin 75mg",
          activeCompound: "Aspirin",
        },
        quantity: 8,
        price: 30,
        expiryDate: "2024-10-15",
        lowStock: true,
      },
    ],
    orders: [
      {
        id: "1",
        customerName: "John Doe",
        medicine: "Paracetamol 500mg",
        quantity: 2,
        status: "pending",
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        customerName: "Jane Smith",
        medicine: "Aspirin 75mg",
        quantity: 1,
        status: "confirmed",
        timestamp: "4 hours ago",
      },
    ],
  }
}

export const getAdminDashboard = async (): Promise<{
  users: Array<{
    id: string
    name: string
    email: string
    role: string
    isVerified: boolean
    createdAt: string
  }>
  pharmacies: Array<{
    id: string
    name: string
    email: string
    address: string
    licenseNumber: string
    isVerified: boolean
    createdAt: string
  }>
  analytics: {
    totalUsers: number
    totalPharmacies: number
    totalMedicines: number
    totalOrders: number
    revenueToday: number
    popularMedicines: Array<{ name: string; searches: number }>
  }
}> => {
  await delay(600)

  return {
    users: mockUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: "2024-01-15",
    })),
    pharmacies: mockPharmacies.map((pharmacy) => ({
      id: pharmacy.id,
      name: pharmacy.name,
      email: pharmacy.email,
      address: pharmacy.address,
      licenseNumber: pharmacy.licenseNumber,
      isVerified: pharmacy.isVerified,
      createdAt: "2024-01-10",
    })),
    analytics: {
      totalUsers: mockUsers.filter((u) => u.role === "user").length,
      totalPharmacies: mockPharmacies.length,
      totalMedicines: mockMedicines.length,
      totalOrders: mockOrders.length,
      revenueToday: 45000,
      popularMedicines: [
        { name: "Paracetamol", searches: 1250 },
        { name: "Aspirin", searches: 890 },
        { name: "Ibuprofen", searches: 675 },
        { name: "Amoxicillin", searches: 543 },
        { name: "Omeprazole", searches: 432 },
      ],
    },
  }
}

export const getUserOrders = async (): Promise<{
  orders: Array<{
    id: string
    date: string
    items: string[]
    total: number
    status: string
  }>
}> => {
  await delay(500)

  return {
    orders: [
      {
        id: "ORD-001",
        date: "2024-01-15",
        items: ["Paracetamol 500mg", "Vitamin D"],
        total: 145,
        status: "delivered",
      },
      {
        id: "ORD-002",
        date: "2024-01-14",
        items: ["Aspirin 75mg"],
        total: 30,
        status: "in-transit",
      },
    ],
  }
}

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
