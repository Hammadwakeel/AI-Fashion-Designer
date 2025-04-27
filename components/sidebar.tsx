"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

export function Sidebar() {
  const pathname = usePathname()

  // Pages where sidebar should not be shown
  const hideSidebarPaths = ["/home", "/login", "/signup"]

  // Don't render sidebar on specified pages
  if (hideSidebarPaths.includes(pathname)) {
    return null
  }

  const sidebarItems = []

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-black border-r border-gray-800 p-4">
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
              item.active ? "bg-green-700/30 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center px-4 py-3 rounded-md text-sm font-medium bg-gradient-green text-white mt-4"
          onClick={() => {
            // Reset form state or redirect to a new page
            window.location.href = pathname
          }}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Chat
        </motion.button>
      </div>
    </div>
  )
}
