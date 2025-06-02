"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle } from "lucide-react"

export function PharmacyVerificationNotice() {
  const { user } = useAuth()

  if (!user || user.role !== "pharmacy") {
    return null
  }

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-800">
          {user.isVerified ? (
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
          ) : (
            <Clock className="mr-2 h-5 w-5 text-orange-600" />
          )}
          Pharmacy Verification Status
        </CardTitle>
        <CardDescription>
          {user.isVerified ? (
            <Badge className="bg-green-100 text-green-800">Verified</Badge>
          ) : (
            <Badge className="bg-orange-100 text-orange-800">Pending Verification</Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user.isVerified ? (
          <p className="text-green-700">
            Your pharmacy has been verified and approved. You can now manage your inventory and accept orders.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
              <div className="text-orange-700">
                <p className="font-medium">Your pharmacy registration is under review.</p>
                <p className="text-sm">
                  Our team is verifying your pharmacy license and details. This process typically takes 24-48 hours.
                  You'll receive an email notification once your pharmacy is approved.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-orange-100 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>What happens next?</strong>
                <br />• Our team will verify your license number
                <br />• We'll confirm your pharmacy address
                <br />• Once approved, you can start managing inventory
                <br />• You'll be able to accept and fulfill orders
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
