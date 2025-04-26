"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, ImageIcon, Wand2, Footprints } from "lucide-react"
import { motion } from "framer-motion"

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

export default function ShoesPage() {
  const [rawPrompt, setRawPrompt] = useState("")
  const [enhancedPrompt, setEnhancedPrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState("")
  const [currentImage, setCurrentImage] = useState("")
  const [updateInstruction, setUpdateInstruction] = useState("")
  const [updatedImage, setUpdatedImage] = useState("")
  const [loading, setLoading] = useState({
    enhance: false,
    generate: false,
    update: false,
  })
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("create")

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
      setCurrentImage(`data:image/png;base64,${data.image_base64}`)
    } catch (err: any) {
      setError(`Failed to generate image: ${err.message}`)
    } finally {
      setLoading((prev) => ({ ...prev, generate: false }))
    }
  }

  const updateImage = async () => {
    if (!currentImage) {
      setError("Please generate an image first")
      return
    }

    if (!updateInstruction.trim()) {
      setError("Please enter update instructions")
      return
    }

    setError("")
    setLoading((prev) => ({ ...prev, update: true }))

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
      setLoading((prev) => ({ ...prev, update: false }))
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Placeholder image for when no image is generated yet
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='sans-serif' fontSize='24' fill='%23666'%3EShoe image will appear here%3C/text%3E%3C/svg%3E"

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <motion.div
        className="flex flex-col items-center justify-center mb-10"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold text-center mb-2 flex items-center">
          <Footprints className="h-8 w-8 mr-3 text-green-500" />
          AI Shoe Designer
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          Create stunning shoe designs with AI-powered generation
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

      <Tabs
        defaultValue="create"
        className="w-full max-w-4xl mx-auto"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2 bg-black/50">
          <TabsTrigger value="create">Create Shoe</TabsTrigger>
          <TabsTrigger value="edit">Edit Shoe</TabsTrigger>
        </TabsList>

        {activeTab === "create" && (
          <TabsContent value="create" className="space-y-6">
            <motion.div
              className="bg-gradient-black card-gradient p-6"
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col space-y-1.5 p-6 pt-0">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Generate Shoe Design</h3>
                <p className="text-sm text-muted-foreground">Describe the shoe you want to create</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Raw Prompt</label>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="E.g., A sleek running shoe with red accents"
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

            {generatedImage && (
              <motion.div
                className="bg-gradient-black card-gradient"
                variants={slideUp}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Generated Shoe</h3>
                </div>
                <div className="p-6 pt-0 flex justify-center">
                  <motion.div
                    className="relative w-full max-w-md aspect-square bg-gray-800 rounded-md overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={generatedImage || placeholderImage}
                      alt="Generated shoe design"
                      className="object-contain w-full h-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </TabsContent>
        )}

        {activeTab === "edit" && (
          <TabsContent value="edit" className="space-y-6">
            <motion.div
              className="bg-gradient-black card-gradient"
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Edit Shoe Design</h3>
                <p className="text-sm text-muted-foreground">Modify your generated shoe with text instructions</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                {currentImage ? (
                  <div className="flex flex-col md:flex-row gap-6">
                    <motion.div
                      className="relative w-full md:w-1/2 aspect-square bg-gray-800 rounded-md overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={currentImage || placeholderImage}
                        alt="Current shoe design"
                        className="object-contain w-full h-full"
                      />
                    </motion.div>
                    <motion.div
                      className="w-full md:w-1/2 space-y-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">Edit Instructions</label>
                        <Textarea
                          placeholder="E.g., Change the color to blue, add white laces"
                          value={updateInstruction}
                          onChange={(e) => setUpdateInstruction(e.target.value)}
                          className="w-full"
                          rows={5}
                        />
                      </div>
                      <motion.button
                        onClick={updateImage}
                        className="btn-primary bg-gradient-green w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={loading.update || !updateInstruction.trim()}
                        variants={buttonHover}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {loading.update ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Update Shoe
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    className="text-center py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Footprints className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Generate a shoe first to edit it</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {updatedImage && (
              <motion.div
                className="bg-gradient-black card-gradient"
                variants={slideUp}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Updated Shoe</h3>
                </div>
                <div className="p-6 pt-0 flex justify-center">
                  <motion.div
                    className="relative w-full max-w-md aspect-square bg-gray-800 rounded-md overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={updatedImage || placeholderImage}
                      alt="Updated shoe design"
                      className="object-contain w-full h-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
