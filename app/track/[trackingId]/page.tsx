import { Navbar } from "@/components/navbar"
import { OrderTracking } from "@/components/order-tracking"

interface Props {
  params: Promise<{ trackingId: string }>
}

export default async function TrackOrderPage({ params }: Props) {
  const { trackingId } = await params

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <OrderTracking trackingId={trackingId} />
    </div>
  )
}
