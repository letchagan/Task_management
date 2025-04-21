"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import type { Team } from "@/types/team"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface TeamSidebarProps {
  teams: Team[]
  isLoading: boolean
}

export default function TeamSidebar({ teams, isLoading }: TeamSidebarProps) {
  const [expanded, setExpanded] = useState(true)
  const isMobile = useMobile()

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [isMobile])

  return (
    <motion.div
      className="h-full bg-slate-50 dark:bg-slate-900 border-r relative"
      initial={false}
      animate={{
        width: expanded ? 240 : 72,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold"
              >
                Workspaces
              </motion.h2>
            )}
          </AnimatePresence>

          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)} className="h-8 w-8">
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        <Button
          variant="outline"
          className={cn("w-full mb-4 transition-all", expanded ? "justify-start" : "justify-center px-0")}
        >
          <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
          {expanded && <span>New Workspace</span>}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="px-2 py-2">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 p-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  {expanded && <Skeleton className="h-4 w-24" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {teams.map((team) => (
                <Button
                  key={team.id}
                  variant="ghost"
                  className={cn("w-full justify-start", expanded ? "px-2" : "px-0 justify-center")}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={team.avatar || "/placeholder.svg"} alt={team.name} />
                      <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {expanded && <span>{team.name}</span>}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  )
}

import { useEffect } from "react"
