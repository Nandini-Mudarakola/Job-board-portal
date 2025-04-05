import Link from "next/link"
import { Building2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Building2 className="h-5 w-5" />
              <span>JobHub</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">Connecting talent with opportunity</p>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h3 className="font-medium">For Job Seekers</h3>
              <div className="flex flex-col items-center gap-1 md:items-start">
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Browse Jobs
                </Link>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Create Profile
                </Link>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Job Alerts
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 md:items-start">
              <h3 className="font-medium">For Employers</h3>
              <div className="flex flex-col items-center gap-1 md:items-start">
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Post a Job
                </Link>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Browse Candidates
                </Link>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JobHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

