"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Wand2, Copy, Download, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ContentGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [audience, setAudience] = useState("students")
  const [complexity, setComplexity] = useState([3])
  const [language, setLanguage] = useState("english")
  const [includeExamples, setIncludeExamples] = useState(true)
  const [includeVisuals, setIncludeVisuals] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const { toast } = useToast()

  const handleGenerate = () => {
    if (!topic) {
      toast({
        title: "Topic required",
        description: "Please enter a digital literacy topic to generate content.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate content generation (in a real app, this would call an AI API)
    setTimeout(() => {
      // Sample generated content based on inputs
      let content = ""

      if (topic.toLowerCase().includes("password")) {
        content = generatePasswordSecurityContent(complexity[0], audience, includeExamples, includeVisuals)
      } else if (topic.toLowerCase().includes("fake news") || topic.toLowerCase().includes("misinformation")) {
        content = generateFakeNewsContent(complexity[0], audience, includeExamples, includeVisuals)
      } else if (topic.toLowerCase().includes("privacy") || topic.toLowerCase().includes("data protection")) {
        content = generatePrivacyContent(complexity[0], audience, includeExamples, includeVisuals)
      } else if (topic.toLowerCase().includes("ai ethics") || topic.toLowerCase().includes("artificial intelligence")) {
        content = generateAIEthicsContent(complexity[0], audience, includeExamples, includeVisuals)
      } else {
        content = `# Understanding ${topic}\n\nThis is a comprehensive guide to understanding ${topic} in the context of digital literacy. This content has been tailored for ${audience} at a complexity level of ${complexity[0]}/5.\n\n## Key Concepts\n\n- Important aspect 1 of ${topic}\n- Critical understanding of ${topic}\n- How ${topic} impacts digital citizenship\n\n${includeExamples ? "## Examples\n\n- Real-world example of " + topic + "\n- Case study demonstrating " + topic + "\n- Interactive scenario to practice " + topic + "\n\n" : ""}${includeVisuals ? "## Visual Aids\n\n- Diagram showing the components of " + topic + "\n- Infographic explaining " + topic + " concepts\n- Visual checklist for " + topic + " best practices\n\n" : ""}## Next Steps\n\n1. Practice identifying ${topic} in your daily digital interactions\n2. Share what you've learned about ${topic} with others\n3. Explore additional resources to deepen your understanding of ${topic}`
      }

      setGeneratedContent(content)
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    toast({
      title: "Content copied",
      description: "The generated content has been copied to your clipboard.",
    })
  }

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${topic.toLowerCase().replace(/\s+/g, "-")}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Content downloaded",
      description: "The generated content has been downloaded as a Markdown file.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accessible Content Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create explanations of digital literacy concepts in multiple languages and complexity levels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Parameters</CardTitle>
              <CardDescription>Customize the content to meet your specific needs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Digital Literacy Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Password Security, Fake News Detection, Online Privacy"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elementary">Elementary Students</SelectItem>
                    <SelectItem value="middle">Middle School Students</SelectItem>
                    <SelectItem value="high">High School Students</SelectItem>
                    <SelectItem value="college">College Students</SelectItem>
                    <SelectItem value="adults">Adults</SelectItem>
                    <SelectItem value="seniors">Seniors</SelectItem>
                    <SelectItem value="educators">Educators</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Complexity Level (1-5)</Label>
                <Slider value={complexity} min={1} max={5} step={1} onValueChange={setComplexity} className="py-4" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Basic</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="examples" className="cursor-pointer">
                    Include Examples
                  </Label>
                  <Switch id="examples" checked={includeExamples} onCheckedChange={setIncludeExamples} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="visuals" className="cursor-pointer">
                    Include Visual Descriptions
                  </Label>
                  <Switch id="visuals" checked={includeVisuals} onCheckedChange={setIncludeVisuals} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full">
                {isGenerating ? "Generating..." : "Generate Content"}
                {!isGenerating && <Wand2 className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>Preview and use the generated content.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Tabs defaultValue="preview" className="h-full flex flex-col">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="flex-1 overflow-auto">
                  {generatedContent ? (
                    <div className="prose dark:prose-invert max-w-none">
                      {generatedContent.split("\n").map((line, index) => {
                        if (line.startsWith("# ")) {
                          return <h1 key={index}>{line.substring(2)}</h1>
                        } else if (line.startsWith("## ")) {
                          return <h2 key={index}>{line.substring(3)}</h2>
                        } else if (line.startsWith("- ")) {
                          return <li key={index}>{line.substring(2)}</li>
                        } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
                          return <li key={index}>{line.substring(3)}</li>
                        } else if (line === "") {
                          return <br key={index} />
                        } else {
                          return <p key={index}>{line}</p>
                        }
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      {isGenerating ? "Generating content..." : "Generated content will appear here"}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="markdown" className="flex-1">
                  <Textarea
                    value={generatedContent}
                    readOnly
                    className="font-mono text-sm h-full min-h-[300px]"
                    placeholder={isGenerating ? "Generating content..." : "Generated markdown will appear here"}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={handleCopy} disabled={!generatedContent}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={!generatedContent}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" disabled={!generatedContent}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Helper functions to generate sample content
function generatePasswordSecurityContent(
  complexity: number,
  audience: string,
  includeExamples: boolean,
  includeVisuals: boolean,
) {
  const title = "# Password Security: Protecting Your Digital Identity\n\n"

  const intro =
    "Password security is a fundamental aspect of digital literacy. Strong passwords are your first line of defense against unauthorized access to your accounts and personal information.\n\n"

  let concepts = "## Key Concepts\n\n"
  concepts += "- Strong passwords use a combination of letters, numbers, and special characters\n"
  concepts += "- Each account should have a unique password\n"
  concepts += "- Password managers can help you create and store complex passwords\n"
  concepts += "- Two-factor authentication adds an extra layer of security\n"
  concepts += "- Regular password updates reduce vulnerability\n\n"

  let examples = ""
  if (includeExamples) {
    examples = "## Examples\n\n"
    examples += "- Weak password: 'password123' - Easy to guess and commonly used\n"
    examples += "- Strong password: 'T5%xLp9@Qr2!' - Complex and difficult to crack\n"
    examples += "- Using a phrase: Convert 'I love chocolate chip cookies!' to 'iLchoc0Ch!pC00k!3s'\n\n"
  }

  let visuals = ""
  if (includeVisuals) {
    visuals = "## Visual Aids\n\n"
    visuals += "- Password strength meter showing weak to strong password characteristics\n"
    visuals += "- Infographic comparing the time it takes to crack different types of passwords\n"
    visuals += "- Step-by-step guide for setting up two-factor authentication\n\n"
  }

  let nextSteps = "## Next Steps\n\n"
  nextSteps += "1. Audit your current passwords and identify weak ones\n"
  nextSteps += "2. Set up a password manager to generate and store strong passwords\n"
  nextSteps += "3. Enable two-factor authentication on your important accounts\n"

  return title + intro + concepts + examples + visuals + nextSteps
}

function generateFakeNewsContent(
  complexity: number,
  audience: string,
  includeExamples: boolean,
  includeVisuals: boolean,
) {
  const title = "# Identifying Fake News and Misinformation\n\n"

  const intro =
    "In today's digital environment, the ability to identify fake news and misinformation is a critical digital literacy skill. Learning to evaluate information sources helps you make informed decisions and avoid spreading false information.\n\n"

  let concepts = "## Key Concepts\n\n"
  concepts += "- Check the source's credibility and reputation\n"
  concepts += "- Look for unusual URLs or site names\n"
  concepts += "- Verify information with multiple reliable sources\n"
  concepts += "- Be aware of emotional manipulation in headlines\n"
  concepts += "- Check the publication date and context\n\n"

  let examples = ""
  if (includeExamples) {
    examples = "## Examples\n\n"
    examples += "- Red flag: Headline with ALL CAPS and excessive punctuation!!!\n"
    examples += "- Red flag: Article with numerous spelling and grammatical errors\n"
    examples += "- Red flag: Image that appears manipulated or taken out of context\n\n"
  }

  let visuals = ""
  if (includeVisuals) {
    visuals = "## Visual Aids\n\n"
    visuals += "- Flowchart for evaluating news sources\n"
    visuals += "- Side-by-side comparison of reliable vs. unreliable news formats\n"
    visuals += "- Infographic on common tactics used in misinformation\n\n"
  }

  let nextSteps = "## Next Steps\n\n"
  nextSteps += "1. Practice fact-checking information before sharing it\n"
  nextSteps += "2. Use fact-checking websites when you're unsure about information\n"
  nextSteps += "3. Develop a list of trusted news sources for different topics\n"

  return title + intro + concepts + examples + visuals + nextSteps
}

function generatePrivacyContent(
  complexity: number,
  audience: string,
  includeExamples: boolean,
  includeVisuals: boolean,
) {
  const title = "# Online Privacy and Data Protection\n\n"

  const intro =
    "Protecting your privacy online is essential in the digital age. Understanding how your data is collected, used, and shared empowers you to make informed decisions about your digital footprint.\n\n"

  let concepts = "## Key Concepts\n\n"
  concepts += "- Personal data includes information that can identify you\n"
  concepts += "- Privacy settings control who can see your information\n"
  concepts += "- Data brokers collect and sell personal information\n"
  concepts += "- Encryption protects sensitive data from unauthorized access\n"
  concepts += "- Privacy policies explain how companies use your data\n\n"

  let examples = ""
  if (includeExamples) {
    examples = "## Examples\n\n"
    examples += "- Reviewing app permissions before installing\n"
    examples += "- Using private browsing mode for sensitive searches\n"
    examples += "- Adjusting social media privacy settings to limit audience\n\n"
  }

  let visuals = ""
  if (includeVisuals) {
    visuals = "## Visual Aids\n\n"
    visuals += "- Diagram showing how data flows between apps and third parties\n"
    visuals += "- Checklist for privacy settings on popular platforms\n"
    visuals += "- Visual guide to recognizing secure vs. insecure websites\n\n"
  }

  let nextSteps = "## Next Steps\n\n"
  nextSteps += "1. Conduct a privacy audit of your digital accounts\n"
  nextSteps += "2. Update privacy settings on your devices and applications\n"
  nextSteps += "3. Learn about privacy laws that protect your data rights\n"

  return title + intro + concepts + examples + visuals + nextSteps
}

function generateAIEthicsContent(
  complexity: number,
  audience: string,
  includeExamples: boolean,
  includeVisuals: boolean,
) {
  const title = "# AI Ethics and Responsible Use\n\n"

  const intro =
    "As artificial intelligence becomes more integrated into our daily lives, understanding AI ethics and responsible use is increasingly important. This knowledge helps us navigate the benefits and challenges of AI technologies.\n\n"

  let concepts = "## Key Concepts\n\n"
  concepts += "- AI bias can reflect and amplify human biases\n"
  concepts += "- Transparency in AI systems builds trust and accountability\n"
  concepts += "- Privacy concerns arise from AI's data requirements\n"
  concepts += "- Responsible AI development considers societal impact\n"
  concepts += "- Human oversight remains essential for AI systems\n\n"

  let examples = ""
  if (includeExamples) {
    examples = "## Examples\n\n"
    examples += "- Facial recognition systems with lower accuracy for certain demographics\n"
    examples += "- AI-generated content that can be used for misinformation\n"
    examples += "- Automated decision systems affecting employment or loan approvals\n\n"
  }

  let visuals = ""
  if (includeVisuals) {
    visuals = "## Visual Aids\n\n"
    visuals += "- Diagram illustrating how AI bias can occur in machine learning\n"
    visuals += "- Comparison chart of ethical vs. unethical AI applications\n"
    visuals += "- Decision tree for evaluating the ethical implications of AI tools\n\n"
  }

  let nextSteps = "## Next Steps\n\n"
  nextSteps += "1. Learn to recognize when you're interacting with AI systems\n"
  nextSteps += "2. Question the sources and potential biases of AI-generated content\n"
  nextSteps += "3. Advocate for transparent and responsible AI in your community\n"

  return title + intro + concepts + examples + visuals + nextSteps
}

