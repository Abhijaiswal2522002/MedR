export interface Medicine {
  id: string
  name: string
  genericName: string
  category: string
  manufacturer: string
  price: number
  description: string
  sideEffects: string[]
  dosage: string
  activeCompound: string
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  email: string
  licenseNumber: string
  isVerified: boolean
  isOpen: boolean
  rating: number
  distance: number
  coordinates: [number, number] // [longitude, latitude]
  medicines: {
    medicineId: string
    price: number
    quantity: number
    inStock: boolean
  }[]
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  role: "user" | "pharmacy" | "admin"
  isVerified: boolean
}

export interface Order {
  id: string
  userId: string
  pharmacyId: string
  medicines: {
    medicineId: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  status: "pending" | "confirmed" | "in-transit" | "delivered" | "cancelled"
  deliveryAddress: string
  orderDate: string
  estimatedDelivery: string
  trackingId: string
}

export const mockMedicines: Medicine[] = [
  {
    id: "med-1",
    name: "Paracetamol 500mg",
    genericName: "Paracetamol",
    category: "Pain Relief",
    manufacturer: "Generic Pharma",
    price: 25,
    description: "Used for pain relief and fever reduction",
    sideEffects: ["Nausea", "Stomach upset"],
    dosage: "1-2 tablets every 4-6 hours",
    activeCompound: "Paracetamol",
  },
  {
    id: "med-2",
    name: "Aspirin 75mg",
    genericName: "Aspirin",
    category: "Pain Relief",
    manufacturer: "Bayer",
    price: 30,
    description: "Low-dose aspirin for heart protection",
    sideEffects: ["Stomach irritation", "Bleeding"],
    dosage: "1 tablet daily",
    activeCompound: "Acetylsalicylic acid",
  },
  {
    id: "med-3",
    name: "Ibuprofen 400mg",
    genericName: "Ibuprofen",
    category: "Pain Relief",
    manufacturer: "Advil",
    price: 45,
    description: "Anti-inflammatory pain reliever",
    sideEffects: ["Stomach upset", "Dizziness"],
    dosage: "1 tablet every 6-8 hours",
    activeCompound: "Ibuprofen",
  },
  {
    id: "med-4",
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin",
    category: "Antibiotics",
    manufacturer: "GSK",
    price: 120,
    description: "Broad-spectrum antibiotic",
    sideEffects: ["Diarrhea", "Nausea", "Rash"],
    dosage: "1 capsule 3 times daily",
    activeCompound: "Amoxicillin",
  },
  {
    id: "med-5",
    name: "Omeprazole 20mg",
    genericName: "Omeprazole",
    category: "Digestive Health",
    manufacturer: "AstraZeneca",
    price: 85,
    description: "Proton pump inhibitor for acid reflux",
    sideEffects: ["Headache", "Diarrhea"],
    dosage: "1 capsule daily before breakfast",
    activeCompound: "Omeprazole",
  },
]

export const mockPharmacies: Pharmacy[] = [
  {
    id: "pharmacy-1",
    name: "Apollo Pharmacy",
    address: "123 Main Street, Connaught Place, New Delhi",
    phone: "+91-9876543210",
    email: "apollo@example.com",
    licenseNumber: "DL-PHARM-001",
    isVerified: true,
    isOpen: true,
    rating: 4.5,
    distance: 0.8,
    coordinates: [77.2167, 28.6333],
    medicines: [
      { medicineId: "med-1", price: 25, quantity: 50, inStock: true },
      { medicineId: "med-2", price: 30, quantity: 25, inStock: true },
      { medicineId: "med-3", price: 45, quantity: 15, inStock: true },
    ],
  },
  {
    id: "pharmacy-2",
    name: "MedPlus Pharmacy",
    address: "456 Park Avenue, Karol Bagh, New Delhi",
    phone: "+91-9876543211",
    email: "medplus@example.com",
    licenseNumber: "DL-PHARM-002",
    isVerified: true,
    isOpen: true,
    rating: 4.2,
    distance: 1.2,
    coordinates: [77.195, 28.6519],
    medicines: [
      { medicineId: "med-1", price: 28, quantity: 30, inStock: true },
      { medicineId: "med-4", price: 120, quantity: 10, inStock: true },
      { medicineId: "med-5", price: 85, quantity: 20, inStock: true },
    ],
  },
  {
    id: "pharmacy-3",
    name: "Guardian Pharmacy",
    address: "789 Health Street, Lajpat Nagar, New Delhi",
    phone: "+91-9876543212",
    email: "guardian@example.com",
    licenseNumber: "DL-PHARM-003",
    isVerified: true,
    isOpen: false,
    rating: 4.0,
    distance: 2.1,
    coordinates: [77.2431, 28.5675],
    medicines: [
      { medicineId: "med-2", price: 32, quantity: 40, inStock: true },
      { medicineId: "med-3", price: 42, quantity: 25, inStock: true },
      { medicineId: "med-5", price: 80, quantity: 15, inStock: true },
    ],
  },
  {
    id: "pharmacy-4",
    name: "HealthFirst Pharmacy",
    address: "321 Wellness Road, Rohini, New Delhi",
    phone: "+91-9876543213",
    email: "healthfirst@example.com",
    licenseNumber: "DL-PHARM-004",
    isVerified: false,
    isOpen: true,
    rating: 3.8,
    distance: 3.5,
    coordinates: [77.1025, 28.7041],
    medicines: [
      { medicineId: "med-1", price: 24, quantity: 60, inStock: true },
      { medicineId: "med-4", price: 115, quantity: 8, inStock: true },
    ],
  },
]

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543214",
    address: "123 User Street, Delhi",
    role: "user",
    isVerified: true,
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91-9876543215",
    address: "456 Customer Avenue, Delhi",
    role: "user",
    isVerified: true,
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@medroute.com",
    phone: "+91-9876543216",
    address: "789 Admin Plaza, Delhi",
    role: "admin",
    isVerified: true,
  },
]

export const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    pharmacyId: "pharmacy-1",
    medicines: [
      { medicineId: "med-1", quantity: 2, price: 25 },
      { medicineId: "med-2", quantity: 1, price: 30 },
    ],
    totalAmount: 80,
    status: "delivered",
    deliveryAddress: "123 User Street, Delhi",
    orderDate: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-15T14:30:00Z",
    trackingId: "TRK-001",
  },
  {
    id: "order-2",
    userId: "user-1",
    pharmacyId: "pharmacy-2",
    medicines: [{ medicineId: "med-4", quantity: 1, price: 120 }],
    totalAmount: 120,
    status: "in-transit",
    deliveryAddress: "123 User Street, Delhi",
    orderDate: "2024-01-16T09:15:00Z",
    estimatedDelivery: "2024-01-16T13:15:00Z",
    trackingId: "TRK-002",
  },
]
