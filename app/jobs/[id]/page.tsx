"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useJobStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { Building2, Calendar, Clock, DollarSign, MapPin } from "lucide-react"

export default function JobDetailsPage() {
  const params = useParams()
  const jobId = params.id as string
  const { jobs } = useJobStore()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const foundJob = jobs.find((j) => j.id === jobId)
      setJob(foundJob)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [jobId, jobs])

  if (loading) {
    return <JobDetailsSkeleton />
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Job Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The job listing you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/">Back to Job Listings</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        <Button size="lg">Apply Now</Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Job Description</h2>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <p>{job.description}</p>

                <h3>Responsibilities:</h3>
                <ul>
                  {job.responsibilities.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>Requirements:</h3>
                <ul>
                  {job.requirements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Job Overview</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium text-muted-foreground">Salary</div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div>
                <div className="mb-1 text-sm font-medium text-muted-foreground">Experience Level</div>
                <div>{job.experienceLevel}</div>
              </div>

              <div>
                <div className="mb-1 text-sm font-medium text-muted-foreground">Skills</div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function JobDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

