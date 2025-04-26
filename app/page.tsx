"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Shirt, Footprints, Sparkles, Zap, Palette, Wand2, ArrowRight } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  const features = [
    {
      icon: <Wand2 className="h-10 w-10 text-green-500" />,
      title: "AI-Powered Design",
      description:
        "Generate stunning fashion designs with just a text prompt. Our AI understands fashion concepts and trends.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-green-500" />,
      title: "Prompt Enhancement",
      description:
        "Not sure how to describe what you want? Our AI can enhance your simple prompts into detailed design instructions.",
    },
    {
      icon: <Palette className="h-10 w-10 text-green-500" />,
      title: "Design Editing",
      description:
        "Easily modify generated designs with simple text instructions. Change colors, styles, and details instantly.",
    },
    {
      icon: <Zap className="h-10 w-10 text-green-500" />,
      title: "Rapid Prototyping",
      description:
        "Create multiple design variations in minutes instead of days. Perfect for fashion designers and brands.",
    },
  ]

  const testimonials = [
    {
      quote:
        "FashionAI Studio has revolutionized our design process. We can now create and iterate on designs in hours instead of weeks.",
      author: "Sarah Johnson",
      role: "Creative Director, StyleHouse",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      quote:
        "The prompt enhancement feature is incredible. I can start with a simple idea and the AI helps me refine it into something truly unique.",
      author: "Michael Chen",
      role: "Independent Fashion Designer",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      quote:
        "As a small boutique, we couldn't afford a full design team. FashionAI Studio gives us the ability to create custom designs at a fraction of the cost.",
      author: "Emma Rodriguez",
      role: "Owner, Boutique Elegance",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/fashion-store-background.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.h1 className="text-5xl md:text-6xl font-bold mb-6" variants={slideUp}>
              Revolutionize Fashion Design with AI
            </motion.h1>
            <motion.p className="text-xl text-gray-300 mb-10 max-w-2xl" variants={slideUp}>
              Create stunning outfit and shoe designs in seconds with our AI-powered design studio. From concept to
              visualization in one simple step.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={slideUp}>
              <Link
                href="/outfits/create"
                className="btn-primary bg-gradient-green px-8 py-3 rounded-md text-lg font-medium flex items-center justify-center"
              >
                <Shirt className="h-5 w-5 mr-2" />
                Design Outfit
              </Link>
              <Link
                href="/shoes/create"
                className="btn-primary bg-black border border-green-600 px-8 py-3 rounded-md text-lg font-medium flex items-center justify-center hover:bg-green-900/20 transition-colors"
              >
                <Footprints className="h-5 w-5 mr-2" />
                Design Shoes
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform offers everything you need to bring your fashion ideas to life.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div key={index} className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the range of AI-powered fashion design services we offer.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="bg-black/50 rounded-lg overflow-hidden" variants={slideUp}>
              <div className="h-64 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold mb-2">Outfit Design</h3>
                  <p className="text-gray-300 mb-4">
                    Create complete outfits from casual wear to haute couture with simple text prompts.
                  </p>
                  <Link
                    href="/outfits/create"
                    className="flex items-center text-green-500 hover:text-green-400 transition-colors"
                  >
                    Try it now <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-black/50 rounded-lg overflow-hidden" variants={slideUp}>
              <div className="h-64 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold mb-2">Shoe Design</h3>
                  <p className="text-gray-300 mb-4">
                    Design footwear ranging from sneakers to formal shoes with detailed customization.
                  </p>
                  <Link
                    href="/shoes/create"
                    className="flex items-center text-green-500 hover:text-green-400 transition-colors"
                  >
                    Try it now <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hear from fashion designers and brands who have transformed their design process with our platform.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
                <div className="mb-6">
                  <svg className="h-8 w-8 text-green-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-300 italic mb-6">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Design Process?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of fashion designers and brands who are already using FashionAI Studio to create stunning
              designs in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="btn-primary bg-gradient-green px-8 py-3 rounded-md text-lg font-medium flex items-center justify-center"
              >
                Get Started Now
              </Link>
              <Link
                href="/contact"
                className="btn-primary bg-black border border-green-600 px-8 py-3 rounded-md text-lg font-medium flex items-center justify-center hover:bg-green-900/20 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
