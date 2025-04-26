import Link from "next/link"
import { Sparkles, Github, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-green-500" />
              <span className="text-xl font-bold">FashionAI Studio</span>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing fashion design with AI-powered image generation. Create stunning outfits and shoes with
              just a text prompt.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/outfits/create" className="text-gray-400 hover:text-white transition-colors">
                  Outfit Generation
                </Link>
              </li>
              <li>
                <Link href="/shoes/create" className="text-gray-400 hover:text-white transition-colors">
                  Shoe Design
                </Link>
              </li>
              <li>
                <Link href="/outfits/edit" className="text-gray-400 hover:text-white transition-colors">
                  Design Editing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@fashionaistudio.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Email: info@fashionaistudio.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FashionAI Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
