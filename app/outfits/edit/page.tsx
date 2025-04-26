"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Wand2, Shirt } from "lucide-react"
import { motion } from "framer-motion"

// Add import for the PageNavigation component
import { PageNavigation } from "@/components/page-navigation"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
}

export default function EditOutfitPage() {
  const [currentImage, setCurrentImage] = useState("")
  const [updateInstruction, setUpdateInstruction] = useState("")
  const [updatedImage, setUpdatedImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  const API_BASE_URL = "https://hammad712-fashion-designer.hf.space"

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedImage(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setCurrentImage(event.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const updateImage = async () => {
    if (!currentImage) {
      setError("Please upload an image first")
      return
    }

    if (!updateInstruction.trim()) {
      setError("Please enter update instructions")
      return
    }

    setError("")
    setLoading(true)

    try {
      // Extract base64 data without the prefix
      const base64Data = currentImage.replace(/^data:image\/\w+;base64,/, "")

      const response = await fetch(`${API_BASE_URL}/update-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text_instruction: updateInstruction,
          image_base64: base64Data,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setUpdatedImage(`data:image/png;base64,${data.updated_image_base64}`)
      setCurrentImage(`data:image/png;base64,${data.updated_image_base64}`)
    } catch (err: any) {
      setError(`Failed to update image: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Placeholder image for when no image is uploaded yet
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='sans-serif' fontSize='24' fill='%23666'%3EUpload an image to edit%3C/text%3E%3C/svg%3E"

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      {/* Add the PageNavigation component at the top of the return statement */}
      {/* Add this right after the opening <div className="container mx-auto py-10 px-4 min-h-screen"> */}
      <PageNavigation
        links={[
          { name: "Outfits", href: "/outfits/create" },
          { name: "Edit", href: "/outfits/edit" },
        ]}
        title="Edit Outfit Design"
      />
      <motion.div
        className="flex flex-col items-center justify-center mb-10"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold text-center mb-2 flex items-center">
          <Shirt className="h-8 w-8 mr-3 text-green-500" />
          Edit Outfit Design
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          Upload an outfit image and modify it with text instructions
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-6"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div className="bg-gradient-black card-gradient" variants={slideUp} initial="hidden" animate="visible">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Upload Image</h3>
            <p className="text-sm text-muted-foreground">Upload an outfit image to edit</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex justify-center">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-black/30 hover:bg-black/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {currentImage && (
              <div className="mt-4">
                <div className="relative w-full aspect-square bg-gray-800 rounded-md overflow-hidden">
                  <img
                    src={currentImage || "/placeholder.svg"}
                    alt="Uploaded outfit"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div className="bg-gradient-black card-gradient" variants={slideUp} initial="hidden" animate="visible">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Edit Instructions</h3>
            <p className="text-sm text-muted-foreground">Describe how you want to modify the outfit</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Edit Instructions</label>
              <Textarea
                placeholder="E.g., Change the color to blue, add a belt"
                value={updateInstruction}
                onChange={(e) => setUpdateInstruction(e.target.value)}
                className="w-full"
                rows={5}
              />
            </div>

            <motion.button
              onClick={updateImage}
              className="btn-primary bg-gradient-green w-full py-3 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !updateInstruction.trim() || !currentImage}
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  Update Outfit
                </>
              )}
            </motion.button>

            {updatedImage && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Updated Outfit</h4>
                <div className="relative w-full aspect-square bg-gray-800 rounded-md overflow-hidden">
                  <img
                    src={updatedImage || "/placeholder.svg"}
                    alt="Updated outfit"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
