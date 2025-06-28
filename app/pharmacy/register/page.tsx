import { Navbar } from "@/components/navbar"
import { PharmacyRegisterForm } from "@/components/pharmacy-register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PharmacyRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Register Your Pharmacy</CardTitle>
              <CardDescription>
                Join MedRoute to reach more customers and provide better healthcare services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PharmacyRegisterForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
