import { Navbar } from "@/components/navbar"
import { PaymentForm } from "@/components/payment-form"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PaymentForm />
    </div>
  )
}
