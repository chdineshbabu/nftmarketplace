import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Settings } from "lucide-react"
import NFTCard from "@/components/nft-card"
import { getRandomImage, getRandomImages } from "@/lib/images"

export default async function ProfilePage() {
  // Fetch random images for profile
  const bannerImage = await getRandomImage('abstract art', 1200, 400)
  const avatarImage = await getRandomImage('profile picture', 200, 200)
  const nftImages = await getRandomImages(5, 'digital art nft')

  // Sample user data with real images
  const user = {
    address: "0x1a2b3c4d5e6f7g8h9i0j",
    username: "CryptoCollector",
    bio: "Digital art enthusiast and NFT collector. Building the future of digital ownership.",
    avatar: avatarImage,
    banner: bannerImage,
    joined: "October 2022",
    followers: 128,
    following: 56,
  }

  // Sample NFT data with real images
  const ownedNFTs = [
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
  ]

  const createdNFTs = [
    {
      id: "4",
      name: "Pixel Punk #103",
      creator: user.address,
      price: 0.28,
      currency: "ETH",
      image: nftImages[3],
      likes: 12,
    },
    {
      id: "5",
      name: "Abstract Realm #27",
      creator: user.address,
      price: 0.51,
      currency: "ETH",
      image: nftImages[4],
      likes: 29,
    },
  ]

  const activityItems = [
    { type: "Purchase", item: "Cosmic Voyager #42", price: 0.45, from: "0x5e6f...7g8h", date: "2 days ago" },
    { type: "Sale", item: "Digital Wave #19", price: 0.38, to: "0x7q8r...9s0t", date: "1 week ago" },
    { type: "Mint", item: "Abstract Realm #27", date: "2 weeks ago" },
    { type: "Transfer", item: "Neon Genesis #15", to: "0x3m4n...5o6p", date: "3 weeks ago" },
  ]

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Banner and Profile */}
      <div className="relative mb-8">
        <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden">
          <Image src={user.banner || "/placeholder.svg"} alt="Profile banner" fill className="object-cover" />
        </div>

        <div className="absolute -bottom-16 left-4 md:left-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background">
            <Image src={user.avatar || "/placeholder.svg"} alt={user.username} fill className="object-cover" />
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm">
            <Settings className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="flex items-center mt-1 text-muted-foreground">
              <p className="text-sm truncate">{user.address}</p>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-center">
              <p className="font-bold">{user.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </div>

        <p className="mt-4">{user.bio}</p>
        <p className="text-sm text-muted-foreground mt-2">Joined {user.joined}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="collected">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="collected" className="flex-1">
            Collected
          </TabsTrigger>
          <TabsTrigger value="created" className="flex-1">
            Created
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex-1">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="collected" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="created" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
            <Card className="flex flex-col items-center justify-center p-6 border-dashed h-full min-h-[300px]">
              <Link href="/create">
                <Button>Create New NFT</Button>
              </Link>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {activityItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <Link href={`/nft/${item.item.split("#")[1]}`} className="font-medium hover:underline">
                          {item.item}
                        </Link>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.from && <span>From: {item.from}</span>}
                        {item.to && <span>To: {item.to}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      {item.price && <p className="font-medium">{item.price} ETH</p>}
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

