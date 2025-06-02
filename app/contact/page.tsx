import { Navbar } from "@/components/navbar"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, MessageSquare, AlertTriangle, Users } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Have questions about MedRoute? Need help with an order? Our support team is here to help you 24/7.
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-xl font-bold text-red-800">Medical Emergency?</h2>
          </div>
          <p className="text-red-700 mb-4">
            For urgent medicine delivery or medical emergencies, call our 24/7 emergency hotline:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Phone className="mr-2 h-5 w-5" />
              Emergency: +91 911-MEDROUTE
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <MessageSquare className="mr-2 h-5 w-5" />
              Emergency Chat
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-green-600" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Customer Support</h4>
                  <p className="text-gray-600">+91 1800-MEDROUTE</p>
                  <p className="text-sm text-gray-500">Mon-Sun: 6 AM - 12 AM</p>
                </div>
                <div>
                  <h4 className="font-semibold">Pharmacy Partners</h4>
                  <p className="text-gray-600">+91 1800-PHARMACY</p>
                  <p className="text-sm text-gray-500">Mon-Fri: 9 AM - 6 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-blue-600" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold">General Inquiries</h4>
                  <p className="text-gray-600">support@medroute.com</p>
                </div>
                <div>
                  <h4 className="font-semibold">Partnership</h4>
                  <p className="text-gray-600">partners@medroute.com</p>
                </div>
                <div>
                  <h4 className="font-semibold">Technical Issues</h4>
                  <p className="text-gray-600">tech@medroute.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-purple-600" />
                  Office Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">MedRoute Technologies Pvt. Ltd.</p>
                  <p className="text-gray-600">
                    Tower A, 5th Floor
                    <br />
                    Cyber City, Sector 24
                    <br />
                    Gurugram, Haryana 122002
                    <br />
                    India
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-orange-600" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Emergency Support</span>
                    <span className="font-semibold text-green-600">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General Support</span>
                    <span>6 AM - 12 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical Support</span>
                    <span>9 AM - 9 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Partnership Queries</span>
                    <span>9 AM - 6 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageSquare className="mr-3 h-6 w-6 text-green-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>How fast is emergency delivery?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our emergency delivery service aims to deliver critical medicines within 30-45 minutes in metro cities
                  and 1-2 hours in other areas, depending on availability and location.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Are the medicines authentic?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, all our partner pharmacies are licensed and verified. We ensure that all medicines are sourced
                  from authorized distributors and stored under proper conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major payment methods including credit/debit cards, UPI, net banking, digital wallets,
                  and cash on delivery for eligible orders.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How do I track my order?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  After placing an order, you'll receive a tracking ID via SMS and email. You can track your order in
                  real-time using this ID on our website or mobile app.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I cancel or modify my order?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Orders can be cancelled or modified within 5 minutes of placement. After that, please contact our
                  support team for assistance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do you deliver prescription medicines?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we deliver prescription medicines. You'll need to upload a valid prescription during checkout.
                  Our pharmacists verify all prescriptions before dispensing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Channels */}
        <div className="mt-16 bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Multiple Ways to Reach Us</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600">Speak directly with our support team</p>
            </div>

            <div>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">Get instant help through our chat system</p>
            </div>

            <div>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">Send us detailed queries via email</p>
            </div>

            <div>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600">Join our community forums for tips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
