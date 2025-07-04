export interface Medicine {
  id: string
  name: string
  activeCompound: string
  description: string
  dosage: string
  manufacturer: string
  price: number
  category: string
  sideEffects: string[]
  contraindications: string[]
  image: string
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  isOpen: boolean
  distance: number
  latitude: number
  longitude: number
  rating: number
  medicines: {
    name: string
    price: number
    inStock: boolean
    quantity: number
  }[]
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  type: "user" | "pharmacy" | "admin"
}

export interface Order {
  id: string
  userId: string
  pharmacyId: string
  medicines: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  trackingId: string
  createdAt: string
}

export const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    activeCompound: "Paracetamol",
    description: "Pain reliever and fever reducer",
    dosage: "500mg",
    manufacturer: "Generic Pharma",
    price: 25,
    category: "Pain Relief",
    sideEffects: ["Nausea", "Dizziness", "Stomach upset"],
    contraindications: ["Liver disease", "Alcohol dependency"],
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Ibuprofen",
    activeCompound: "Ibuprofen",
    description: "Anti-inflammatory pain reliever",
    dosage: "400mg",
    manufacturer: "MedCorp",
    price: 35,
    category: "Pain Relief",
    sideEffects: ["Stomach irritation", "Headache"],
    contraindications: ["Kidney disease", "Heart conditions"],
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Aspirin",
    activeCompound: "Acetylsalicylic acid",
    description: "Pain reliever and blood thinner",
    dosage: "325mg",
    manufacturer: "PharmaCorp",
    price: 20,
    category: "Pain Relief",
    sideEffects: ["Stomach bleeding", "Ringing in ears"],
    contraindications: ["Bleeding disorders", "Children under 16"],
    image: "/placeholder.svg?height=300&width=300",
  },
]

export const mockPharmacies: Pharmacy[] = [
  {
    id: "1",
    name: "Apollo Pharmacy",
    address: "123 Main Street, Delhi",
    phone: "+91-9876543210",
    isOpen: true,
    distance: 0.8,
    latitude: 28.6139,
    longitude: 77.209,
    rating: 4.5,
    medicines: [
      { name: "Paracetamol", price: 25, inStock: true, quantity: 50 },
      { name: "Ibuprofen", price: 35, inStock: true, quantity: 30 },
    ],
  },
  {
    id: "2",
    name: "MedPlus Pharmacy",
    address: "456 Park Avenue, Delhi",
    phone: "+91-9876543211",
    isOpen: true,
    distance: 1.2,
    latitude: 28.6129,
    longitude: 77.2295,
    rating: 4.2,
    medicines: [
      { name: "Paracetamol", price: 30, inStock: true, quantity: 25 },
      { name: "Aspirin", price: 20, inStock: true, quantity: 40 },
    ],
  },
  {
    id: "3",
    name: "Guardian Pharmacy",
    address: "789 Health Street, Delhi",
    phone: "+91-9876543212",
    isOpen: false,
    distance: 2.1,
    latitude: 28.6059,
    longitude: 77.2177,
    rating: 4.0,
    medicines: [
      { name: "Ibuprofen", price: 32, inStock: true, quantity: 20 },
      { name: "Aspirin", price: 22, inStock: false, quantity: 0 },
    ],
  },
]

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543213",
    address: "123 User Street, Delhi",
    type: "user",
  },
  {
    id: "2",
    name: "Apollo Admin",
    email: "admin@apollo.com",
    phone: "+91-9876543210",
    address: "123 Main Street, Delhi",
    type: "pharmacy",
  },
]

export const mockOrders: Order[] = [
  {
    id: "1",
    userId: "1",
    pharmacyId: "1",
    medicines: [{ name: "Paracetamol", quantity: 2, price: 25 }],
    total: 50,
    status: "delivered",
    trackingId: "TRK001",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    pharmacyId: "2",
    medicines: [
      { name: "Ibuprofen", quantity: 1, price: 35 },
      { name: "Aspirin", quantity: 3, price: 20 },
    ],
    total: 95,
    status: "pending",
    trackingId: "TRK002",
    createdAt: "2024-01-16T14:20:00Z",
  },
]
