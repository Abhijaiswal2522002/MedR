import { Search, MapPin, Clock, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SearchForm } from "@/components/search-form"
import { Navbar } from "@/components/navbar"
import { CSSReset } from "@/components/css-reset"

export default function HomePage() {
  return (
    <>
      <CSSReset />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar />

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Medicine <span className="text-green-600">Instantly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Search for medicines in nearby pharmacies, check real-time stock availability, and get urgent deliveries
              when you need them most.
            </p>

            <SearchForm />

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Search className="mr-2 h-5 w-5" />
                Find Medicine
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pharmacy/register">Register Pharmacy</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MedRoute?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Location-Based Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find pharmacies near you with real-time distance and availability information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Real-Time Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Check live inventory status and avoid unnecessary trips to pharmacies.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Alternative Medicines</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get suggestions for alternative medicines with the same active compounds.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>Urgent Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Request emergency deliveries for critical medicines when time matters.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join thousands of users who trust MedRoute for their medicine needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600"
                asChild
              >
                <Link href="/pharmacy/register">Register Your Pharmacy</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
