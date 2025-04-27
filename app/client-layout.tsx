"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { AuthProvider } from "@/context/auth-context"
import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideSidebarPaths = ["/home", "/login", "/signup"]
  const showSidebar = !hideSidebarPaths.includes(pathname)

  return (
    <main className="pt-16 flex">
      <Sidebar />
      <div className={showSidebar ? "ml-64 flex-1" : "flex-1"}>{children}</div>
    </main>
  )
}

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
