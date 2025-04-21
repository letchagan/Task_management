"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, CheckCircle2, Clock } from "lucide-react"
import TaskList from "@/components/task-list"
import TeamSidebar from "@/components/team-sidebar"
import CreateTaskDialog from "@/components/create-task-dialog"
import { useTasks } from "@/hooks/use-tasks"
import { useTeams } from "@/hooks/use-teams"

export default function Dashboard() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")
  const { toast } = useToast()
  const { tasks, isLoading: tasksLoading } = useTasks()
  const { teams, isLoading: teamsLoading } = useTeams()

  useEffect(() => {
    // Simulate initial load completion
    const timer = setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "Your tasks are synced and up to date.",
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [toast])

  const filteredTasks = tasks.filter((task) => {
    if (selectedTab === "all") return true
    if (selectedTab === "upcoming") {
      const deadline = new Date(task.deadline)
      const now = new Date()
      const threeDaysFromNow = new Date()
      threeDaysFromNow.setDate(now.getDate() + 3)
      return deadline > now && deadline <= threeDaysFromNow
    }
    if (selectedTab === "completed") return task.status === "completed"
    return task.status === selectedTab
  })

  return (
    <div className="flex h-screen overflow-hidden">
      <TeamSidebar teams={teams} isLoading={teamsLoading} />

      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold tracking-tight"
            >
              Task Dashboard
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button onClick={() => setIsCreateTaskOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  All Tasks
                </TabsTrigger>
                <TabsTrigger value="in-progress" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  In Progress
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value={selectedTab} className="mt-0">
                    <TaskList tasks={filteredTasks} isLoading={tasksLoading} />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} teams={teams} />
    </div>
  )
}
