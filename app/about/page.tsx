"use client"

import { motion } from "framer-motion"
import { Users, Award, Clock, Lightbulb } from "lucide-react"

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

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former fashion designer with 15 years of experience who saw the potential of AI in revolutionizing the industry.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sophia Chen",
      role: "Chief AI Officer",
      bio: "PhD in Computer Vision with expertise in generative models and a passion for fashion technology.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Marcus Williams",
      role: "Head of Design",
      bio: "Award-winning fashion designer who bridges the gap between traditional design and AI-generated concepts.",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
      name: "Olivia Rodriguez",
      role: "UX Director",
      bio: "Specializes in creating intuitive interfaces that make advanced AI technology accessible to all users.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "FashionAI Studio was founded with a vision to democratize fashion design through AI technology.",
    },
    {
      year: "2021",
      title: "First AI Model",
      description: "Launched our first AI model capable of generating basic fashion designs from text descriptions.",
    },
    {
      year: "2022",
      title: "Series A Funding",
      description: "Secured $5M in Series A funding to expand our team and enhance our AI capabilities.",
    },
    {
      year: "2023",
      title: "Advanced Features",
      description: "Introduced prompt enhancement and design editing features, dramatically improving user experience.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to serve clients in over 50 countries and partnered with major fashion brands.",
    },
  ]

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
              About FashionAI Studio
            </motion.h1>
            <motion.p className="text-xl text-gray-300 mb-10 max-w-3xl" variants={slideUp}>
              We're on a mission to revolutionize fashion design by making AI technology accessible to designers,
              brands, and creative individuals around the world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                FashionAI Studio was born from a simple observation: the fashion design process was stuck in the past,
                relying on time-consuming sketches and prototypes that limited creativity and innovation.
              </p>
              <p className="text-gray-300 mb-4">
                Our founder, Alex Johnson, a fashion designer with 15 years of experience, saw the potential of AI to
                transform this process. By combining cutting-edge AI technology with fashion expertise, we created a
                platform that allows anyone to generate professional-quality fashion designs in seconds.
              </p>
              <p className="text-gray-300">
                Since our founding in 2020, we've grown from a small startup to a global company serving thousands of
                designers, brands, and creative individuals. Our mission remains the same: to democratize fashion design
                and empower creativity through technology.
              </p>
            </motion.div>
            <motion.div
              className="relative h-96 rounded-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
            >
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=600')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-xl font-bold">"We believe AI is not replacing creativity, but enhancing it."</p>
                <p className="text-gray-300">- Alex Johnson, Founder & CEO</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at FashionAI Studio.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
              <Lightbulb className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-300">
                We constantly push the boundaries of what's possible with AI and fashion design, never settling for the
                status quo.
              </p>
            </motion.div>

            <motion.div className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
              <Users className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-gray-300">
                We believe powerful design tools should be accessible to everyone, regardless of technical expertise or
                resources.
              </p>
            </motion.div>

            <motion.div className="bg-gradient-black card-gradient p-6 rounded-lg" variants={slideUp}>
              <Award className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-300">
                We're committed to delivering the highest quality AI-generated designs that meet professional standards.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gradient-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The talented individuals behind FashionAI Studio who make our vision a reality.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gradient-black card-gradient p-6 rounded-lg text-center"
                variants={slideUp}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-green-500 mb-4">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize fashion design with AI.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-800"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } md:flex-row-reverse`}
                  variants={slideUp}
                >
                  <div className="flex-1 md:pr-12 md:pl-0 pl-12">
                    <div className="bg-gradient-black card-gradient p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-green-700 flex items-center justify-center z-10">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex-1 md:text-right md:pl-12 hidden md:block">
                    <span className="text-2xl font-bold text-green-500">{milestone.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={slideUp}>
              <p className="text-5xl font-bold text-green-500 mb-2">50K+</p>
              <p className="text-xl">Active Users</p>
            </motion.div>
            <motion.div variants={slideUp}>
              <p className="text-5xl font-bold text-green-500 mb-2">2M+</p>
              <p className="text-xl">Designs Generated</p>
            </motion.div>
            <motion.div variants={slideUp}>
              <p className="text-5xl font-bold text-green-500 mb-2">50+</p>
              <p className="text-xl">Countries</p>
            </motion.div>
            <motion.div variants={slideUp}>
              <p className="text-5xl font-bold text-green-500 mb-2">100+</p>
              <p className="text-xl">Team Members</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
