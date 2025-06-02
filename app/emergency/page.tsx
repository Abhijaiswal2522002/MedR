import { Navbar } from "@/components/navbar"
import { EmergencyDelivery } from "@/components/emergency-delivery"

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <EmergencyDelivery />
    </div>
  )
}
