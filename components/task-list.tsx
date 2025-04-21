"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import type { Task } from "@/types/task"
import TaskSkeleton from "@/components/task-skeleton"

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
}

export default function TaskList({ tasks, isLoading }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center"
      >
        <div className="rounded-full bg-slate-100 p-6 dark:bg-slate-800">
          <CheckCircle2 className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          There are no tasks matching your current filter.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task, index) => (
        <TaskCard key={task.id} task={task} index={index} />
      ))}
    </div>
  )
}

function TaskCard({ task, index }: { task: Task; index: number }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-slate-500"
    }
  }

  const deadlineDate = new Date(task.deadline)
  const isOverdue = deadlineDate < new Date() && task.status !== "completed"

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <CardDescription className="mt-1">{task.description}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                <DropdownMenuItem>Change Status</DropdownMenuItem>
                <DropdownMenuItem>Delete Task</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5">
                <Badge variant={isOverdue ? "destructive" : "secondary"} className="flex gap-1 items-center">
                  <Calendar className="h-3 w-3" />
                  {isOverdue
                    ? `Overdue by ${formatDistanceToNow(deadlineDate)}`
                    : formatDistanceToNow(deadlineDate, { addSuffix: true })}
                </Badge>
              </div>
              <Badge className={`${getStatusColor(task.status)} text-white`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </Badge>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          <div className="flex -space-x-2">
            {task.assignees.map((assignee, i) => (
              <Avatar key={i} className="border-2 border-background h-8 w-8">
                <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
                <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

import { CheckCircle2 } from "lucide-react"
