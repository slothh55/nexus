"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AssessmentQuiz } from "@/components/assessment-quiz"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample questions for information literacy assessment
const informationLiteracyQuestions = [
  {
    id: 1,
    question: "Which of the following is the best way to evaluate the credibility of an online source?",
    options: [
      "Check if the website has a professional design",
      "Verify the author's credentials and check for citations",
      "See how many people have shared the content on social media",
      "Look at how recently the website was created",
    ],
    correctAnswer: 1,
    explanation:
      "Verifying the author's credentials and checking for citations are key steps in evaluating source credibility. Professional design can be misleading, social media shares don't guarantee accuracy, and website age isn't necessarily related to credibility.",
  },
  {
    id: 2,
    question: "What is the most effective search strategy when researching a specific topic?",
    options: [
      "Use broad keywords to get as many results as possible",
      "Use the first search engine result as it's usually the most relevant",
      "Use specific keywords and boolean operators (AND, OR, NOT)",
      "Rely primarily on social media for the most current information",
    ],
    correctAnswer: 2,
    explanation:
      "Using specific keywords and boolean operators helps narrow down search results to the most relevant information. Broad keywords often return too many irrelevant results, the first result isn't always best, and social media isn't always reliable for research.",
  },
  {
    id: 3,
    question: "What does 'filter bubble' refer to in the context of online information?",
    options: [
      "Tools that block inappropriate content",
      "Algorithms that personalize content based on your past behavior",
      "Software that filters out fake news",
      "A technique to organize search results by relevance",
    ],
    correctAnswer: 1,
    explanation:
      "A 'filter bubble' refers to the situation where algorithms personalize content based on your past behavior, potentially limiting exposure to diverse viewpoints. This can lead to an echo chamber effect where you mainly see information that confirms your existing beliefs.",
  },
]

export default function InformationLiteracyAssessment() {
  const [isComplete, setIsComplete] = useState(false)
  const [score, setScore] = useState(0)
  const router = useRouter()

  const handleComplete = (finalScore: number, answers: number[]) => {
    setScore(finalScore)
    setIsComplete(true)
    // In a real application, you would save this data to a database
  }

  if (isComplete) {
    const percentage = Math.round((score / informationLiteracyQuestions.length) * 100)

    return (
      <DashboardLayout>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Assessment Complete</CardTitle>
            <CardDescription>You've completed the Information Literacy assessment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <div className="text-5xl font-bold mb-2">{percentage}%</div>
              <p className="text-muted-foreground">
                You answered {score} out of {informationLiteracyQuestions.length} questions correctly.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Your Information Literacy Skills</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {percentage >= 80
                  ? "You have strong information literacy skills! You're able to effectively evaluate online sources and find reliable information."
                  : percentage >= 50
                    ? "You have a good foundation in information literacy, but there's room for improvement in evaluating sources and finding reliable information."
                    : "You would benefit from improving your information literacy skills, particularly in evaluating online sources and finding reliable information."}
              </p>
              <h4 className="font-medium text-sm mb-1">Recommended Next Steps:</h4>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Review the explanations for questions you missed</li>
                <li>Check out the personalized learning resources in your Learning Path</li>
                <li>Practice evaluating sources with the interactive exercises</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/assessment">Back to Assessments</Link>
            </Button>
            <Button asChild>
              <Link href="/learning-paths">View Learning Path</Link>
            </Button>
          </CardFooter>
        </Card>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <AssessmentQuiz
        title="Information Literacy Assessment"
        description="Evaluate your ability to find, evaluate, and use digital information effectively."
        questions={informationLiteracyQuestions}
        onComplete={handleComplete}
      />
    </DashboardLayout>
  )
}

