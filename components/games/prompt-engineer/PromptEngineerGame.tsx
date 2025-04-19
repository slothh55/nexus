'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { useGameState } from '@/hooks/use-game-state'
import { useAchievements } from '@/hooks/use-achievements'
import { useConfetti } from '@/hooks/use-confetti'
import { AlertCircle, Brain, CheckCircle, Code, FileText, Lightbulb, MessageSquare, Sparkles, ThumbsDown, ThumbsUp, Trophy, Wand2 } from "lucide-react"

// Define the prompt engineering scenarios
const scenarios = [
  {
    id: 'image-generation',
    title: 'Image Generation',
    description: 'Create effective prompts for an AI image generator',
    task: 'Design a prompt to generate an image of a futuristic city with flying cars and tall skyscrapers at sunset.',
    context: 'You are using an AI image generator that creates images based on text descriptions. The more detailed and specific your prompt, the better the results will be.',
    examples: [
      { 
        prompt: 'city', 
        quality: 'poor',
        feedback: 'Too vague. This gives the AI very little information about what kind of city or style you want.'
      },
      { 
        prompt: 'futuristic city with flying cars', 
        quality: 'average',
        feedback: 'Better, but still missing details about lighting, atmosphere, and specific visual elements.'
      },
      { 
        prompt: 'A detailed digital painting of a futuristic metropolis with flying vehicles between glass skyscrapers, golden sunset light, cyberpunk style, highly detailed, 8k resolution', 
        quality: 'excellent',
        feedback: 'Excellent! This prompt specifies style, lighting, details, and artistic approach.'
      }
    ],
    tips: [
      'Include specific details about the scene (time of day, weather, etc.)',
      'Specify artistic style (photorealistic, anime, oil painting, etc.)',
      'Mention lighting conditions and atmosphere',
      'Include technical specifications (detailed, high resolution, etc.)',
      'Use descriptive adjectives for mood and feeling'
    ],
    keyElements: ['futuristic', 'flying cars', 'skyscrapers', 'sunset'],
    enhancementWords: ['detailed', 'vibrant', 'cinematic', 'atmospheric', 'dramatic', 'photorealistic', 'high resolution', 'wide angle', 'aerial view']
  },
  {
    id: 'story-writing',
    title: 'Story Generation',
    description: 'Create effective prompts for an AI story writer',
    task: 'Design a prompt to generate a short mystery story set in a small coastal town where strange events are occurring.',
    context: 'You are using an AI story generator that creates short stories based on prompts. The AI works best when given information about setting, characters, plot elements, and tone.',
    examples: [
      { 
        prompt: 'Write a mystery story', 
        quality: 'poor',
        feedback: 'Too vague. This doesn\'t provide any specific elements for the AI to work with.'
      },
      { 
        prompt: 'Write a mystery story about strange events in a coastal town', 
        quality: 'average',
        feedback: 'Better, but still missing details about characters, specific events, and the desired tone.'
      },
      { 
        prompt: 'Write a 500-word mystery story set in the foggy coastal town of Mist Harbor. The protagonist is a skeptical local journalist investigating reports of glowing lights seen offshore at night. Include elements of suspense and a twist ending that suggests something supernatural but with a possible scientific explanation.', 
        quality: 'excellent',
        feedback: 'Excellent! This prompt provides specific details about setting, character, plot elements, length, and tone.'
      }
    ],
    tips: [
      'Specify the length and format of the story',
      'Provide details about the setting (location, time period, atmosphere)',
      'Include information about key characters',
      'Suggest plot elements or story beats',
      'Specify the tone or mood (suspenseful, humorous, etc.)'
    ],
    keyElements: ['mystery', 'coastal town', 'strange events'],
    enhancementWords: ['suspenseful', 'foggy', 'isolated', 'local characters', 'twist ending', 'clues', 'investigation', 'unexplained', 'atmospheric']
  },
  {
    id: 'code-generation',
    title: 'Code Generation',
    description: 'Create effective prompts for an AI coding assistant',
    task: 'Design a prompt to generate Python code for a simple web scraper that extracts headlines from a news website.',
    context: 'You are using an AI coding assistant that generates code based on requirements. Clear, specific prompts with technical details will produce better code.',
    examples: [
      { 
        prompt: 'Write code for a web scraper', 
        quality: 'poor',
        feedback: 'Too vague. This doesn\'t specify the language, target website, or what data to extract.'
      },
      { 
        prompt: 'Write Python code to scrape news headlines', 
        quality: 'average',
        feedback: 'Better, but still missing details about the specific website, libraries to use, and how to handle the data.'
      },
      { 
        prompt: 'Write a Python function that uses the requests and BeautifulSoup libraries to scrape the top 5 headlines from the CNN homepage. The function should return the headlines as a list of strings. Include error handling for network issues and comments explaining the code. Show an example of how to call the function.', 
        quality: 'excellent',
        feedback: 'Excellent! This prompt specifies the language, libraries, target website, data to extract, return format, error handling, and documentation requirements.'
      }
    ],
    tips: [
      'Specify the programming language and version',
      'Mention specific libraries or frameworks to use',
      'Clearly define inputs, outputs, and functionality',
      'Request error handling and edge cases',
      'Ask for comments or documentation',
      'Provide examples of expected behavior'
    ],
    keyElements: ['Python', 'web scraper', 'news website', 'headlines'],
    enhancementWords: ['function', 'BeautifulSoup', 'requests', 'error handling', 'comments', 'return value', 'example usage', 'specific website']
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description: 'Create effective prompts for an AI data analysis assistant',
    task: 'Design a prompt to generate a data analysis plan for customer purchase data to identify buying patterns and improve marketing strategies.',
    context: 'You are using an AI assistant to help with data analysis planning. The AI can suggest analysis approaches, techniques, and visualizations based on your data and goals.',
    examples: [
      { 
        prompt: 'Analyze customer data', 
        quality: 'poor',
        feedback: 'Too vague. This doesn\'t specify what kind of data you have or what insights you\'re looking for.'
      },
      { 
        prompt: 'How to analyze customer purchase data to improve marketing', 
        quality: 'average',
        feedback: 'Better, but still missing details about the specific data fields available, business context, and analysis techniques of interest.'
      },
      { 
        prompt: 'I have a dataset of customer purchases with the following columns: customer_id, age, gender, location, product_category, product_id, purchase_amount, purchase_date, and previous_purchases. I want to analyze this data to identify customer segments, purchasing patterns, and seasonal trends to optimize our marketing campaigns. Please suggest a step-by-step analysis plan including data preprocessing steps, appropriate statistical methods, and visualization techniques. Also recommend how we might use the insights to create targeted marketing strategies.', 
        quality: 'excellent',
        feedback: 'Excellent! This prompt provides specific details about the data structure, analysis goals, and desired outputs.'
      }
    ],
    tips: [
      'Describe the data structure and available fields',
      'Clearly state the analysis objectives',
      'Mention any specific techniques or approaches you\'re interested in',
      'Specify the format of the desired output (report, code, visualizations)',
      'Provide context about how the insights will be used'
    ],
    keyElements: ['customer purchase data', 'buying patterns', 'marketing strategies'],
    enhancementWords: ['segmentation', 'trends', 'statistical analysis', 'visualization', 'preprocessing', 'actionable insights', 'specific metrics', 'data fields']
  },
  {
    id: 'educational-content',
    title: 'Educational Content',
    description: 'Create effective prompts for generating educational materials',
    task: 'Design a prompt to create an educational lesson about climate change for middle school students.',
    context: 'You are using an AI assistant to help create educational content. The AI can generate age-appropriate lessons, activities, and explanations based on your requirements.',
    examples: [
      { 
        prompt: 'Create a lesson about climate change', 
        quality: 'poor',
        feedback: 'Too vague. This doesn\'t specify the target age group, learning objectives, or format of the lesson.'
      },
      { 
        prompt: 'Create a climate change lesson for middle school students', 
        quality: 'average',
        feedback: 'Better, but still missing details about specific learning objectives, activities, and how to make it engaging for the target age group.'
      },
      { 
        prompt: 'Create a 45-minute lesson plan about climate change for 7th-grade science students. The lesson should explain the greenhouse effect, human contributions to climate change, and potential solutions. Include an engaging opening activity, a main explanation with simple analogies, a hands-on experiment that demonstrates the greenhouse effect using household items, discussion questions, and a brief assessment. The content should be scientifically accurate but accessible to 12-13 year olds, avoid political controversy, and emphasize positive actions students can take.', 
        quality: 'excellent',
        feedback: 'Excellent! This prompt provides specific details about the target audience, learning objectives, lesson structure, activities, and tone.'
      }
    ],
    tips: [
      'Specify the target age group or grade level',
      'Define clear learning objectives',
      'Mention the desired format and length',
      'Request specific types of activities or assessments',
      'Indicate the tone and level of complexity',
      'Mention any sensitive aspects to handle carefully'
    ],
    keyElements: ['climate change', 'middle school', 'educational lesson'],
    enhancementWords: ['engaging', 'interactive', 'age-appropriate', 'learning objectives', 'activities', 'visual aids', 'assessment', 'simplified explanations']
  }
]

// Define the game achievements
const achievements = [
  { id: 'first-prompt', title: 'Prompt Apprentice', description: 'Create your first effective prompt', icon: <MessageSquare className="h-4 w-4" />, xp: 50 },
  { id: 'all-scenarios', title: 'Prompt Master', description: 'Complete all prompt engineering scenarios', icon: <Trophy className="h-4 w-4" />, xp: 200 },
  { id: 'perfect-score', title: 'Wordsmith', description: 'Achieve a perfect score on any prompt', icon: <Sparkles className="h-4 w-4" />, xp: 100 },
  { id: 'key-elements', title: 'Detail Detective', description: 'Include all key elements in a prompt', icon: <CheckCircle className="h-4 w-4" />, xp: 75 },
  { id: 'enhancement-expert', title: 'Enhancement Expert', description: 'Use 5+ enhancement words in a single prompt', icon: <Wand2 className="h-4 w-4" />, xp: 125 }
]

export function PromptEngineerGame() {
  // Game state
  const [state, setState] = useState({
    currentScenario: 0,
    score: 0,
    showIntro: true,
    showPromptStudio: false,
    showResults: false,
    currentPrompt: '',
    submittedPrompts: [] as {scenarioId: string, prompt: string, score: number}[],
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'expert',
    currentTab: 'task' as 'task' | 'examples' | 'tips' | 'prompt',
    promptFeedback: null as null | {
      score: number,
      keyElementsFound: string[],
      enhancementsFound: string[],
      feedback: string,
      suggestions: string[]
    }
  })

  // Achievements and confetti hooks
  const { addAchievement, achievements: earnedAchievements } = useAchievements('prompt-engineer')
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
      showPromptStudio: true,
      showResults: false,
      currentPrompt: '',
      currentTab: 'task'
    })
  }

  // Handle prompt input change
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateState({ currentPrompt: e.target.value })
  }

  // Submit prompt
  const submitPrompt = () => {
    if (!state.currentPrompt.trim()) return
    
    const scenario = getCurrentScenario()
    
    // Analyze prompt quality
    const promptFeedback = analyzePrompt(state.currentPrompt, scenario)
    
    // Add to submitted prompts
    const newSubmittedPrompts = [...state.submittedPrompts, {
      scenarioId: scenario.id,
      prompt: state.currentPrompt,
      score: promptFeedback.score
    }]
    
    updateState({
      promptFeedback,
      submittedPrompts: newSubmittedPrompts,
      showPromptStudio: false,
      showResults: true,
      score: state.score + promptFeedback.score
    })
    
    // Check for achievements
    if (state.submittedPrompts.length === 0) {
      addAchievement('first-prompt')
    }
    
    if (promptFeedback.score >= 95) {
      if (!earnedAchievements.includes('perfect-score')) {
        addAchievement('perfect-score')
        triggerConfetti()
      }
    }
    
    if (promptFeedback.keyElementsFound.length === scenario.keyElements.length) {
      if (!earnedAchievements.includes('key-elements')) {
        addAchievement('key-elements')
      }
    }
    
    if (promptFeedback.enhancementsFound.length >= 5) {
      if (!earnedAchievements.includes('enhancement-expert')) {
        addAchievement('enhancement-expert')
        triggerConfetti()
      }
    }
    
    // Check if all scenarios completed
    const uniqueCompletedScenarios = new Set([...newSubmittedPrompts.map(p => p.scenarioId)])
    if (uniqueCompletedScenarios.size === scenarios.length && !earnedAchievements.includes('all-scenarios')) {
      addAchievement('all-scenarios')
      triggerConfetti()
    }
  }

  // Analyze prompt quality
  const analyzePrompt = (prompt: string, scenario: typeof scenarios[0]) => {
    const promptLower = prompt.toLowerCase()
    
    // Check for key elements
    const keyElementsFound = scenario.keyElements.filter(element => 
      promptLower.includes(element.toLowerCase())
    )
    
    // Check for enhancement words
    const enhancementsFound = scenario.enhancementWords.filter(word => 
      promptLower.includes(word.toLowerCase())
    )
    
    // Calculate base score
    let score = 0
    
    // Points for length (up to 20 points)
    const lengthScore = Math.min(20, prompt.length / 10)
    score += lengthScore
    
    // Points for key elements (up to 40 points)
    const keyElementsScore = (keyElementsFound.length / scenario.keyElements.length) * 40
    score += keyElementsScore
    
    // Points for enhancement words (up to 40 points)
    const enhancementsScore = Math.min(40, enhancementsFound.length * 8)
    score += enhancementsScore
    
    // Round the score
    score = Math.round(score)
    
    // Generate feedback
    let feedback = ''
    if (score >= 90) {
      feedback = 'Excellent prompt! You\'ve included specific details, key elements, and enhancement words that will produce great results.'
    } else if (score >= 70) {
      feedback = 'Good prompt! You\'ve included many important elements, but there\'s still room for improvement.'
    } else if (score >= 50) {
      feedback = 'Decent prompt. You\'ve included some key elements, but it could be more specific and detailed.'
    } else {
      feedback = 'Basic prompt that needs improvement. Try adding more specific details and descriptive elements.'
    }
    
    // Generate suggestions
    const suggestions: string[] = []
    
    if (keyElementsFound.length < scenario.keyElements.length) {
      const missingElements = scenario.keyElements.filter(el => !keyElementsFound.includes(el))
      suggestions.push(`Include these key elements: ${missingElements.join(', ')}`)
    }
    
    if (enhancementsFound.length < 3) {
      suggestions.push(`Add more descriptive words like: ${scenario.enhancementWords.slice(0, 5).join(', ')}`)
    }
    
    if (prompt.length < 50) {
      suggestions.push('Make your prompt longer and more detailed')
    }
    
    return {
      score,
      keyElementsFound,
      enhancementsFound,
      feedback,
      suggestions
    }
  }

  // Continue to next scenario
  const continueToNext = () => {
    const nextIndex = (state.currentScenario + 1) % scenarios.length
    
    updateState({
      currentScenario: nextIndex,
      showResults: false,
      showPromptStudio: true,
      currentPrompt: '',
      promptFeedback: null,
      currentTab: 'task'
    })
  }

  // Set difficulty level
  const setDifficulty = (level: 'beginner' | 'intermediate' | 'expert') => {
    updateState({ difficulty: level })
  }

  return (
    <div className="space-y-6">
      {/* Intro Dialog */}
      <Dialog open={state.showIntro} onOpenChange={(open) => !open && updateState({ showIntro: false })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Prompt Engineer</DialogTitle>
            <DialogDescription>
              Master the art of creating effective prompts for AI systems
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>
              As a Prompt Engineer, you'll learn how to craft clear, specific prompts that get the best results from AI systems.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <h4 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                Why Prompt Engineering Matters:
              </h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>The quality of AI outputs depends heavily on the quality of your prompts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-amber-500" />
                  <span>Effective prompts save time and reduce the need for revisions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-amber-500" />
                  <span>Different AI tools require different prompt strategies</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">How to play:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Review the prompt task and context</li>
                <li>Study example prompts to understand what works</li>
                <li>Use the provided tips to improve your prompts</li>
                <li>Write your own prompt for the scenario</li>
                <li>Get feedback and improve your prompt engineering skills</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Choose difficulty:</h4>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => setDifficulty('beginner')} 
                  variant={state.difficulty === 'beginner' ? 'default' : 'outline'}
                >
                  Beginner
                </Button>
                <Button 
                  onClick={() => setDifficulty('intermediate')} 
                  variant={state.difficulty === 'intermediate' ? 'default' : 'outline'}
                >
                  Intermediate
                </Button>
                <Button 
                  onClick={() => setDifficulty('expert')} 
                  variant={state.difficulty === 'expert' ? 'default' : 'outline'}
                >
                  Expert
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {state.difficulty === 'beginner' && 'Beginner: More guidance with detailed examples and tips.'}
                {state.difficulty === 'intermediate' && 'Intermediate: Fewer examples and more complex scenarios.'}
                {state.difficulty === 'expert' && 'Expert: Minimal guidance with challenging prompt tasks.'}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={startGame} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Start Engineering
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Prompt Studio */}
      {state.showPromptStudio && (
        <div className="space-y-4">
          {/* Scenario Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{getCurrentScenario()?.title}</h2>
              <p className="text-muted-foreground">{getCurrentScenario()?.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-xl font-bold">{state.score}</span>
              </div>
              <Badge variant="outline" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                Scenario {state.currentScenario + 1}/{scenarios.length}
              </Badge>
            </div>
          </div>
          
          {/* Prompt Engineering Tabs */}
          <Tabs value={state.currentTab} onValueChange={(value) => updateState({ currentTab: value as any })}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="task">Task</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
              <TabsTrigger value="prompt">Your Prompt</TabsTrigger>
            </TabsList>
            
            {/* Task Tab */}
            <TabsContent value="task" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt Task</CardTitle>
                  <CardDescription>
                    Understand what you need to create a prompt for
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Your Task:</h3>
                    <p>{getCurrentScenario()?.task}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Context:</h3>
                    <p className="text-muted-foreground">{getCurrentScenario()?.context}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Elements to Include:</h3>
                    <div className="flex flex-wrap gap-2">
                      {getCurrentScenario()?.keyElements.map((element) => (
                        <Badge key={element} variant="outline">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => updateState({ currentTab: 'examples' })}>
                    Next: See Examples
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Example Prompts</CardTitle>
                  <CardDescription>
                    Study these examples to understand what makes an effective prompt
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getCurrentScenario()?.examples.map((example, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className={`p-3 flex items-center gap-2 ${
                        example.quality === 'poor' ? 'bg-red-50 dark:bg-red-900/20' :
                        example.quality === 'average' ? 'bg-amber-50 dark:bg-amber-900/20' :
                        'bg-green-50 dark:bg-green-900/20'
                      }`}>
                        {example.quality === 'poor' ? (
                          <ThumbsDown className="h-4 w-4 text-red-500" />
                        ) : example.quality === 'average' ? (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <ThumbsUp className="h-4 w-4 text-green-500" />
                        )}
                        <span className="font-medium capitalize">{example.quality} Example</span>
                      </div>
                      <div className="p-3 bg-muted/20">
                        <p className="font-mono text-sm whitespace-pre-wrap">{example.prompt}</p>
                      </div>
                      <div className="p-3 border-t">
                        <p className="text-sm">{example.feedback}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => updateState({ currentTab: 'tips' })}>
                    Next: Prompt Tips
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Tips Tab */}
            <TabsContent value="tips" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt Engineering Tips</CardTitle>
                  <CardDescription>
                    Use these tips to improve your prompt
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {getCurrentScenario()?.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                          <Lightbulb className="h-4 w-4 text-primary" />
                        </div>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Enhancement Words:</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Including these words can significantly improve your prompt quality:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getCurrentScenario()?.enhancementWords.map((word) => (
                        <Badge key={word} variant="secondary">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => updateState({ currentTab: 'prompt' })}>
                    Next: Write Your Prompt
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Prompt Writing Tab */}
            <TabsContent value="prompt" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Write Your Prompt</CardTitle>
                  <CardDescription>
                    Create an effective prompt for this scenario
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-3 rounded-lg mb-4">
                    <h3 className="font-medium mb-1">Task Reminder:</h3>
                    <p className="text-sm">{getCurrentScenario()?.task}</p>
                  </div>
                  
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                      Your Prompt:
                    </label>
                    <Textarea
                      id="prompt"
                      placeholder="Write your prompt here..."
                      className="min-h-[200px] font-mono"
                      value={state.currentPrompt}
                      onChange={handlePromptChange}
                    />
                  </div>
                  
                  {state.difficulty === 'beginner' && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="font-medium">Reminder:</p>
                        <p>Be specific, include key elements, and use descriptive language. The more detailed your prompt, the better the results will be.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => updateState({ currentTab: 'tips' })}>
                    Back to Tips
                  </Button>
                  <Button 
                    onClick={submitPrompt}
                    disabled={!state.currentPrompt.trim()}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  >
                    Submit Prompt
                  </Button>
                </CardFooter>
              </Card>
              
              {!state.currentPrompt.trim() && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Empty Prompt</AlertTitle>
                  <AlertDescription>
                    Please write a prompt before submitting.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {/* Results Dialog */}
      <Dialog open={state.showResults} onOpenChange={(open) => !open && updateState({ showResults: false })}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Prompt Analysis</DialogTitle>
            <DialogDescription>
              Feedback on your prompt for {getCurrentScenario()?.title}
            </DialogDescription>
          </DialogHeader>
          
          {state.promptFeedback && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-indigo-500/10 p-4">
                  <Wand2 className="h-8 w-8 text-indigo-500" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold">Prompt Score: {state.promptFeedback.score}/100</h3>
                <p className="text-muted-foreground">
                  {state.promptFeedback.score >= 90 ? "Outstanding! You've mastered prompt engineering principles." :
                   state.promptFeedback.score >= 70 ? "Great job! Your prompt is effective but has room for improvement." :
                   state.promptFeedback.score >= 50 ? "Good effort. Your prompt covers the basics but needs more detail." :
                   "Keep practicing. Your prompt needs significant improvement."}
                </p>
              </div>
              
              {/* Your Prompt */}
              <div className="bg-muted/20 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Your Prompt:</h4>
                <p className="whitespace-pre-wrap font-mono text-sm">{state.currentPrompt}</p>
              </div>
              
              {/* Feedback */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                <h4 className="font-medium mb-2">Feedback:</h4>
                <p className="text-sm">{state.promptFeedback.feedback}</p>
                
                {state.promptFeedback.suggestions.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-1">Suggestions for improvement:</h5>
                    <ul className="text-sm space-y-1">
                      {state.promptFeedback.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Analysis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/20 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Key Elements Found:</h4>
                  <div className="space-y-1">
                    {getCurrentScenario()?.keyElements.map(element => (
                      <div key={element} className="flex items-center gap-2 text-sm">
                        {state.promptFeedback?.keyElementsFound.includes(element) ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className={!state.promptFeedback?.keyElementsFound.includes(element) ? "text-muted-foreground" : ""}>
                          {element}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-muted/20 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Enhancement Words Used:</h4>
                  {state.promptFeedback.enhancementsFound.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {state.promptFeedback.enhancementsFound.map(word => (
                        <Badge key={word} variant="secondary">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No enhancement words found. Try adding descriptive words to improve your prompt.</p>
                  )}
                </div>
              </div>
              
              {/* Score Breakdown */}
              <div className="bg-muted/20 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Score Breakdown:</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Prompt Length & Detail</span>
                      <span>{Math.min(20, state.currentPrompt.length / 10)}/20</span>
                    </div>
                    <Progress value={(Math.min(20, state.currentPrompt.length / 10) / 20) * 100} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Key Elements</span>
                      <span>{(state.promptFeedback.keyElementsFound.length / getCurrentScenario()?.keyElements.length) * 40}/40</span>
                    </div>
                    <Progress value={(state.promptFeedback.keyElementsFound.length / getCurrentScenario()?.keyElements.length) * 100} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Enhancement Words</span>
                      <span>{Math.min(40, state.promptFeedback.enhancementsFound.length * 8)}/40</span>
                    </div>
                    <Progress value={(Math.min(40, state.promptFeedback.enhancementsFound.length * 8) / 40) * 100} className="h-1" />
                  </div>
                </div>
              </div>
              
              {/* Learning Points */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <h4 className="font-medium mb-2">Key Learning Points:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Specific, detailed prompts produce better AI outputs</li>
                  <li>• Including key contextual elements helps the AI understand your requirements</li>
                  <li>• Descriptive language and technical specifications improve results</li>
                  <li>• Different AI tools (image, text, code) respond to different prompt strategies</li>
                  <li>• Effective prompts save time and reduce the need for multiple iterations</li>
                </ul>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={continueToNext}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              Next Scenario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
