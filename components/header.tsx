"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Building2, Menu, X } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Building2 className="h-6 w-6" />
            <span>JobHub</span>
          </Link>

          <div className="hidden md:flex md:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/dashboard?tab=post">Post a Job</Link>
          </Button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/dashboard?tab=post"
              className="mt-2 block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Post a Job
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

