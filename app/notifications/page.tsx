import { Navbar } from "@/components/navbar"
import { NotificationCenter } from "@/components/notification-center"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <NotificationCenter />
    </div>
  )
}
