import { Navbar } from "@/components/navbar"
import { PharmacyMap } from "@/components/pharmacy-map"

export default function MapsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PharmacyMap />
    </div>
  )
}
