"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-gradient-black border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center md:hidden">
            <Link href="/" className="flex items-center text-white font-bold text-xl">
              <Sparkles className="h-6 w-6 mr-2 text-green-500" />
              <span>FashionAI Studio</span>
            </Link>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center mr-2 overflow-hidden">
                  {user?.image ? (
                    <img
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <span>{user?.name}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn-primary bg-gradient-green px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
