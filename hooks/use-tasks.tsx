"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/types/task"

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Redesign Dashboard UI",
    description: "Update the dashboard interface with new components and improve user experience",
    status: "in-progress",
    progress: 65,
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    assignees: [
      { id: "user-1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-2", name: "Sarah Miller", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    teamId: "team-1",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "task-2",
    title: "API Integration",
    description: "Connect the application to the new payment processing API",
    status: "pending",
    progress: 20,
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    assignees: [{ id: "user-3", name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32" }],
    teamId: "team-2",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "task-3",
    title: "User Testing",
    description: "Conduct user testing sessions for the new features",
    status: "completed",
    progress: 100,
    deadline: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    assignees: [
      { id: "user-1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-4", name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    teamId: "team-1",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
  },
  {
    id: "task-4",
    title: "Documentation Update",
    description: "Update the developer documentation with the latest API changes",
    status: "in-progress",
    progress: 45,
    deadline: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
    assignees: [
      { id: "user-2", name: "Sarah Miller", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-5", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    teamId: "team-3",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "task-5",
    title: "Performance Optimization",
    description: "Improve application loading times and overall performance",
    status: "pending",
    progress: 10,
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    assignees: [
      { id: "user-3", name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-6", name: "Lisa Taylor", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    teamId: "team-2",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
  },
]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchTasks = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setTasks(mockTasks)
      setIsLoading(false)
    }

    fetchTasks()
  }, [])

  return { tasks, isLoading }
}
