"use client"

import { useState } from "react"
import { useJobStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { JobForm } from "@/components/job-form"
import { formatDistanceToNow } from "date-fns"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

export function JobTable() {
  const { jobs, deleteJob } = useJobStore()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)

  const handleEdit = (job: any) => {
    setSelectedJob(job)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (job: any) => {
    setSelectedJob(job)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedJob) {
      deleteJob(selectedJob.id)
      setIsDeleteDialogOpen(false)
      setSelectedJob(null)
    }
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="mb-2 text-lg font-medium">No job listings yet</h3>
        <p className="mb-4 text-muted-foreground">
          You haven't posted any jobs yet. Create your first job listing to get started.
        </p>
        <Button asChild>
          <a href="/dashboard?tab=post">Post a Job</a>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Posted</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground">{job.company}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{job.type}</TableCell>
                <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(job)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(job)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>Make changes to the job listing below.</DialogDescription>
          </DialogHeader>
          {selectedJob && <JobForm editJob={selectedJob} onSuccess={() => setIsEditDialogOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

