"use client"

import * as React from "react"
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit"
import { WagmiProvider, createConfig, http } from "wagmi"
import { mainnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Get this from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_PROJECT_ID"

const { wallets } = getDefaultWallets({
  appName: "NFT Marketplace",
  projectId,
  chains: [mainnet]
})

const connectors = connectorsForWallets(wallets, { projectId, appName: "NFT Marketplace" })

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  },
  connectors,
})
 
const queryClient = new QueryClient()

export function RainbowWalletProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}