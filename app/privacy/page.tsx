import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: January 2024</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>MedRoute Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                  <p className="text-gray-700">
                    We collect information you provide directly to us, such as when you create an account, make a
                    purchase, or contact us for support.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                  <p className="text-gray-700">
                    We use the information we collect to provide, maintain, and improve our services, process
                    transactions, and communicate with you.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
                  <p className="text-gray-700">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your
                    consent, except as described in this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
                  <p className="text-gray-700">
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
                  <p className="text-gray-700">
                    You have the right to access, update, or delete your personal information. You may also opt out of
                    certain communications from us.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about this Privacy Policy, please contact us at privacy@medroute.com
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
