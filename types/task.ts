export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  progress: number
  deadline: string
  assignees: {
    id: string
    name: string
    avatar: string
  }[]
  teamId: string
  createdAt: string
  updatedAt: string
}
