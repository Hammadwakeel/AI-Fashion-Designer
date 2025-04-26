"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate success
    setIsSubmitting(false)
    setSubmitStatus("success")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.h1 className="text-5xl font-bold mb-6" variants={slideUp}>
              Contact Us
            </motion.h1>
            <motion.p className="text-xl text-gray-300 mb-10 max-w-3xl" variants={slideUp}>
              Have questions about FashionAI Studio? We're here to help. Reach out to our team and we'll get back to you
              as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-300 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-300">info@fashionaistudio.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Office</h3>
                    <p className="text-gray-300">
                      123 Fashion Avenue
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}>
              <div className="bg-gradient-black card-gradient p-8 rounded-lg">
                {submitStatus === "success" && (
                  <div className="bg-green-900/30 border border-green-700 text-green-200 px-4 py-3 rounded mb-6">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
                    There was an error sending your message. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary bg-gradient-green w-full py-3 rounded-md flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <Send className="h-5 w-5 mr-2" />
                    )}
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="rounded-lg overflow-hidden h-96 bg-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-full h-full bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center flex items-center justify-center">
              <div className="bg-black/70 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Our Location</h3>
                <p className="text-gray-300">123 Fashion Avenue, San Francisco, CA 94103</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about FashionAI Studio.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <motion.div className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
              <h3 className="text-xl font-bold mb-2">How does the AI generate fashion designs?</h3>
              <p className="text-gray-300">
                Our AI uses advanced generative models trained on millions of fashion images and designs. It understands
                fashion concepts, styles, and trends, allowing it to create unique designs based on text descriptions.
              </p>
            </motion.div>

            <motion.div className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
              <h3 className="text-xl font-bold mb-2">Can I use the generated designs commercially?</h3>
              <p className="text-gray-300">
                Yes, all designs generated on our platform are royalty-free and can be used for commercial purposes. You
                own the rights to any designs you create using our service.
              </p>
            </motion.div>

            <motion.div className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
              <h3 className="text-xl font-bold mb-2">Do you offer enterprise solutions?</h3>
              <p className="text-gray-300">
                Yes, we offer custom enterprise solutions for fashion brands and design studios. Contact our sales team
                to discuss your specific needs and how we can tailor our platform for your organization.
              </p>
            </motion.div>

            <motion.div className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
              <h3 className="text-xl font-bold mb-2">How accurate are the AI-generated designs?</h3>
              <p className="text-gray-300">
                Our AI produces high-quality, realistic designs that follow fashion principles. While the AI excels at
                creating visually appealing concepts, professional designers may want to refine certain details for
                production.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
