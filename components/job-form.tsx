"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useJobStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { jobFormSchema } from "@/lib/validations"
import { v4 as uuidv4 } from "uuid"
import { Checkbox } from "@/components/ui/checkbox"

interface JobFormProps {
  onSuccess?: () => void
  editJob?: any
}

export function JobForm({ onSuccess, editJob }: JobFormProps) {
  const { addJob, updateJob } = useJobStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(jobFormSchema),
    defaultValues: editJob || {
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
      experienceLevel: "Mid-Level",
      skills: "",
      responsibilities: "",
      requirements: "",
      featured: false,
    },
  })

  const onSubmit = async (values: any) => {
    setIsSubmitting(true)

    try {
      // Process form data
      const jobData = {
        ...values,
        id: editJob?.id || uuidv4(),
        postedAt: editJob?.postedAt || new Date().toISOString(),
        featured: values.featured || false,
        skills: values.skills.split(",").map((skill: string) => skill.trim()),
        responsibilities: values.responsibilities.split("\n").filter(Boolean),
        requirements: values.requirements.split("\n").filter(Boolean),
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editJob) {
        updateJob(jobData)
        toast({
          title: "Job updated",
          description: "Your job listing has been updated successfully.",
        })
      } else {
        addJob(jobData)
        toast({
          title: "Job posted",
          description: "Your job listing has been posted successfully.",
        })
        form.reset()
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem with your submission.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Remote, New York, NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $80,000 - $100,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Entry-Level">Entry-Level</SelectItem>
                    <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed description of the job..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <FormControl>
                <Input placeholder="e.g. React, TypeScript, Node.js" {...field} />
              </FormControl>
              <FormDescription>Separate skills with commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibilities</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List the key responsibilities for this role..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter each responsibility on a new line</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea placeholder="List the requirements for this role..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>Enter each requirement on a new line</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured Job</FormLabel>
                <FormDescription>
                  Featured jobs appear at the top of search results and are highlighted.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : editJob ? "Update Job" : "Post Job"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

