'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { 
  Settings, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Eye, 
  Download, 
  Trash2, 
  Save, 
  RefreshCw,
  Clock,
  Shield
} from "lucide-react"
import { 
  getUserProgress, 
  resetUserProgress,
  getUserSettings,
  updateUserSettings,
  updateAdventureTime
} from '@/lib/local-storage'
import { useTheme } from 'next-themes'
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [progress, setProgress] = useState<any>(null)
  const [settings, setSettings] = useState<any>({
    theme: 'system',
    soundEnabled: true,
    soundVolume: 80,
    notificationsEnabled: true,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    autoSave: true
  })
  const [isLoading, setIsLoading] = useState(true)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [startTime] = useState(Date.now())
  
  // Load progress and settings from local storage
  useEffect(() => {
    const userProgress = getUserProgress()
    setProgress(userProgress)
    
    const userSettings = getUserSettings()
    if (userSettings) {
      setSettings(userSettings)
    }
    
    setIsLoading(false)
  }, [])
  
  // Track time spent on page
  useEffect(() => {
    return () => {
      const timeSpentMinutes = Math.round((Date.now() - startTime) / 60000)
      if (timeSpentMinutes > 0) {
        updateAdventureTime(timeSpentMinutes)
      }
    }
  }, [startTime])
  
  // Update settings
  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    updateUserSettings(newSettings)
    
    // Apply theme change immediately
    if (key === 'theme') {
      setTheme(value)
    }
    
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
      duration: 2000
    })
  }
  
  // Reset progress
  const handleResetProgress = () => {
    resetUserProgress()
    setProgress(getUserProgress())
    setResetDialogOpen(false)
    
    toast({
      title: "Progress reset",
      description: "All your progress has been reset.",
      duration: 3000
    })
  }
  
  // Export progress data
  const handleExportData = () => {
    const data = {
      progress: getUserProgress(),
      settings: getUserSettings()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'digital-inclusion-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Data exported",
      description: "Your data has been exported as a JSON file.",
      duration: 3000
    })
  }
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    )
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your preferences and account settings.</p>
        </div>
        
        <Tabs defaultValue="preferences" className="space-y-4">
          <TabsList>
            <TabsTrigger value="preferences">
              <Settings className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="accessibility">
              <Eye className="h-4 w-4 mr-2" />
              Accessibility
            </TabsTrigger>
            <TabsTrigger value="data">
              <Shield className="h-4 w-4 mr-2" />
              Data & Privacy
            </TabsTrigger>
          </TabsList>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the application looks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex space-x-2">
                    <Button 
                      variant={settings.theme === 'light' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleSettingChange('theme', 'light')}
                      className="flex-1"
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </Button>
                    <Button 
                      variant={settings.theme === 'dark' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleSettingChange('theme', 'dark')}
                      className="flex-1"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </Button>
                    <Button 
                      variant={settings.theme === 'system' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleSettingChange('theme', 'system')}
                      className="flex-1"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      System
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sound</CardTitle>
                <CardDescription>Manage sound settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {settings.soundEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                    <Label htmlFor="sound-toggle">Enable sounds</Label>
                  </div>
                  <Switch 
                    id="sound-toggle" 
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                  />
                </div>
                
                {settings.soundEnabled && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="volume-slider">Volume</Label>
                      <span className="text-sm text-muted-foreground">{settings.soundVolume}%</span>
                    </div>
                    <Slider 
                      id="volume-slider"
                      min={0}
                      max={100}
                      step={1}
                      value={[settings.soundVolume]}
                      onValueChange={(value) => handleSettingChange('soundVolume', value[0])}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage notification preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="notifications-toggle">Enable notifications</Label>
                  </div>
                  <Switch 
                    id="notifications-toggle" 
                    checked={settings.notificationsEnabled}
                    onCheckedChange={(checked) => handleSettingChange('notificationsEnabled', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Accessibility Tab */}
          <TabsContent value="accessibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visual Preferences</CardTitle>
                <CardDescription>Adjust visual settings for better accessibility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast-toggle">High contrast mode</Label>
                  <Switch 
                    id="high-contrast-toggle" 
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="large-text-toggle">Larger text</Label>
                  <Switch 
                    id="large-text-toggle" 
                    checked={settings.largeText}
                    onCheckedChange={(checked) => handleSettingChange('largeText', checked)}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Motion & Animations</CardTitle>
                <CardDescription>Adjust motion settings for better accessibility.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduced-motion-toggle">Reduced motion</Label>
                  <Switch 
                    id="reduced-motion-toggle" 
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Data & Privacy Tab */}
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Storage</CardTitle>
                <CardDescription>Manage how your data is stored and used.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save-toggle">Auto-save progress</Label>
                  <Switch 
                    id="auto-save-toggle" 
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                  />
                </div>
                
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Local Storage Only</AlertTitle>
                  <AlertDescription>
                    All your data is stored locally on your device. Nothing is sent to any server.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                
                <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Progress
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset All Progress</DialogTitle>
                      <DialogDescription>
                        This will reset all your progress, including completed courses, quizzes, and games.
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Alert variant="destructive">
                        <Trash2 className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          All your progress data will be permanently deleted.
                        </AlertDescription>
                      </Alert>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setResetDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleResetProgress}>
                        Reset All Progress
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Progress Summary</CardTitle>
                <CardDescription>Overview of your learning journey.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {Object.keys(progress?.courses || {}).filter(id => progress?.courses[id]?.completed).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Courses Completed</div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {Object.keys(progress?.quizzes || {}).filter(id => progress?.quizzes[id]?.completed).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Quizzes Completed</div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {progress?.timeSpent || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Minutes Spent Learning</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Last activity: {progress?.lastActive ? new Date(progress.lastActive).toLocaleString() : 'Never'}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
