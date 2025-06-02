import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, MapPin, Clock, Shield, Truck, Award, Target, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About <span className="text-green-600">MedRoute</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're revolutionizing healthcare accessibility by connecting patients with nearby pharmacies, ensuring that
            life-saving medicines are just a click away, anytime, anywhere.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="mr-3 h-8 w-8 text-green-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To bridge the gap between patients and pharmacies by providing a seamless platform that ensures medicine
                availability, real-time stock updates, and emergency delivery services. We believe healthcare should be
                accessible to everyone, everywhere.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Heart className="mr-3 h-8 w-8 text-red-500" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To become the leading healthcare technology platform in India, where no patient has to worry about
                medicine availability. We envision a future where emergency medicines reach patients within minutes, not
                hours.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose MedRoute?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Location-Based Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find pharmacies near you with precise location mapping and real-time distance calculations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Real-Time Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Check live inventory status across multiple pharmacies to avoid unnecessary trips.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Truck className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Emergency Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get critical medicines delivered within 30 minutes during medical emergencies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Verified Pharmacies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All partner pharmacies are licensed and verified to ensure medicine authenticity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Alternative Medicines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get suggestions for alternative medicines with the same active compounds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rigorous quality checks and temperature-controlled delivery for sensitive medicines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-green-600 text-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Partner Pharmacies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Medicines Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-green-100">Cities Covered</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How MedRoute Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Medicine</h3>
              <p className="text-gray-600">
                Enter the medicine name and your location to find nearby pharmacies with stock availability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Pharmacy</h3>
              <p className="text-gray-600">
                Compare prices, check availability, and select the best pharmacy based on distance and ratings.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Delivered</h3>
              <p className="text-gray-600">
                Place your order and get medicines delivered to your doorstep or pick them up from the pharmacy.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Patient First</h3>
                <p className="text-gray-600">
                  Every decision we make prioritizes patient health and accessibility to essential medicines.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-gray-600">
                  Clear pricing, honest communication, and transparent processes in all our interactions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Continuously improving our technology to better serve patients and pharmacy partners.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                <p className="text-gray-600">
                  Dependable service that patients can trust, especially during critical health situations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            MedRoute is built by a passionate team of healthcare professionals, technology experts, and logistics
            specialists who understand the critical importance of medicine accessibility.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="text-lg py-2 px-4">
              Healthcare Experts
            </Badge>
            <Badge variant="outline" className="text-lg py-2 px-4">
              Tech Innovators
            </Badge>
            <Badge variant="outline" className="text-lg py-2 px-4">
              Logistics Specialists
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
