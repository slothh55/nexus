"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Info } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Digital Literacy Assistant. I can help answer your questions about digital literacy, online safety, AI ethics, and more. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample suggested questions
  const suggestedQuestions = [
    "What is digital literacy?",
    "How can I protect my privacy online?",
    "What are the ethical concerns with AI?",
    "How do I identify fake news?",
    "What are digital citizenship skills?",
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let response = ""

      // Simple pattern matching for demo purposes
      if (input.toLowerCase().includes("digital literacy")) {
        response =
          "Digital literacy refers to the skills and knowledge required to use digital devices, communication applications, and networks to access and manage information. It includes the ability to find, evaluate, create, and communicate information while using digital technologies safely and appropriately."
      } else if (input.toLowerCase().includes("privacy") || input.toLowerCase().includes("protect")) {
        response =
          "To protect your privacy online: 1) Use strong, unique passwords, 2) Enable two-factor authentication, 3) Be careful what you share on social media, 4) Check privacy settings on your accounts, 5) Use a VPN when on public Wi-Fi, 6) Keep your software updated, and 7) Be cautious about the permissions you grant to apps."
      } else if (
        input.toLowerCase().includes("ai") &&
        (input.toLowerCase().includes("ethics") || input.toLowerCase().includes("ethical"))
      ) {
        response =
          "Ethical concerns with AI include: bias and fairness issues, privacy concerns, transparency and explainability, accountability, job displacement, security risks, and the potential for misuse. It's important to develop and use AI responsibly, with proper oversight and consideration of these ethical implications."
      } else if (input.toLowerCase().includes("fake news") || input.toLowerCase().includes("misinformation")) {
        response =
          "To identify fake news: 1) Check the source's credibility, 2) Look for unusual URLs or site names, 3) Check for poor writing or dramatic language, 4) Verify with other reputable sources, 5) Check the author's credentials, 6) Look for supporting sources, 7) Check the date of publication, and 8) Be wary of content that seems designed to trigger strong emotional reactions."
      } else {
        response =
          "That's a great question about digital literacy. Would you like me to provide more specific information or resources on this topic? Feel free to ask about online safety, digital communication, information literacy, or AI ethics."
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex-1 flex gap-4">
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Ask questions about digital literacy, online safety, and AI ethics.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-18rem)] px-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                          <Avatar className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                            <AvatarFallback>
                              {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            <div
                              className={`text-xs mt-1 ${
                                message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="bg-muted">
                            <AvatarFallback>
                              <Bot className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg p-3 bg-muted">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                              <div
                                className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="hidden lg:block w-72">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Questions</CardTitle>
                <CardDescription>Click on a question to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedQuestions.map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start border-t pt-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mt-0.5" />
                  <p>
                    This AI assistant is designed to provide educational information about digital literacy topics. It
                    is not a substitute for professional advice.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

