"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, ImageIcon, Wand2, Shirt } from "lucide-react"
import { motion } from "framer-motion"

// Add imports for the new components
import { PageNavigation } from "@/components/page-navigation"
import { CreationSidebar } from "@/components/creation-sidebar"

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

export default function CreateOutfitPage() {
  const [rawPrompt, setRawPrompt] = useState("")
  const [enhancedPrompt, setEnhancedPrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState("")
  const [loading, setLoading] = useState({
    enhance: false,
    generate: false,
  })
  const [error, setError] = useState("")

  const API_BASE_URL = "https://hammad712-fashion-designer.hf.space"

  const enhancePrompt = async () => {
    if (!rawPrompt.trim()) {
      setError("Please enter a prompt to enhance")
      return
    }

    setError("")
    setLoading((prev) => ({ ...prev, enhance: true }))

    try {
      const response = await fetch(`${API_BASE_URL}/enhance-prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw_prompt: rawPrompt }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setEnhancedPrompt(data.enhanced_prompt)
    } catch (err: any) {
      setError(`Failed to enhance prompt: ${err.message}`)
    } finally {
      setLoading((prev) => ({ ...prev, enhance: false }))
    }
  }

  const generateImage = async (useEnhanced = true) => {
    const promptToUse = useEnhanced ? enhancedPrompt : rawPrompt

    if (!promptToUse.trim()) {
      setError(`Please enter a ${useEnhanced ? "enhanced" : "raw"} prompt first`)
      return
    }

    setError("")
    setLoading((prev) => ({ ...prev, generate: true }))

    try {
      const response = await fetch(`${API_BASE_URL}/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(useEnhanced ? { enhanced_prompt: enhancedPrompt } : { raw_prompt: rawPrompt }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setGeneratedImage(`data:image/png;base64,${data.image_base64}`)
    } catch (err: any) {
      setError(`Failed to generate image: ${err.message}`)
    } finally {
      setLoading((prev) => ({ ...prev, generate: false }))
    }
  }

  // Placeholder image for when no image is generated yet
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='sans-serif' fontSize='24' fill='%23666'%3EOutfit image will appear here%3C/text%3E%3C/svg%3E"

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <PageNavigation links={[{ name: "Outfits", href: "/outfits/create" }]} title="Create Outfit Design" />

      <motion.div
        className="flex flex-col items-center justify-center mb-10"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold text-center mb-2 flex items-center">
          <Shirt className="h-8 w-8 mr-3 text-green-500" />
          Create Outfit Design
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          Describe the outfit you want to create and our AI will bring it to life
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              className="bg-gradient-black card-gradient p-6"
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col space-y-1.5 p-6 pt-0">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Describe Your Outfit</h3>
                <p className="text-sm text-muted-foreground">Enter a description of the outfit you want to create</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Raw Prompt</label>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="E.g., A casual summer dress with floral pattern"
                      value={rawPrompt}
                      onChange={(e) => setRawPrompt(e.target.value)}
                      className="flex-1"
                      rows={3}
                    />
                    <motion.button
                      onClick={enhancePrompt}
                      className="btn-primary bg-gradient-green h-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      disabled={loading.enhance || !rawPrompt.trim()}
                      variants={buttonHover}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {loading.enhance ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Enhance
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Enhanced Prompt</label>
                  <Textarea
                    placeholder="Your enhanced prompt will appear here"
                    value={enhancedPrompt}
                    onChange={(e) => setEnhancedPrompt(e.target.value)}
                    className="w-full"
                    rows={5}
                  />
                </div>
              </div>
              <div className="flex items-center p-6 pt-0 justify-between">
                <motion.button
                  onClick={() => generateImage(false)}
                  className="btn-primary bg-gradient-green disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  disabled={loading.generate || !rawPrompt.trim()}
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {loading.generate ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Use Raw Prompt
                    </>
                  )}
                </motion.button>
                <motion.button
                  onClick={() => generateImage(true)}
                  className="btn-primary bg-gradient-green disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  disabled={loading.generate || !enhancedPrompt.trim()}
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {loading.generate ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate with Enhanced Prompt
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-black card-gradient"
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Generated Outfit</h3>
                <p className="text-sm text-muted-foreground">Your AI-generated outfit will appear here</p>
              </div>
              <div className="p-6 pt-0 flex justify-center">
                <motion.div
                  className="relative w-full aspect-square bg-gray-800 rounded-md overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {generatedImage ? (
                    <img
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated outfit design"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={placeholderImage || "/placeholder.svg"}
                        alt="Placeholder"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hidden lg:block">
          <CreationSidebar type="outfit" editLink="/outfits/edit" />
        </div>
      </div>
    </div>
  )
}
