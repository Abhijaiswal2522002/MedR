import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface Medicine {
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

interface Props {
  medicine: Medicine
}

export function MedicineDetails({ medicine }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image
              src={medicine.image || "/placeholder.svg"}
              alt={medicine.name}
              width={200}
              height={200}
              className="rounded-lg border"
            />
          </div>

          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{medicine.name}</CardTitle>
            <p className="text-gray-600 mb-4">{medicine.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Active Compound:</span>
                <p>{medicine.activeCompound}</p>
              </div>
              <div>
                <span className="font-medium">Dosage:</span>
                <p>{medicine.dosage}</p>
              </div>
              <div>
                <span className="font-medium">Manufacturer:</span>
                <p>{medicine.manufacturer}</p>
              </div>
              <div>
                <span className="font-medium">Category:</span>
                <Badge variant="secondary">{medicine.category}</Badge>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-2xl font-bold text-green-600">₹{medicine.price}</span>
              <span className="text-gray-500 ml-2">per strip</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Separator />

        <div>
          <h3 className="font-semibold mb-2">Side Effects</h3>
          <div className="flex flex-wrap gap-2">
            {medicine.sideEffects.map((effect, index) => (
              <Badge key={index} variant="outline" className="text-orange-600">
                {effect}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contraindications</h3>
          <div className="flex flex-wrap gap-2">
            {medicine.contraindications.map((condition, index) => (
              <Badge key={index} variant="outline" className="text-red-600">
                {condition}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
