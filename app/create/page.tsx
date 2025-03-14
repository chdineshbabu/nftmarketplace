"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"

export default function CreateNFT() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setImagePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Your NFT has been successfully minted!")
    router.push("/")
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Create New NFT</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload File</h2>
            <div className="space-y-4">
              {!imagePreview ? (
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">Drag and drop or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Support for JPG, PNG, GIF, SVG, MP4, WEBM
                    <br />
                    Max size: 100 MB
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image src={imagePreview || "/placeholder.svg"} alt="NFT Preview" fill className="object-cover" />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="collection">Collection</Label>
                <Select defaultValue="new">
                  <SelectTrigger>
                    <SelectValue placeholder="Select collection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Create new collection</SelectItem>
                    <SelectItem value="cosmic">Cosmic Series</SelectItem>
                    <SelectItem value="pixel">Pixel Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NFT Details Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Item name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide a detailed description of your item" rows={4} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="eth">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="matic">MATIC</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Properties</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trait-type">Trait Type</Label>
                <Input id="trait-type" placeholder="E.g. Color" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trait-value">Value</Label>
                <Input id="trait-value" placeholder="E.g. Blue" />
              </div>
            </div>
            <Button type="button" variant="outline" size="sm">
              + Add Property
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Royalties</h3>
                <p className="text-sm text-muted-foreground">Earn a percentage of future sales</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Percentage</Label>
                <span className="font-medium">{royaltyPercentage}%</span>
              </div>
              <Slider defaultValue={[10]} max={25} step={1} onValueChange={(value) => setRoyaltyPercentage(value[0])} />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Create NFT
          </Button>
        </div>
      </form>
    </main>
  )
}

