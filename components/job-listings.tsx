"use client"

import { useEffect, useState } from "react"
import { useJobStore } from "@/lib/store"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function JobListings() {
  const { jobs, fetchJobs } = useJobStore()
  const [loading, setLoading] = useState(true)
  const [visibleJobs, setVisibleJobs] = useState(6)

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      fetchJobs()
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [fetchJobs])

  const loadMore = () => {
    setVisibleJobs((prev) => prev + 6)
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.slice(0, visibleJobs).map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {visibleJobs < jobs.length && (
        <div className="flex justify-center">
          <Button onClick={loadMore} variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  )
}

