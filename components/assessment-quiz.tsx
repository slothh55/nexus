"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface AssessmentQuizProps {
  title: string
  description: string
  questions: Question[]
  onComplete: (score: number, answers: number[]) => void
}

export function AssessmentQuiz({ title, description, questions, onComplete }: AssessmentQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [showExplanation, setShowExplanation] = useState(false)
  const router = useRouter()

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = Number.parseInt(value)
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (showExplanation) {
      setShowExplanation(false)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Calculate score
        const score = selectedAnswers.reduce((acc, answer, index) => {
          return answer === questions[index].correctAnswer ? acc + 1 : acc
        }, 0)
        onComplete(score, selectedAnswers)
      }
    } else {
      setShowExplanation(true)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <div>
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div>{Math.round(progress)}% complete</div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-lg font-medium">{questions[currentQuestion].question}</div>

          <RadioGroup
            value={selectedAnswers[currentQuestion].toString()}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
            disabled={showExplanation}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-md border p-3 ${
                  showExplanation && index === questions[currentQuestion].correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : showExplanation && index === selectedAnswers[currentQuestion]
                      ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                      : ""
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <div className="rounded-md bg-muted p-4 text-sm">
              <div className="font-medium mb-1">Explanation:</div>
              <div>{questions[currentQuestion].explanation}</div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()} disabled={showExplanation}>
          Cancel
        </Button>
        <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === -1 && !showExplanation}>
          {showExplanation
            ? currentQuestion < questions.length - 1
              ? "Next Question"
              : "Complete Assessment"
            : "Check Answer"}
        </Button>
      </CardFooter>
    </Card>
  )
}

