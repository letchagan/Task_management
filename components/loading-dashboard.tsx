"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import TaskSkeleton from "@/components/task-skeleton"

export default function LoadingDashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="w-60 h-full bg-slate-50 dark:bg-slate-900 border-r p-4">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-2 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-10 w-28" />
          </div>

          <div className="mb-8">
            <Skeleton className="h-10 w-full mb-8" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <TaskSkeleton key={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
