import { Navbar } from "@/components/navbar"
import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <UserProfile />
    </div>
  )
}
