import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Wallet, User, Bell, Menu } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "A minimal NFT marketplace for buying, selling, and trading digital assets",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="border-b">
              <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link href="/" className="font-bold text-xl">
                    NFT Market
                  </Link>
                  <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-primary">
                      Explore
                    </Link>
                    <Link href="/create" className="text-sm font-medium hover:text-primary">
                      Create
                    </Link>
                    <Link href="/profile" className="text-sm font-medium hover:text-primary">
                      My NFTs
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  <Button variant="outline" size="icon" className="hidden md:flex">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Link href="/profile">
                    <Button variant="outline" size="icon" className="hidden md:flex">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button>
                    <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
                  </Button>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </header>
            <div className="flex-1">{children}</div>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-muted-foreground">© 2025 NFT Marketplace. All rights reserved.</p>
                  <div className="flex gap-4">
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Terms
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Privacy
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

