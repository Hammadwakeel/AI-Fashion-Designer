import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <p className="text-white text-lg">Loading AI Fashion Designer...</p>
      </div>
    </div>
  )
}
