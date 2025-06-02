import { Navbar } from "@/components/navbar"
import { PharmacyDashboard } from "@/components/pharmacy-dashboard"

export default function PharmacyDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PharmacyDashboard />
    </div>
  )
}
