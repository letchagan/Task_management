"use client"

import { useState, useEffect } from "react"
import type { Team } from "@/types/team"

// Mock data for teams
const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Design Team",
    avatar: "/placeholder.svg?height=32&width=32",
    members: [
      { id: "user-1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-2", name: "Sarah Miller", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-4", name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "team-2",
    name: "Engineering",
    avatar: "/placeholder.svg?height=32&width=32",
    members: [
      { id: "user-3", name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-6", name: "Lisa Taylor", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "team-3",
    name: "Documentation",
    avatar: "/placeholder.svg?height=32&width=32",
    members: [
      { id: "user-2", name: "Sarah Miller", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-5", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "team-4",
    name: "Marketing",
    avatar: "/placeholder.svg?height=32&width=32",
    members: [
      { id: "user-7", name: "Jessica Brown", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-8", name: "Ryan Martinez", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "team-5",
    name: "Product",
    avatar: "/placeholder.svg?height=32&width=32",
    members: [
      { id: "user-1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-5", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user-9", name: "Olivia Lee", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchTeams = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setTeams(mockTeams)
      setIsLoading(false)
    }

    fetchTeams()
  }, [])

  return { teams, isLoading }
}
