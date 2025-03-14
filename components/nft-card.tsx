"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, FlameIcon as Fire, MoreHorizontal, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface NFT {
  id: string
  name: string
  creator: string
  price: number
  currency: string
  image: string
  likes: number
  isHot?: boolean
}

export default function NFTCard({ nft }: { nft: NFT }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(nft.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleBuy = () => {
    toast.success(`You're about to purchase ${nft.name} for ${nft.price} ${nft.currency}`)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0 relative">
        <Link href={`/nft/${nft.id}`}>
          <div className="relative aspect-square">
            <Image
              src={nft.image || "/placeholder.svg"}
              alt={nft.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-2 right-2 flex gap-2">
          {nft.isHot && (
            <Badge variant="secondary" className="bg-red-500 hover:bg-red-600 text-white">
              <Fire className="h-3 w-3 mr-1" /> Hot
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.success("Sharing options opened")}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Report submitted")}>
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="w-full flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{nft.name}</h3>
            <p className="text-sm text-muted-foreground">Creator: {nft.creator}</p>
          </div>
          <Button variant="ghost" size="icon" className={`h-8 w-8 ${liked ? "text-red-500" : ""}`} onClick={handleLike}>
            <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
            <span className="ml-1 text-xs">{likeCount}</span>
          </Button>
        </div>
        <div className="w-full flex justify-between items-center mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-bold">
              {nft.price} {nft.currency}
            </p>
          </div>
          <Button onClick={handleBuy}>Buy Now</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

