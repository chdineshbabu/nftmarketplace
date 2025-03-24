import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Eye, Heart, History, Share2, Tag, Zap } from "lucide-react"
import { getRandomImage } from "@/lib/images"

interface NFTPageProps {
  params: {
    id: string
  }
}

export default async function NFTPage({ params }: NFTPageProps) {
  // Fetch random image for NFT
  const nftImage = await getRandomImage('digital art nft', 600, 600)

  // In a real app, you would fetch this data based on the ID
  const nft = {
    id: params.id,
    name: "Cosmic Voyager #42",
    description:
      "A unique digital collectible exploring the boundaries of space and imagination. This NFT represents a journey through the cosmos, with vibrant colors and intricate details.",
    creator: "0x1a2b...3c4d",
    owner: "0x5e6f...7g8h",
    price: 0.45,
    currency: "ETH",
    image: nftImage,
    likes: 24,
    views: 142,
    createdAt: "2023-10-15",
    collection: "Cosmic Series",
    attributes: [
      { trait: "Background", value: "Deep Space" },
      { trait: "Character", value: "Explorer" },
      { trait: "Rarity", value: "Rare" },
      { trait: "Edition", value: "42 of 100" },
    ],
    history: [
      { event: "Minted", from: "Creator", to: "0x1a2b...3c4d", price: 0.2, date: "2023-10-15" },
      { event: "Transfer", from: "0x1a2b...3c4d", to: "0x5e6f...7g8h", price: 0.35, date: "2023-11-02" },
      { event: "Listed", from: "0x5e6f...7g8h", price: 0.45, date: "2023-11-10" },
    ],
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFT Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden border">
          <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
        </div>

        {/* NFT Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{nft.collection}</Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-2">{nft.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" /> {nft.views} views
              </div>
              <div className="flex items-center">
                <Heart className="mr-1 h-4 w-4" /> {nft.likes} favorites
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Current Price</h2>
            <p className="text-3xl font-bold mt-1">
              {nft.price} {nft.currency}
            </p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              <Zap className="mr-2 h-5 w-5" /> Buy Now
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Tag className="mr-2 h-5 w-5" /> Make Offer
            </Button>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="attributes" className="flex-1">
                Attributes
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{nft.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Creator</h3>
                  <p className="mt-1">{nft.creator}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Owner</h3>
                  <p className="mt-1">{nft.owner}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Collection</h3>
                  <p className="mt-1">{nft.collection}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                  <p className="mt-1">{nft.createdAt}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attributes" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {nft.attributes.map((attr, index) => (
                  <Card key={index}>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-medium text-muted-foreground">{attr.trait}</h3>
                      <p className="font-semibold">{attr.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                {nft.history.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b">
                    <div className="bg-muted rounded-full p-2">
                      <History className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.event}</h3>
                      <div className="text-sm text-muted-foreground">
                        {item.from && <p>From: {item.from}</p>}
                        {item.to && <p>To: {item.to}</p>}
                        {item.price && <p>Price: {item.price} ETH</p>}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

