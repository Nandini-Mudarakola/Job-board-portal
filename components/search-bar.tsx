"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would navigate to search results
    // router.push(`/search?q=${encodeURIComponent(query)}`)

    // For this demo, just scroll to listings
    window.scrollTo({
      top: document.querySelector("h1")?.getBoundingClientRect().bottom || 0,
      behavior: "smooth",
    })
  }

  return (
    <form onSubmit={handleSearch} className="mx-auto flex max-w-lg gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search jobs by title, company, or keywords..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}

