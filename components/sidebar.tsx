"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shirt,
  Footprints,
  Home,
  Info,
  Mail,
  Menu,
  X,
  PlusCircle,
  Sparkles,
  ChevronRight,
  PenTool,
  User,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [outfitSubmenu, setOutfitSubmenu] = useState(false)
  const [shoeSubmenu, setShoeSubmenu] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => setIsOpen(false)

  const mainNavItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "About Us", href: "/about", icon: <Info className="h-5 w-5" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="h-5 w-5" /> },
  ]

  const resetApp = () => {
    // Reset the app state
    window.location.href = "/"
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-black/80 text-white md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 z-50 h-full w-64 bg-gradient-black border-r border-gray-800 shadow-xl md:translate-x-0"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <Link href="/" className="flex items-center" onClick={closeSidebar}>
              <Sparkles className="h-6 w-6 mr-2 text-green-500" />
              <span className="text-xl font-bold">FashionAI Studio</span>
            </Link>
          </div>

          {/* User profile section */}
          <div className="p-4 border-b border-gray-800">
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center mr-3 overflow-hidden">
                  {user?.image ? (
                    <img
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <Link
                    href="/profile"
                    className="text-sm text-green-500 hover:text-green-400 transition-colors"
                    onClick={closeSidebar}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-primary bg-gradient-green w-full py-2 rounded-md text-sm font-medium flex items-center justify-center"
                onClick={closeSidebar}
              >
                <User className="h-4 w-4 mr-2" />
                Log In
              </Link>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {mainNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-green-700/30 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={closeSidebar}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}

              {/* Outfit submenu */}
              <li>
                <button
                  onClick={() => setOutfitSubmenu(!outfitSubmenu)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <Shirt className="h-5 w-5" />
                    <span className="ml-3">Outfits</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${outfitSubmenu ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {outfitSubmenu && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-10 space-y-1"
                    >
                      <li>
                        <Link
                          href="/outfits/create"
                          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                            pathname === "/outfits/create"
                              ? "bg-green-700/30 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                          onClick={closeSidebar}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          <span>Create</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/outfits/edit"
                          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                            pathname === "/outfits/edit"
                              ? "bg-green-700/30 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                          onClick={closeSidebar}
                        >
                          <PenTool className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Shoes submenu */}
              <li>
                <button
                  onClick={() => setShoeSubmenu(!shoeSubmenu)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <Footprints className="h-5 w-5" />
                    <span className="ml-3">Shoes</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${shoeSubmenu ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {shoeSubmenu && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-10 space-y-1"
                    >
                      <li>
                        <Link
                          href="/shoes/create"
                          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                            pathname === "/shoes/create"
                              ? "bg-green-700/30 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                          onClick={closeSidebar}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          <span>Create</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shoes/edit"
                          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                            pathname === "/shoes/edit"
                              ? "bg-green-700/30 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                          onClick={closeSidebar}
                        >
                          <PenTool className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={resetApp}
              className="flex items-center justify-center w-full px-4 py-2 bg-gradient-green rounded-md text-white hover:opacity-90 transition-opacity"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              <span>New Chat</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
