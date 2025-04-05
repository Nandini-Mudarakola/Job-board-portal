import { JobListings } from "@/components/job-listings"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Find Your Dream Job</h1>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Browse thousands of job listings from top companies and find the perfect role for your skills and experience.
        </p>
        <SearchBar />
      </section>

      <JobListings />
    </div>
  )
}

