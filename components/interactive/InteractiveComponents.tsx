'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ThumbsUp, 
  ThumbsDown,
  Lightbulb,
  BookOpen,
  FileText,
  PenTool,
  Users,
  Sparkles
} from 'lucide-react'

// Interactive discussion component
export function InteractiveDiscussion({ 
  topic, 
  initialPrompt, 
  exampleResponses = [], 
  feedbackPoints = [],
  onComplete = () => {}
}) {
  const [userResponse, setUserResponse] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showExamples, setShowExamples] = useState(false)
  const [completed, setCompleted] = useState(false)
  
  const handleSubmit = () => {
    if (userResponse.trim().length < 20) {
      setFeedback('Please provide a more detailed response to get meaningful feedback.')
      return
    }
    
    setSubmitted(true)
    
    // Generate feedback based on keywords in the response
    let generatedFeedback = "Thank you for your thoughtful response! "
    let pointsFound = 0
    
    feedbackPoints.forEach(point => {
      if (userResponse.toLowerCase().includes(point.keyword.toLowerCase())) {
        generatedFeedback += point.feedback + " "
        pointsFound++
      }
    })
    
    if (pointsFound === 0) {
      generatedFeedback += "Consider exploring these aspects in your thinking: " + 
        feedbackPoints.map(p => p.hint).join(", ") + "."
    } else if (pointsFound < feedbackPoints.length / 2) {
      generatedFeedback += "You've made some good points! You might also consider: " + 
        feedbackPoints.filter(p => !userResponse.toLowerCase().includes(p.keyword.toLowerCase()))
          .map(p => p.hint).join(", ") + "."
    } else {
      generatedFeedback += "Excellent analysis that covers multiple perspectives!"
    }
    
    setFeedback(generatedFeedback)
  }
  
  const handleComplete = () => {
    setCompleted(true)
    onComplete()
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">Discussion: {topic}</CardTitle>
        </div>
        <CardDescription>
          Share your thoughts on this topic to deepen your understanding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="font-medium mb-2">Prompt:</p>
          <p>{initialPrompt}</p>
        </div>
        
        {!submitted ? (
          <>
            <div>
              <Label htmlFor="response">Your Response:</Label>
              <Textarea
                id="response"
                placeholder="Type your thoughts here..."
                className="min-h-[150px] mt-2"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
            </div>
            
            {showExamples && exampleResponses.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-500" />
                  Example Responses:
                </p>
                <div className="space-y-2">
                  {exampleResponses.map((example, index) => (
                    <div key={index} className="text-sm border-l-2 border-blue-200 pl-3 py-1">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowExamples(!showExamples)}
              >
                {showExamples ? 'Hide Examples' : 'Show Examples'}
              </Button>
              <Button onClick={handleSubmit}>Submit Response</Button>
            </div>
          </>
        ) : (
          <>
            <div className="border p-4 rounded-lg">
              <p className="font-medium mb-2">Your Response:</p>
              <p>{userResponse}</p>
            </div>
            
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Feedback</AlertTitle>
              <AlertDescription>
                {feedback}
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-end">
              {!completed ? (
                <Button onClick={handleComplete}>
                  Mark as Complete
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Drag and drop activity component
export function DragDropActivity({ 
  title, 
  description, 
  items = [], 
  categories = [],
  onComplete = () => {}
}) {
  const [draggedItem, setDraggedItem] = useState(null)
  const [categorizedItems, setCategorizedItems] = useState({})
  const [feedback, setFeedback] = useState('')
  const [completed, setCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  
  // Initialize categorized items
  React.useEffect(() => {
    const initialState = {}
    categories.forEach(category => {
      initialState[category.id] = []
    })
    initialState['uncategorized'] = [...items]
    setCategorizedItems(initialState)
  }, [])
  
  const handleDragStart = (item) => {
    setDraggedItem(item)
  }
  
  const handleDragOver = (e, categoryId) => {
    e.preventDefault()
  }
  
  const handleDrop = (e, categoryId) => {
    e.preventDefault()
    
    if (!draggedItem) return
    
    // Find which category currently has the item
    let sourceCategory = 'uncategorized'
    Object.keys(categorizedItems).forEach(catId => {
      if (categorizedItems[catId].find(item => item.id === draggedItem.id)) {
        sourceCategory = catId
      }
    })
    
    // Remove from source category
    const updatedCategories = {...categorizedItems}
    updatedCategories[sourceCategory] = updatedCategories[sourceCategory].filter(
      item => item.id !== draggedItem.id
    )
    
    // Add to target category
    updatedCategories[categoryId] = [...updatedCategories[categoryId], draggedItem]
    
    setCategorizedItems(updatedCategories)
    setDraggedItem(null)
    setFeedback('')
  }
  
  const checkAnswers = () => {
    let correct = 0
    let total = items.length
    let feedbackText = ''
    
    // Check each category
    categories.forEach(category => {
      const itemsInCategory = categorizedItems[category.id] || []
      
      itemsInCategory.forEach(item => {
        if (item.correctCategory === category.id) {
          correct++
        }
      })
    })
    
    const percentage = Math.round((correct / total) * 100)
    
    if (percentage === 100) {
      feedbackText = "Perfect! You've correctly categorized all items."
      setCompleted(true)
      onComplete()
    } else if (percentage >= 80) {
      feedbackText = `Great job! You got ${percentage}% correct. Review your answers to achieve 100%.`
    } else if (percentage >= 50) {
      feedbackText = `Good effort! You got ${percentage}% correct. Try reviewing the items again.`
    } else {
      feedbackText = `You got ${percentage}% correct. Try using the hint button for help with categorization.`
    }
    
    setFeedback(feedbackText)
  }
  
  const resetActivity = () => {
    const initialState = {}
    categories.forEach(category => {
      initialState[category.id] = []
    })
    initialState['uncategorized'] = [...items]
    setCategorizedItems(initialState)
    setFeedback('')
    setShowHint(false)
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PenTool className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="font-medium mb-2">Instructions:</p>
          <p>Drag each item to its correct category. Click "Check Answers" when you're done.</p>
        </div>
        
        {/* Feedback */}
        {feedback && (
          <Alert className={`${
            feedback.includes('Perfect') 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          }`}>
            {feedback.includes('Perfect') 
              ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              : <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            }
            <AlertTitle>Feedback</AlertTitle>
            <AlertDescription>
              {feedback}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Hint */}
        {showHint && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              Hint:
            </p>
            <ul className="space-y-1 text-sm">
              {categories.map(category => (
                <li key={category.id}>
                  <span className="font-medium">{category.name}:</span> {category.hint}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(category => (
            <div 
              key={category.id}
              className="border rounded-lg p-4 min-h-[150px]"
              onDragOver={(e) => handleDragOver(e, category.id)}
              onDrop={(e) => handleDrop(e, category.id)}
            >
              <h3 className="font-medium mb-3">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {(categorizedItems[category.id] || []).map(item => (
                  <div
                    key={item.id}
                    className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-md text-sm cursor-move"
                    draggable
                    onDragStart={() => handleDragStart(item)}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Uncategorized items */}
        <div 
          className="border rounded-lg p-4"
          onDragOver={(e) => handleDragOver(e, 'uncategorized')}
          onDrop={(e) => handleDrop(e, 'uncategorized')}
        >
          <h3 className="font-medium mb-3">Items to Categorize:</h3>
          <div className="flex flex-wrap gap-2">
            {(categorizedItems['uncategorized'] || []).map(item => (
              <div
                key={item.id}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm cursor-move"
                draggable
                onDragStart={() => handleDragStart(item)}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex justify-between">
          <div>
            <Button variant="outline" onClick={() => setShowHint(!showHint)}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            <Button variant="outline" onClick={resetActivity} className="ml-2">
              Reset
            </Button>
          </div>
          <div>
            {completed ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                <CheckCircle className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            ) : (
              <Button onClick={checkAnswers}>
                Check Answers
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Scenario-based learning exercise component
export function ScenarioExercise({ 
  title, 
  scenario, 
  questions = [], 
  onComplete = () => {}
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const currentQuestion = questions[currentQuestionIndex]
  
  const handleAnswer = (answer) => {
    const updatedAnswers = {...answers}
    updatedAnswers[currentQuestion.id] = answer
    setAnswers(updatedAnswers)
  }
  
  const handleMultipleChoiceAnswer = (optionId) => {
    handleAnswer(optionId)
  }
  
  const handleTextAnswer = (text) => {
    handleAnswer(text)
  }
  
  const handleCheckboxAnswer = (optionId, checked) => {
    const currentAnswer = answers[currentQuestion.id] || []
    let updatedAnswer
    
    if (checked) {
      updatedAnswer = [...currentAnswer, optionId]
    } else {
      updatedAnswer = currentAnswer.filter(id => id !== optionId)
    }
    
    handleAnswer(updatedAnswer)
  }
  
  const handleSubmit = () => {
    setShowFeedback(true)
  }
  
  const handleNext = () => {
    setShowFeedback(false)
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setProgress(Math.round(((currentQuestionIndex + 1) / questions.length) * 100))
    } else {
      setCompleted(true)
      setProgress(100)
      onComplete()
    }
  }
  
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <RadioGroup 
            value={answers[currentQuestion.id] || ''} 
            onValueChange={handleMultipleChoiceAnswer}
          >
            <div className="space-y-2">
              {currentQuestion.options.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id}>{option.text}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )
        
      case 'text':
        return (
          <div>
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[100px]"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleTextAnswer(e.target.value)}
            />
          </div>
        )
        
      case 'checkbox':
        return (
          <div className="space-y-2">
            {currentQuestion.options.map(option => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.id} 
                  checked={(answers[currentQuestion.id] || []).includes(option.id)}
                  onCheckedChange={(checked) => handleCheckboxAnswer(option.id, checked)}
                />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </div>
        )
        
      default:
        return <p>Question type not supported</p>
    }
  }
  
  const renderFeedback = () => {
    const answer = answers[currentQuestion.id]
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        const selectedOption = currentQuestion.options.find(option => option.id === answer)
        return (
          <Alert className={`${
            selectedOption?.correct 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          }`}>
            {selectedOption?.correct 
              ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              : <XCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            }
            <AlertTitle>
              {selectedOption?.correct ? 'Correct!' : 'Not quite right'}
            </AlertTitle>
            <AlertDescription>
              {selectedOption?.feedback || currentQuestion.feedback}
            </AlertDescription>
          </Alert>
        )
        
      case 'checkbox':
        const allCorrect = currentQuestion.options
          .filter(option => option.correct)
          .every(option => (answer || []).includes(option.id))
          
        const noIncorrect = (answer || []).every(answerId => 
          currentQuestion.options.find(option => option.id === answerId)?.correct
        )
        
        const isCorrect = allCorrect && noIncorrect
        
        return (
          <Alert className={`${
            isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          }`}>
            {isCorrect 
              ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              : <XCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            }
            <AlertTitle>
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </AlertTitle>
            <AlertDescription>
              {currentQuestion.feedback}
              {!isCorrect && (
                <div className="mt-2">
                  <p className="font-medium">Correct answers:</p>
                  <ul className="list-disc list-inside">
                    {currentQuestion.options
                      .filter(option => option.correct)
                      .map(option => (
                        <li key={option.id}>{option.text}</li>
                      ))
                    }
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )
        
      case 'text':
        // For text answers, we just provide general feedback
        return (
          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle>Feedback</AlertTitle>
            <AlertDescription>
              {currentQuestion.feedback}
            </AlertDescription>
          </Alert>
        )
        
      default:
        return null
    }
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>
          Scenario-based learning exercise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {!completed ? (
          <>
            {/* Scenario */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="font-medium mb-2">Scenario:</p>
              <p>{scenario}</p>
            </div>
            
            {/* Question */}
            <div>
              <h3 className="font-medium mb-2">
                Question {currentQuestionIndex + 1} of {questions.length}:
              </h3>
              <p className="mb-4">{currentQuestion.question}</p>
              
              {renderQuestion()}
            </div>
            
            {/* Feedback */}
            {showFeedback && (
              <div className="mt-4">
                {renderFeedback()}
              </div>
            )}
            
            {/* Controls */}
            <div className="flex justify-end">
              {!showFeedback ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={
                    answers[currentQuestion.id] === undefined || 
                    (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0) ||
                    (typeof answers[currentQuestion.id] === 'string' && answers[currentQuestion.id].trim() === '')
                  }
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Exercise'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 dark:bg-green-800 p-3">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Exercise Completed!</h3>
              <p>
                You've successfully completed this scenario-based exercise. 
                Great job applying your knowledge to a real-world situation!
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Key Takeaways:</h3>
              <ul className="space-y-1">
                {questions.map((question, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 text-blue-500">•</div>
                    <span>{question.takeaway || question.feedback}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Interactive feedback component
export function InteractiveFeedback({
  title,
  description,
  questions = [],
  onComplete = () => {}
}) {
  const [responses, setResponses] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)
  
  const handleResponse = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value
    })
  }
  
  const handleSubmit = () => {
    setSubmitted(true)
  }
  
  const handleComplete = () => {
    setCompleted(true)
    onComplete()
  }
  
  const allQuestionsAnswered = questions.every(q => responses[q.id] !== undefined)
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!submitted ? (
          <>
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id}>{question.text}</Label>
                
                {question.type === 'rating' ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(value => (
                        <Button
                          key={value}
                          type="button"
                          variant={responses[question.id] === value ? "default" : "outline"}
                          className="h-10 w-10 p-0"
                          onClick={() => handleResponse(question.id, value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>{question.lowLabel}</span>
                      <span className="mx-2">to</span>
                      <span>{question.highLabel}</span>
                    </div>
                  </div>
                ) : question.type === 'text' ? (
                  <Textarea
                    id={question.id}
                    placeholder="Type your answer here..."
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponse(question.id, e.target.value)}
                  />
                ) : question.type === 'boolean' ? (
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant={responses[question.id] === true ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => handleResponse(question.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant={responses[question.id] === false ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => handleResponse(question.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      No
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
              >
                Submit Feedback
              </Button>
            </div>
          </>
        ) : (
          <>
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Thank You!</AlertTitle>
              <AlertDescription>
                Your feedback has been submitted successfully. This helps us improve the learning experience.
              </AlertDescription>
            </Alert>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Responses:</h3>
              <div className="space-y-2">
                {questions.map((question) => (
                  <div key={question.id} className="text-sm">
                    <span className="font-medium">{question.text}</span>
                    <div className="mt-1">
                      {question.type === 'rating' ? (
                        <Badge variant="outline">
                          Rating: {responses[question.id]}/5
                        </Badge>
                      ) : question.type === 'boolean' ? (
                        <Badge variant="outline" className={
                          responses[question.id] 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }>
                          {responses[question.id] ? 'Yes' : 'No'}
                        </Badge>
                      ) : (
                        <p className="text-muted-foreground">{responses[question.id]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              {!completed ? (
                <Button onClick={handleComplete}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Progress tracking component
export function ProgressTracker({
  moduleTitle,
  totalActivities,
  completedActivities,
  skills = []
}) {
  const completionPercentage = Math.round((completedActivities / totalActivities) * 100)
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">Your Progress: {moduleTitle}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Overall Completion</span>
            <span>{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {completedActivities} of {totalActivities} activities completed
          </p>
        </div>
        
        {skills.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Skills Development:</h3>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        skill.level >= 80 ? 'bg-green-500' :
                        skill.level >= 50 ? 'bg-blue-500' :
                        skill.level >= 20 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Next Steps:
          </h3>
          {completionPercentage < 100 ? (
            <p className="text-sm">
              Continue working through the remaining activities to complete this module and master these skills.
            </p>
          ) : (
            <p className="text-sm">
              Congratulations on completing this module! You can now move on to the next module or revisit activities to reinforce your learning.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Collaborative learning component
export function CollaborativeLearning({
  title,
  description,
  task,
  roles = [],
  onComplete = () => {}
}) {
  const [selectedRole, setSelectedRole] = useState(null)
  const [contribution, setContribution] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)
  
  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }
  
  const handleSubmit = () => {
    if (!selectedRole || contribution.trim().length < 20) return
    setSubmitted(true)
  }
  
  const handleComplete = () => {
    setCompleted(true)
    onComplete()
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Task description */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="font-medium mb-2">Collaborative Task:</p>
          <p>{task}</p>
        </div>
        
        {!submitted ? (
          <>
            {/* Role selection */}
            <div>
              <h3 className="font-medium mb-2">Select Your Role:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedRole?.id === role.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'hover:border-blue-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
                    }`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contribution */}
            {selectedRole && (
              <div>
                <Label htmlFor="contribution">Your Contribution as {selectedRole.name}:</Label>
                <Textarea
                  id="contribution"
                  placeholder={`Share your perspective as ${selectedRole.name}...`}
                  className="min-h-[150px] mt-2"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Consider: {selectedRole.prompt}
                </p>
              </div>
            )}
            
            {/* Submit button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={!selectedRole || contribution.trim().length < 20}
              >
                Submit Contribution
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Submitted view */}
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{selectedRole.name}</Badge>
                <h3 className="font-medium">Your Contribution:</h3>
              </div>
              <p>{contribution}</p>
            </div>
            
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Contribution Submitted!</AlertTitle>
              <AlertDescription>
                Thank you for your contribution. In a classroom setting, this would be shared with your peers for collaborative learning.
              </AlertDescription>
            </Alert>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Other Perspectives:</h3>
              <p className="text-sm">
                In a collaborative learning environment, you would see contributions from peers who selected different roles. This helps build a comprehensive understanding of the topic from multiple perspectives.
              </p>
              <div className="mt-3 space-y-3">
                {roles
                  .filter(role => role.id !== selectedRole.id)
                  .map(role => (
                    <div key={role.id} className="border p-3 rounded-lg bg-white dark:bg-gray-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{role.name}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "Example perspective from the {role.name} role..."
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div className="flex justify-end">
              {!completed ? (
                <Button onClick={handleComplete}>
                  Complete Activity
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
