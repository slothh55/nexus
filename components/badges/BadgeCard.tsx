'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge as BadgeComponent } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Award, 
  CheckCircle, 
  Lock, 
  Shield, 
  Brain, 
  Trophy, 
  Sparkles,
  Info
} from 'lucide-react'
import { Badge } from '@/lib/badge-system'
import { BadgeProgress } from '@/lib/local-storage'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface BadgeCardProps {
  badge: Badge
  progress: BadgeProgress
}

export function BadgeCard({ badge, progress }: BadgeCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  // Get icon component
  const getIconComponent = () => {
    switch (badge.icon) {
      case 'Shield':
        return Shield
      case 'Brain':
        return Brain
      case 'Lock':
        return Lock
      case 'Trophy':
        return Trophy
      case 'Award':
        return Award
      case 'Sparkles':
        return Sparkles
      default:
        return Award
    }
  }
  
  const IconComponent = getIconComponent()
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not yet unlocked'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${progress.unlocked ? "" : "opacity-75"}`}
      >
        <div className={`h-2 w-full bg-gradient-to-r ${badge.color}`}></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className={`rounded-full bg-gradient-to-r ${badge.color} p-2`}>
                <IconComponent className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg">{badge.title}</CardTitle>
            </div>
            {progress.unlocked ? (
              <div className="rounded-full bg-green-500 p-1">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            ) : (
              <div className="rounded-full bg-slate-300 dark:bg-slate-700 p-1">
                <Lock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{badge.description}</CardDescription>
          
          {!progress.unlocked && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <div>Progress</div>
                <div>{progress.progress}%</div>
              </div>
              <Progress value={progress.progress} className="h-1.5" />
            </div>
          )}
          
          <div className="mt-3 flex justify-between items-center">
            <BadgeComponent variant="outline" className="capitalize">
              {badge.category}
            </BadgeComponent>
            
            {badge.level && (
              <BadgeComponent 
                variant="outline" 
                className={
                  badge.level === 'gold' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' 
                    : badge.level === 'silver'
                      ? 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
                }
              >
                {badge.level.charAt(0).toUpperCase() + badge.level.slice(1)}
              </BadgeComponent>
            )}
            
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div className={`rounded-full bg-gradient-to-r ${badge.color} p-2`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    {badge.title}
                  </DialogTitle>
                  <DialogDescription>
                    {badge.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Category</h4>
                    <p className="text-sm text-muted-foreground">{badge.category}</p>
                  </div>
                  
                  {badge.level && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Level</h4>
                      <p className="text-sm text-muted-foreground capitalize">{badge.level}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <p className="text-sm text-muted-foreground">
                      {progress.unlocked ? 'Unlocked' : 'Locked'}
                    </p>
                  </div>
                  
                  {progress.unlocked && progress.dateUnlocked && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Date Unlocked</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(progress.dateUnlocked)}
                      </p>
                    </div>
                  )}
                  
                  {!progress.unlocked && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Progress</h4>
                      <div className="flex justify-between text-xs mb-1">
                        <div>Progress</div>
                        <div>{progress.progress}%</div>
                      </div>
                      <Progress value={progress.progress} className="h-1.5" />
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button onClick={() => setShowDetails(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
