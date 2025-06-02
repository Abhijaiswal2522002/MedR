import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MedicineDetails } from "@/components/medicine-details"
import { AlternativeMedicines } from "@/components/alternative-medicines"
import { NearbyPharmacies } from "@/components/nearby-pharmacies"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function MedicineDetailsPage({ params }: Props) {
  const { slug } = await params

  // Fetch medicine details
  const medicine = await getMedicineBySlug(slug)

  if (!medicine) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MedicineDetails medicine={medicine} />
            <AlternativeMedicines compound={medicine.activeCompound} />
          </div>

          <div className="lg:col-span-1">
            <NearbyPharmacies medicineId={medicine.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

async function getMedicineBySlug(slug: string) {
  // This would typically fetch from your database
  return {
    id: "1",
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    activeCompound: "Paracetamol",
    description: "Pain reliever and fever reducer",
    dosage: "500mg",
    manufacturer: "Generic Pharma",
    price: 25,
    category: "Pain Relief",
    sideEffects: ["Nausea", "Dizziness", "Stomach upset"],
    contraindications: ["Liver disease", "Alcohol dependency"],
    image: "/placeholder.svg?height=300&width=300",
  }
}
