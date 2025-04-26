"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { PenTool, ArrowRight } from "lucide-react"

interface CreationSidebarProps {
  type: "outfit" | "shoe"
  editLink: string
}

export function CreationSidebar({ type, editLink }: CreationSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.div
      className="bg-gradient-black card-gradient p-6 rounded-lg h-fit sticky top-24"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Link
          href={editLink}
          className="flex items-center justify-between p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors group"
        >
          <div className="flex items-center">
            <PenTool className="h-5 w-5 mr-3 text-green-500" />
            <span>Edit Existing {type === "outfit" ? "Outfit" : "Shoe"}</span>
          </div>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-md mt-6">
          <h4 className="font-medium mb-2">Pro Tip</h4>
          <p className="text-sm text-gray-300">
            {type === "outfit"
              ? "Try describing the occasion or style you're looking for to get better results."
              : "Include details like material, color, and style in your prompt for more accurate shoe designs."}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
