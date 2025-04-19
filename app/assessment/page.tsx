import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, Shield, MessageSquare, Award, Sparkles, Clock } from "lucide-react"
import Link from "next/link"

export default function AssessmentPage() {
  const assessmentAreas = [
    {
      title: "Information Detective Quiz",
      description: "Test your skills at finding clues and solving the mystery of real vs. fake information!",
      questions: 10,
      time: "10-15 minutes",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Communication Superheroes Quiz",
      description: "Test your communication superpowers and see if you're ready to join the Superhero Team!",
      questions: 8,
      time: "8-10 minutes",
      icon: MessageSquare,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Safety Rangers Quiz",
      description: "Do you have what it takes to become a certified Safety Ranger? Take the test to find out!",
      questions: 12,
      time: "12-15 minutes",
      icon: Shield,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "AI Explorers Quiz",
      description: "Test your knowledge of the AI universe and earn your AI Explorer badge!",
      questions: 15,
      time: "15-20 minutes",
      icon: Brain,
      color: "bg-amber-500/10 text-amber-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Adventures</h1>
          <p className="text-muted-foreground mt-2">
            Test your digital skills with fun quizzes and earn special badges!
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <CardTitle>About the Quiz Adventures</CardTitle>
            </div>
            <CardDescription>
              Our magical quizzes help you test your digital skills and earn special badges!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Each quiz is a fun adventure that tests your digital skills. Complete quizzes to earn badges and unlock
                new adventures!
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="font-medium flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/10 p-1">
                      <Brain className="h-4 w-4 text-blue-500" />
                    </div>
                    Magic Questions
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Our questions adapt to your answers, making each adventure unique!
                  </div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="font-medium flex items-center gap-2">
                    <div className="rounded-full bg-purple-500/10 p-1">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                    </div>
                    Instant Magic
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get instant magical feedback and explanations for each answer!
                  </div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="font-medium flex items-center gap-2">
                    <div className="rounded-full bg-green-500/10 p-1">
                      <Award className="h-4 w-4 text-green-500" />
                    </div>
                    Special Badges
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Earn special badges to show off your digital skills to friends!
                  </div>
                </div>
                <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-md">
                  <div className="font-medium flex items-center gap-2">
                    <div className="rounded-full bg-amber-500/10 p-1">
                      <BookOpen className="h-4 w-4 text-amber-500" />
                    </div>
                    Adventure Maps
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get personalized adventure maps based on your quiz results!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mt-8">Quiz Adventures</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {assessmentAreas.map((area) => {
            const Icon = area.icon
            return (
              <Card key={area.title} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div
                  className={`h-2 w-full ${area.color.includes("bg-") ? area.color.replace("text-", "bg-") : `bg-${area.color.split(" ")[1]}`}`}
                ></div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-2 ${area.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{area.title}</CardTitle>
                  </div>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Brain className="h-4 w-4" />
                      <span className="font-medium">{area.questions}</span> questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{area.time}</span> to complete
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  >
                    <Link href={`/assessment/${area.title.toLowerCase().replace(/\s+/g, "-")}`}>Start Adventure</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <Card className="overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-950/20 dark:to-purple-950/20 dark:border-indigo-800">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                <Award className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Ultimate Digital Champion Challenge</CardTitle>
            </div>
            <CardDescription>Take the ultimate challenge to become a certified Digital Champion!</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The Digital Champion Challenge is an epic adventure that tests all your digital skills! Complete the
              challenge to earn the legendary Digital Champion badge and unlock special rewards!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Link href="/assessment/complete">Start Epic Challenge</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

