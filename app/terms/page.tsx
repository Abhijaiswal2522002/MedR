import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
            <p className="text-gray-600 mt-2">Last updated: January 2024</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>MedRoute Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                  <p className="text-gray-700">
                    By accessing and using MedRoute, you accept and agree to be bound by the terms and provision of this
                    agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
                  <p className="text-gray-700">
                    Permission is granted to temporarily download one copy of MedRoute per device for personal,
                    non-commercial transitory viewing only.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">3. Medical Disclaimer</h2>
                  <p className="text-gray-700">
                    MedRoute is not a substitute for professional medical advice, diagnosis, or treatment. Always seek
                    the advice of your physician or other qualified health provider.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Pharmacy Verification</h2>
                  <p className="text-gray-700">
                    All pharmacies on our platform are verified and licensed. However, users should verify prescriptions
                    and medicine authenticity.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Privacy Policy</h2>
                  <p className="text-gray-700">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                    the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Contact Information</h2>
                  <p className="text-gray-700">
                    If you have any questions about these Terms and Conditions, please contact us at legal@medroute.com
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
