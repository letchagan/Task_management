export interface Team {
  id: string
  name: string
  avatar: string
  members: {
    id: string
    name: string
    avatar: string
  }[]
}
