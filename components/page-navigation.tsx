"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

type NavigationLink = {
  name: string
  href: string
}

interface PageNavigationProps {
  links: NavigationLink[]
  title: string
}

export function PageNavigation({ links, title }: PageNavigationProps) {
  const pathname = usePathname()

  return (
    <motion.div
      className="bg-gradient-black card-gradient p-4 rounded-lg mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-wrap items-center text-sm">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-600" />
        {links.map((link, index) => (
          <div key={link.href} className="flex items-center">
            <Link
              href={link.href}
              className={`${
                pathname === link.href ? "text-green-500" : "text-gray-400 hover:text-white"
              } transition-colors`}
            >
              {link.name}
            </Link>
            {index < links.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-600" />}
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold mt-2">{title}</h1>
    </motion.div>
  )
}
