"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Save, LogOut, User, Mail, Shield, Key } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function ProfilePage() {
  const { user, updateProfile, logout, isLoading } = useAuth()
  const router = useRouter()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsUpdating(true)

    try {
      updateProfile({ name, email })
      setSuccess("Profile updated successfully")
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    setIsUpdating(true)

    // Simulate password update
    setTimeout(() => {
      setSuccess("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setIsUpdating(false)
    }, 1000)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-black card-gradient p-6 rounded-lg shadow-xl col-span-1"
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-green-700 flex items-center justify-center mb-4 overflow-hidden">
                {user.image ? (
                  <img src={user.image || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-16 w-16 text-white" />
                )}
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <div className="flex items-center mt-2 text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center mt-2 text-gray-400">
                <Shield className="h-4 w-4 mr-2" />
                <span className="capitalize">{user.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="mt-6 btn-primary bg-red-900 hover:bg-red-800 w-full py-2 rounded-md flex items-center justify-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Update Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20, transition: { delay: 0.1 } }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-black card-gradient p-6 rounded-lg shadow-xl col-span-2"
          >
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>

            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">{error}</div>
            )}

            {success && (
              <div className="bg-green-900/30 border border-green-700 text-green-200 px-4 py-3 rounded mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-4 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="btn-primary bg-gradient-green py-2 px-4 rounded-md flex items-center disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Update Profile
              </button>
            </form>

            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="btn-primary bg-gradient-green py-2 px-4 rounded-md flex items-center disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Key className="h-4 w-4 mr-2" />}
                Change Password
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
