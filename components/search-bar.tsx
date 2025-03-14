"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", query)
    // Implement search functionality
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full md:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search NFTs..."
        className="pl-8 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

