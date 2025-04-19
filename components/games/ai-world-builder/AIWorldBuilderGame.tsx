'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useGameState } from '@/hooks/use-game-state'
import { useAchievements } from '@/hooks/use-achievements'
import { useConfetti } from '@/hooks/use-confetti'
import { AlertCircle, Brain, CheckCircle, Code, Cpu, FileText, Lightbulb, Palette, Sparkles, Trophy } from "lucide-react"

// Define the AI world builder scenarios
const scenarios = [
  {
    id: 'healthcare',
    title: 'Healthcare Assistant',
    description: 'Design an AI system to help doctors diagnose diseases',
    requirements: [
      { id: 'healthcare-1', text: 'Must protect patient privacy', category: 'privacy' },
      { id: 'healthcare-2', text: 'Must explain its reasoning for diagnoses', category: 'transparency' },
      { id: 'healthcare-3', text: 'Must have human doctor oversight for all decisions', category: 'accountability' },
      { id: 'healthcare-4', text: 'Must be tested across diverse patient populations', category: 'fairness' }
    ],
    constraints: [
      { id: 'healthcare-c1', text: 'Limited access to patient data due to privacy laws' },
      { id: 'healthcare-c2', text: 'Must integrate with existing hospital systems' },
      { id: 'healthcare-c3', text: 'Must work in low-connectivity environments' }
    ],
    stakeholders: [
      { id: 'healthcare-s1', name: 'Patients', interests: 'Accurate diagnosis, privacy, understandable results' },
      { id: 'healthcare-s2', name: 'Doctors', interests: 'Reliable assistance, time-saving, integration with workflow' },
      { id: 'healthcare-s3', name: 'Hospital Administrators', interests: 'Cost-effectiveness, regulatory compliance' },
      { id: 'healthcare-s4', name: 'Insurance Companies', interests: 'Standardized coding, cost reduction' }
    ]
  },
  {
    id: 'education',
    title: 'Personalized Learning System',
    description: 'Design an AI tutor that adapts to individual student needs',
    requirements: [
      { id: 'education-1', text: 'Must adapt to different learning styles', category: 'fairness' },
      { id: 'education-2', text: 'Must protect student data and privacy', category: 'privacy' },
      { id: 'education-3', text: 'Must provide explanations for its recommendations', category: 'transparency' },
      { id: 'education-4', text: 'Must avoid reinforcing existing educational disparities', category: 'bias' }
    ],
    constraints: [
      { id: 'education-c1', text: 'Limited computing resources in many schools' },
      { id: 'education-c2', text: 'Must work with existing curriculum requirements' },
      { id: 'education-c3', text: 'Must be accessible to students with disabilities' }
    ],
    stakeholders: [
      { id: 'education-s1', name: 'Students', interests: 'Engaging learning, personalized support, not feeling judged' },
      { id: 'education-s2', name: 'Teachers', interests: 'Classroom management support, insight into student progress' },
      { id: 'education-s3', name: 'Parents', interests: 'Child progress, appropriate content, limited screen time' },
      { id: 'education-s4', name: 'School Administrators', interests: 'Cost, measurable outcomes, compliance with standards' }
    ]
  },
  {
    id: 'justice',
    title: 'Criminal Justice Risk Assessment',
    description: 'Design an AI system to assist with bail and sentencing decisions',
    requirements: [
      { id: 'justice-1', text: 'Must not perpetuate racial or socioeconomic biases', category: 'bias' },
      { id: 'justice-2', text: 'Must provide transparent reasoning for its assessments', category: 'transparency' },
      { id: 'justice-3', text: 'Must allow for human judicial override of all recommendations', category: 'accountability' },
      { id: 'justice-4', text: 'Must treat similar cases consistently', category: 'fairness' }
    ],
    constraints: [
      { id: 'justice-c1', text: 'Limited historical data quality with embedded biases' },
      { id: 'justice-c2', text: 'Must comply with legal due process requirements' },
      { id: 'justice-c3', text: 'Must be understandable to non-technical judges and lawyers' }
    ],
    stakeholders: [
      { id: 'justice-s1', name: 'Defendants', interests: 'Fair treatment, due process, understanding decisions' },
      { id: 'justice-s2', name: 'Judges', interests: 'Reliable information, maintaining discretion, efficiency' },
      { id: 'justice-s3', name: 'Public', interests: 'Public safety, fair justice system, cost-effectiveness' },
      { id: 'justice-s4', name: 'Civil Rights Organizations', interests: 'Preventing discrimination, transparency, accountability' }
    ]
  },
  {
    id: 'hiring',
    title: 'Automated Hiring System',
    description: 'Design an AI system to screen job applicants and recommend candidates',
    requirements: [
      { id: 'hiring-1', text: 'Must not discriminate based on protected characteristics', category: 'bias' },
      { id: 'hiring-2', text: 'Must provide explanations for candidate rankings', category: 'transparency' },
      { id: 'hiring-3', text: 'Must allow for human review of all decisions', category: 'accountability' },
      { id: 'hiring-4', text: 'Must evaluate candidates on relevant job skills', category: 'fairness' }
    ],
    constraints: [
      { id: 'hiring-c1', text: 'Historical hiring data contains biases' },
      { id: 'hiring-c2', text: 'Must comply with employment laws across different regions' },
      { id: 'hiring-c3', text: 'Must process high volumes of applications efficiently' }
    ],
    stakeholders: [
      { id: 'hiring-s1', name: 'Job Applicants', interests: 'Fair consideration, feedback, efficient process' },
      { id: 'hiring-s2', name: 'Hiring Managers', interests: 'Quality candidates, time savings, diverse talent pool' },
      { id: 'hiring-s3', name: 'HR Department', interests: 'Compliance, reduced bias, efficient processes' },
      { id: 'hiring-s4', name: 'Company Leadership', interests: 'Talent acquisition, diversity goals, cost-effectiveness' }
    ]
  },
  {
    id: 'content',
    title: 'Content Moderation System',
    description: 'Design an AI system to moderate user-generated content on a social platform',
    requirements: [
      { id: 'content-1', text: 'Must enforce community guidelines consistently', category: 'fairness' },
      { id: 'content-2', text: 'Must respect freedom of expression while removing harmful content', category: 'bias' },
      { id: 'content-3', text: 'Must provide explanations for content removal', category: 'transparency' },
      { id: 'content-4', text: 'Must have human review for contested decisions', category: 'accountability' }
    ],
    constraints: [
      { id: 'content-c1', text: 'Must process massive volumes of content in real-time' },
      { id: 'content-c2', text: 'Must adapt to evolving language and cultural contexts' },
      { id: 'content-c3', text: 'Must operate across multiple languages and regions' }
    ],
    stakeholders: [
      { id: 'content-s1', name: 'Platform Users', interests: 'Free expression, protection from harmful content, clear rules' },
      { id: 'content-s2', name: 'Content Creators', interests: 'Fair treatment, clear guidelines, appeal process' },
      { id: 'content-s3', name: 'Platform Owners', interests: 'User growth, advertiser-friendly environment, legal compliance' },
      { id: 'content-s4', name: 'Vulnerable Groups', interests: 'Protection from harassment, hate speech, and exploitation' }
    ]
  }
]

// Define the ethical principles
const ethicalPrinciples = {
  bias: {
    title: 'Fairness & Non-discrimination',
    description: 'AI systems should treat all people fairly and not discriminate based on characteristics like race, gender, age, or socioeconomic status.',
    icon: <Palette className="h-4 w-4" />,
    color: 'text-yellow-500'
  },
  privacy: {
    title: 'Privacy & Data Protection',
    description: 'AI systems should respect user privacy, minimize data collection, and protect sensitive information.',
    icon: <FileText className="h-4 w-4" />,
    color: 'text-red-500'
  },
  transparency: {
    title: 'Transparency & Explainability',
    description: 'AI systems should be transparent about their capabilities and limitations, and provide understandable explanations for their decisions.',
    icon: <Lightbulb className="h-4 w-4" />,
    color: 'text-blue-500'
  },
  accountability: {
    title: 'Human Oversight & Accountability',
    description: 'AI systems should have clear lines of responsibility and appropriate human oversight, especially for important decisions.',
    icon: <Brain className="h-4 w-4" />,
    color: 'text-green-500'
  },
  fairness: {
    title: 'Fairness & Justice',
    description: 'AI systems should be designed to promote fairness and avoid creating or reinforcing unfair outcomes.',
    icon: <Sparkles className="h-4 w-4" />,
    color: 'text-purple-500'
  }
}

// Define the game achievements
const achievements = [
  { id: 'first-design', title: 'Apprentice Designer', description: 'Complete your first AI system design', icon: <CheckCircle className="h-4 w-4" />, xp: 50 },
  { id: 'all-principles', title: 'Ethics Expert', description: 'Apply all ethical principles in a single design', icon: <Trophy className="h-4 w-4" />, xp: 150 },
  { id: 'all-stakeholders', title: 'Stakeholder Champion', description: 'Address the needs of all stakeholders in a design', icon: <Cpu className="h-4 w-4" />, xp: 100 },
  { id: 'master-designer', title: 'Master AI Architect', description: 'Complete all scenario designs', icon: <Code className="h-4 w-4" />, xp: 200 },
  { id: 'perfect-score', title: 'Ethical Visionary', description: 'Achieve a perfect score on any design', icon: <Sparkles className="h-4 w-4" />, xp: 150 }
]

export function AIWorldBuilderGame() {
  // Game state
  const [state, setState] = useState({
    currentScenario: 0,
    score: 0,
    showIntro: true,
    showDesignStudio: false,
    showResults: false,
    designChoices: [] as string[],
    stakeholdersFocus: [] as string[],
    principlesApplied: new Set<string>(),
    completedScenarios: [] as string[],
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'expert',
    currentTab: 'requirements' as 'requirements' | 'constraints' | 'stakeholders' | 'design'
  })

  // Achievements and confetti hooks
  const { addAchievement, achievements: earnedAchievements } = useAchievements('ai-world-builder')
  const { triggerConfetti } = useConfetti()

  // Update state helper
  const updateState = (newState: Partial<typeof state>) => {
    setState(prev => ({ ...prev, ...newState }))
  }

  // Get current scenario
  const getCurrentScenario = () => {
    return scenarios[state.currentScenario]
  }

  // Start the game
  const startGame = () => {
    updateState({
      currentScenario: 0,
      score: 0,
      showIntro: false,
      showDesignStudio: true,
      showResults: false,
      designChoices: [],
      stakeholdersFocus: [],
      principlesApplied: new Set<string>(),
      currentTab: 'requirements'
    })
  }

  // Toggle requirement selection
  const toggleRequirement = (id: string, category: string) => {
    const newDesignChoices = [...state.designChoices]
    const index = newDesignChoices.indexOf(id)
    
    if (index === -1) {
      newDesignChoices.push(id)
      
      // Update principles applied
      const newPrinciplesApplied = new Set(state.principlesApplied)
      newPrinciplesApplied.add(category)
      
      updateState({ 
        designChoices: newDesignChoices,
        principlesApplied: newPrinciplesApplied
      })
    } else {
      newDesignChoices.splice(index, 1)
      
      // Check if we need to remove the principle
      const stillHasPrinciple = getCurrentScenario().requirements
        .some(req => req.category === category && newDesignChoices.includes(req.id))
      
      const newPrinciplesApplied = new Set(state.principlesApplied)
      if (!stillHasPrinciple) {
        newPrinciplesApplied.delete(category)
      }
      
      updateState({ 
        designChoices: newDesignChoices,
        principlesApplied: newPrinciplesApplied
      })
    }
  }

  // Toggle stakeholder focus
  const toggleStakeholder = (id: string) => {
    const newStakeholdersFocus = [...state.stakeholdersFocus]
    const index = newStakeholdersFocus.indexOf(id)
    
    if (index === -1) {
      newStakeholdersFocus.push(id)
    } else {
      newStakeholdersFocus.splice(index, 1)
    }
    
    updateState({ stakeholdersFocus: newStakeholdersFocus })
  }

  // Submit design
  const submitDesign = () => {
    const scenario = getCurrentScenario()
    
    // Calculate score based on requirements met and stakeholders considered
    const requirementsScore = state.designChoices.length * 10
    const stakeholdersScore = state.stakeholdersFocus.length * 5
    const principlesScore = state.principlesApplied.size * 15
    
    // Bonus for addressing all requirements
    const allRequirementsMet = state.designChoices.length === scenario.requirements.length
    const allRequirementsBonus = allRequirementsMet ? 20 : 0
    
    // Bonus for considering all stakeholders
    const allStakeholdersConsidered = state.stakeholdersFocus.length === scenario.stakeholders.length
    const allStakeholdersBonus = allStakeholdersConsidered ? 15 : 0
    
    // Bonus for applying all principles
    const allPrinciplesApplied = state.principlesApplied.size === Object.keys(ethicalPrinciples).length
    const allPrinciplesBonus = allPrinciplesApplied ? 25 : 0
    
    // Calculate total score
    const totalScore = requirementsScore + stakeholdersScore + principlesScore + 
                       allRequirementsBonus + allStakeholdersBonus + allPrinciplesBonus
    
    // Update completed scenarios
    const newCompletedScenarios = [...state.completedScenarios]
    if (!newCompletedScenarios.includes(scenario.id)) {
      newCompletedScenarios.push(scenario.id)
    }
    
    updateState({
      score: state.score + totalScore,
      showDesignStudio: false,
      showResults: true,
      completedScenarios: newCompletedScenarios
    })
    
    // Check for achievements
    if (state.completedScenarios.length === 0) {
      addAchievement('first-design')
    }
    
    if (allPrinciplesApplied && !earnedAchievements.includes('all-principles')) {
      addAchievement('all-principles')
      triggerConfetti()
    }
    
    if (allStakeholdersConsidered && !earnedAchievements.includes('all-stakeholders')) {
      addAchievement('all-stakeholders')
    }
    
    if (newCompletedScenarios.length === scenarios.length && !earnedAchievements.includes('master-designer')) {
      addAchievement('master-designer')
      triggerConfetti()
    }
    
    // Perfect score achievement
    const maxPossibleScore = (scenario.requirements.length * 10) + (scenario.stakeholders.length * 5) + 
                            (Object.keys(ethicalPrinciples).length * 15) + 20 + 15 + 25
    if (totalScore === maxPossibleScore && !earnedAchievements.includes('perfect-score')) {
      addAchievement('perfect-score')
      triggerConfetti()
    }
  }

  // Continue to next scenario
  const continueToNext = () => {
    const nextIndex = (state.currentScenario + 1) % scenarios.length
    
    updateState({
      currentScenario: nextIndex,
      showResults: false,
      showDesignStudio: true,
      designChoices: [],
      stakeholdersFocus: [],
      principlesApplied: new Set<string>(),
      currentTab: 'requirements'
    })
  }

  // Return to scenario selection
  const returnToSelection = () => {
    updateState({
      showIntro: true,
      showResults: false
    })
  }

  // Render the game intro
  const renderIntro = () => {
    if (!state.showIntro) return null
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>AI World Builder</CardTitle>
          <CardDescription>
            Design ethical AI systems for real-world scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            In this challenge, you'll design AI systems for different scenarios while 
            balancing ethical principles, stakeholder needs, and technical constraints.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <h3 className="font-semibold flex items-center gap-2">
              <Code className="h-4 w-4 text-blue-500" />
              Why ethical AI design matters
            </h3>
            <p className="mt-1 text-sm">
              AI systems can have significant impacts on people's lives. Ethical design ensures 
              these systems are fair, transparent, and respect human rights and values.
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Choose a Scenario:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scenarios.map((scenario, index) => (
                <Card 
                  key={scenario.id} 
                  className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    state.completedScenarios.includes(scenario.id) ? 'border-green-200 dark:border-green-900' : ''
                  }`}
                  onClick={() => {
                    updateState({
                      currentScenario: index,
                      showIntro: false,
                      showDesignStudio: true
                    })
                  }}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{scenario.title}</CardTitle>
                      {state.completedScenarios.includes(scenario.id) && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <CardDescription className="text-xs">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Select Difficulty:</h3>
            <Tabs 
              defaultValue={state.difficulty}
              onValueChange={(value) => updateState({ 
                difficulty: value as 'beginner' | 'intermediate' | 'expert' 
              })}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="expert">Expert</TabsTrigger>
              </TabsList>
              
              <TabsContent value="beginner" className="space-y-2">
                <div className="text-sm">
                  <p>For those new to AI ethics:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Clear guidance on ethical principles</li>
                    <li>• Simplified scenarios with fewer constraints</li>
                    <li>• More time to make decisions</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="intermediate" className="space-y-2">
                <div className="text-sm">
                  <p>For those with some understanding of AI ethics:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• More complex scenarios with competing priorities</li>
                    <li>• Additional constraints to consider</li>
                    <li>• Time pressure for decisions</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="expert" className="space-y-2">
                <div className="text-sm">
                  <p>For experienced AI ethicists:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Complex scenarios with ethical dilemmas</li>
                    <li>• Strict constraints and competing stakeholder needs</li>
                    <li>• Significant time pressure</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => {}}>
            View Achievements
          </Button>
          <Button onClick={startGame}>
            Start Challenge
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Render the design studio
  const renderDesignStudio = () => {
    if (!state.showDesignStudio) return null
    
    const scenario = getCurrentScenario()
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{scenario.title}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </div>
            <Badge variant="outline">
              {state.currentScenario + 1}/{scenarios.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={state.currentTab}
            onValueChange={(value) => updateState({ 
              currentTab: value as 'requirements' | 'constraints' | 'stakeholders' | 'design' 
            })}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="constraints">Constraints</TabsTrigger>
              <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
              <TabsTrigger value="design">Your Design</TabsTrigger>
            </TabsList>
            
            <TabsContent value="requirements" className="space-y-4">
              <p className="text-sm">
                Select the requirements you want to include in your AI system design:
              </p>
              
              <div className="space-y-3">
                {scenario.requirements.map(req => {
                  const isSelected = state.designChoices.includes(req.id)
                  const principle = ethicalPrinciples[req.category]
                  
                  return (
                    <div 
                      key={req.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => toggleRequirement(req.id, req.category)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${principle.color}`}>
                          {principle.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{req.text}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Principle: {principle.title}
                          </div>
                        </div>
                        <div>
                          {isSelected ? (
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                          ) : (
                            <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="constraints" className="space-y-4">
              <p className="text-sm">
                Consider these constraints when designing your AI system:
              </p>
              
              <div className="space-y-3">
                {scenario.constraints.map(constraint => (
                  <Alert key={constraint.id}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Constraint</AlertTitle>
                    <AlertDescription>
                      {constraint.text}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="stakeholders" className="space-y-4">
              <p className="text-sm">
                Select the stakeholders whose needs you'll prioritize in your design:
              </p>
              
              <div className="space-y-3">
                {scenario.stakeholders.map(stakeholder => {
                  const isSelected = state.stakeholdersFocus.includes(stakeholder.id)
                  
                  return (
                    <div 
                      key={stakeholder.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-900' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => toggleStakeholder(stakeholder.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="font-medium">{stakeholder.name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Interests: {stakeholder.interests}
                          </div>
                        </div>
                        <div>
                          {isSelected ? (
                            <CheckCircle className="h-5 w-5 text-purple-500" />
                          ) : (
                            <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="font-semibold">Your Design Summary</h3>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Requirements Selected:</h4>
                  {state.designChoices.length > 0 ? (
                    <ul className="mt-2 space-y-1 text-sm">
                      {state.designChoices.map(id => {
                        const req = scenario.requirements.find(r => r.id === id)
                        return req ? (
                          <li key={id} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {req.text}
                          </li>
                        ) : null
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">No requirements selected yet</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Stakeholders Considered:</h4>
                  {state.stakeholdersFocus.length > 0 ? (
                    <ul className="mt-2 space-y-1 text-sm">
                      {state.stakeholdersFocus.map(id => {
                        const stakeholder = scenario.stakeholders.find(s => s.id === id)
                        return stakeholder ? (
                          <li key={id} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {stakeholder.name}
                          </li>
                        ) : null
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">No stakeholders selected yet</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Ethical Principles Applied:</h4>
                  {state.principlesApplied.size > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Array.from(state.principlesApplied).map(principle => {
                        const p = ethicalPrinciples[principle]
                        return p ? (
                          <Badge key={principle} variant="secondary" className="flex items-center gap-1">
                            <span className={p.color}>{p.icon}</span>
                            {p.title}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">No principles applied yet</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={submitDesign}
                  disabled={state.designChoices.length === 0 || state.stakeholdersFocus.length === 0}
                  className="mt-4"
                >
                  Submit Design
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => updateState({ showIntro: true, showDesignStudio: false })}>
            Back to Selection
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-sm">
              <span className="font-medium">Principles:</span> {state.principlesApplied.size}/{Object.keys(ethicalPrinciples).length}
            </div>
            <Progress 
              value={(state.principlesApplied.size / Object.keys(ethicalPrinciples).length) * 100} 
              className="w-24 h-2"
            />
          </div>
        </CardFooter>
      </Card>
    )
  }

  // Render the results
  const renderResults = () => {
    if (!state.showResults) return null
    
    const scenario = getCurrentScenario()
    
    // Calculate scores
    const requirementsScore = state.designChoices.length * 10
    const stakeholdersScore = state.stakeholdersFocus.length * 5
    const principlesScore = state.principlesApplied.size * 15
    
    // Bonuses
    const allRequirementsMet = state.designChoices.length === scenario.requirements.length
    const allRequirementsBonus = allRequirementsMet ? 20 : 0
    
    const allStakeholdersConsidered = state.stakeholdersFocus.length === scenario.stakeholders.length
    const allStakeholdersBonus = allStakeholdersConsidered ? 15 : 0
    
    const allPrinciplesApplied = state.principlesApplied.size === Object.keys(ethicalPrinciples).length
    const allPrinciplesBonus = allPrinciplesApplied ? 25 : 0
    
    // Total score for this scenario
    const totalScore = requirementsScore + stakeholdersScore + principlesScore + 
                      allRequirementsBonus + allStakeholdersBonus + allPrinciplesBonus
    
    // Max possible score
    const maxPossibleScore = (scenario.requirements.length * 10) + (scenario.stakeholders.length * 5) + 
                            (Object.keys(ethicalPrinciples).length * 15) + 20 + 15 + 25
    
    // Score percentage
    const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100)
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Design Evaluation: {scenario.title}</CardTitle>
          <CardDescription>
            See how your AI system design performed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold">{totalScore}</div>
            <div className="text-sm text-gray-500">points earned</div>
            <Progress value={scorePercentage} className="h-2 mt-2" />
            <div className="text-xs text-gray-500 mt-1">{scorePercentage}% of possible points</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{requirementsScore}</div>
                <div className="text-xs text-gray-500">
                  {state.designChoices.length}/{scenario.requirements.length} requirements
                </div>
                {allRequirementsMet && (
                  <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    +{allRequirementsBonus} Bonus
                  </Badge>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Stakeholders</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{stakeholdersScore}</div>
                <div className="text-xs text-gray-500">
                  {state.stakeholdersFocus.length}/{scenario.stakeholders.length} stakeholders
                </div>
                {allStakeholdersConsidered && (
                  <Badge className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                    +{allStakeholdersBonus} Bonus
                  </Badge>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Ethical Principles</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{principlesScore}</div>
                <div className="text-xs text-gray-500">
                  {state.principlesApplied.size}/{Object.keys(ethicalPrinciples).length} principles
                </div>
                {allPrinciplesApplied && (
                  <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    +{allPrinciplesBonus} Bonus
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <h3 className="font-semibold">Design Feedback</h3>
            <div className="mt-2 space-y-2 text-sm">
              {state.designChoices.length < scenario.requirements.length && (
                <p>
                  <span className="font-medium">Consider more requirements:</span> Your design 
                  addresses {state.designChoices.length} out of {scenario.requirements.length} requirements. 
                  Including more requirements would make your system more robust.
                </p>
              )}
              
              {state.stakeholdersFocus.length < scenario.stakeholders.length && (
                <p>
                  <span className="font-medium">Include more stakeholders:</span> Your design 
                  considers {state.stakeholdersFocus.length} out of {scenario.stakeholders.length} stakeholder groups. 
                  Considering all stakeholders leads to more inclusive AI systems.
                </p>
              )}
              
              {state.principlesApplied.size < Object.keys(ethicalPrinciples).length && (
                <p>
                  <span className="font-medium">Apply more ethical principles:</span> Your design 
                  incorporates {state.principlesApplied.size} out of {Object.keys(ethicalPrinciples).length} ethical principles. 
                  A comprehensive ethical framework addresses all principles.
                </p>
              )}
              
              {scorePercentage >= 80 && (
                <p className="text-green-700 dark:text-green-400">
                  <span className="font-medium">Excellent design!</span> Your AI system design 
                  demonstrates strong ethical considerations and stakeholder awareness.
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Total Score</h3>
            <div className="text-2xl font-bold">{state.score}</div>
            <div className="text-sm text-gray-500">across all scenarios</div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={returnToSelection}>
            Back to Selection
          </Button>
          <Button onClick={continueToNext}>
            Next Scenario
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Main render
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">AI World Builder</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Design ethical AI systems for real-world challenges
          </p>
        </div>
        
        {/* Game content based on state */}
        {renderIntro()}
        {renderDesignStudio()}
        {renderResults()}
      </div>
    </div>
  )
}
