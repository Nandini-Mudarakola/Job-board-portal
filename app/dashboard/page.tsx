"use client"

import { useState } from "react"
import { JobForm } from "@/components/job-form"
import { JobTable } from "@/components/job-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useJobStore } from "@/lib/store"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("jobs")
  const { jobs } = useJobStore()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Company Dashboard</h1>

      <Tabs defaultValue="jobs" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="post">Post a Job</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Job Listings</h2>
            <div className="text-sm text-muted-foreground">
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"} posted
            </div>
          </div>

          <JobTable />
        </TabsContent>

        <TabsContent value="post" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Post a New Job</h2>
            <p className="text-muted-foreground">Fill out the form below to create a new job listing</p>
          </div>

          <JobForm onSuccess={() => setActiveTab("jobs")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

