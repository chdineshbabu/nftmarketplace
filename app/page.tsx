import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlameIcon as Fire, Plus, Sparkles, TrendingUpIcon as Trending } from "lucide-react"
import NFTCard from "@/components/nft-card"
import { SearchBar } from "@/components/search-bar"
import { getRandomImages } from "@/lib/images"

export default async function Home() {
  // Fetch random images for NFTs
  const nftImages = await getRandomImages(6, 'digital art nft')

  // Sample NFT data with real images
  const nfts = [
    {
      id: "1",
      name: "Cosmic Voyager #42",
      creator: "0x1a2b...3c4d",
      price: 0.45,
      currency: "ETH",
      image: nftImages[0],
      likes: 24,
      isHot: true,
    },
    {
      id: "2",
      name: "Digital Dreams #08",
      creator: "0x5e6f...7g8h",
      price: 0.32,
      currency: "ETH",
      image: nftImages[1],
      likes: 18,
    },
    {
      id: "3",
      name: "Neon Genesis #15",
      creator: "0x9i0j...1k2l",
      price: 0.67,
      currency: "ETH",
      image: nftImages[2],
      likes: 36,
      isHot: true,
    },
    {
      id: "4",
      name: "Pixel Punk #103",
      creator: "0x3m4n...5o6p",
      price: 0.28,
      currency: "ETH",
      image: nftImages[3],
      likes: 12,
    },
    {
      id: "5",
      name: "Abstract Realm #27",
      creator: "0x7q8r...9s0t",
      price: 0.51,
      currency: "ETH",
      image: nftImages[4],
      likes: 29,
    },
    {
      id: "6",
      name: "Crypto Creature #64",
      creator: "0x1u2v...3w4x",
      price: 0.38,
      currency: "ETH",
      image: nftImages[5],
      likes: 21,
    },
  ]

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          <p className="text-muted-foreground mt-1">Discover, collect, and trade unique digital assets</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <SearchBar />
          <Link href="/create">
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" /> Create NFT
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All NFTs</TabsTrigger>
          <TabsTrigger value="trending">
            <Trending className="mr-2 h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="hot">
            <Fire className="mr-2 h-4 w-4" />
            Hot
          </TabsTrigger>
          <TabsTrigger value="new">
            <Sparkles className="mr-2 h-4 w-4" />
            New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </TabsContent>

        <TabsContent value="trending" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts
            .filter((nft) => nft.likes > 20)
            .map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
        </TabsContent>

        <TabsContent value="hot" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts
            .filter((nft) => nft.isHot)
            .map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
        </TabsContent>

        <TabsContent value="new" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.slice(0, 3).map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Start Creating Your NFTs</h2>
              <p className="text-muted-foreground mt-1">Mint, sell, and manage your digital assets in one place</p>
            </div>
            <Link href="/create">
              <Button size="lg">Create Now</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

