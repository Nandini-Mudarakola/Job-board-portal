import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Building2, MapPin } from "lucide-react"

interface JobCardProps {
  job: any
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2">
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <Link href={`/jobs/${job.id}`} className="group">
              <h3 className="font-semibold group-hover:underline">{job.title}</h3>
            </Link>
            <Badge variant={job.featured ? "default" : "outline"}>{job.type}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-2 text-sm">
        <p className="line-clamp-3">{job.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
        </div>
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

