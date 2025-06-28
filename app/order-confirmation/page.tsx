import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmation />
      </Suspense>
    </div>
  )
}
