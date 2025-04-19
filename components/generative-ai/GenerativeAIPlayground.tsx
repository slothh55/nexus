"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Lightbulb, MessageSquare, Image, Wand2 } from 'lucide-react';

export function GenerativeAIPlayground() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('text');
  const [userPrompt, setUserPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [safetyLevel, setSafetyLevel] = useState(3);
  const [showGuidance, setShowGuidance] = useState(true);
  const [creativeMode, setCreativeMode] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [promptTemplate, setPromptTemplate] = useState('');
  
  // Simulated AI response generation
  const generateResponse = () => {
    if (!userPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate a response.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check for potentially unsafe content based on safety level
      if (containsPotentiallyUnsafeContent(userPrompt) && safetyLevel > 2) {
        setAiResponse("I'm sorry, but I can't respond to that prompt as it may contain content that isn't appropriate for educational purposes. Please try a different prompt related to AI literacy, digital citizenship, or creative learning.");
        
        toast({
          title: "Safety filter activated",
          description: "Your prompt was flagged by our safety system. Please try a more appropriate prompt for educational purposes.",
          variant: "destructive",
        });
      } else {
        // Generate simulated response based on prompt type
        const response = simulateAIResponse(userPrompt, creativeMode);
        setAiResponse(response);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Simulated image generation
  const generateImage = () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check for potentially unsafe content based on safety level
      if (containsPotentiallyUnsafeContent(imagePrompt) && safetyLevel > 2) {
        setGeneratedImage('');
        
        toast({
          title: "Safety filter activated",
          description: "Your prompt was flagged by our safety system. Please try a more appropriate prompt for educational purposes.",
          variant: "destructive",
        });
      } else {
        // Set placeholder image URL
        setGeneratedImage('https://placehold.co/600x400/9333ea/ffffff?text=AI+Generated+Image');
      }
      
      setIsLoading(false);
    }, 2000);
  };
  
  // Simple check for potentially unsafe content
  const containsPotentiallyUnsafeContent = (prompt: string) => {
    const unsafeKeywords = ['inappropriate', 'violent', 'weapon', 'gun', 'kill', 'adult', 'nsfw', 'harmful'];
    const lowerPrompt = prompt.toLowerCase();
    
    return unsafeKeywords.some(keyword => lowerPrompt.includes(keyword));
  };
  
  // Simulate AI response based on prompt
  const simulateAIResponse = (prompt: string, creative: boolean) => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Educational responses for common AI literacy topics
    if (lowerPrompt.includes('what is ai') || lowerPrompt.includes('artificial intelligence')) {
      return "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These tasks include learning from data, recognizing patterns, making decisions, and solving problems.\n\nAI systems work by analyzing large amounts of data to identify patterns and make predictions. They can improve over time through a process called machine learning, where they learn from experience and feedback.\n\nIn your everyday life, you might encounter AI in voice assistants like Siri or Alexa, recommendation systems on streaming platforms, navigation apps that find the best route, and even in games where characters adapt to your playing style.";
    }
    
    if (lowerPrompt.includes('ethics') || lowerPrompt.includes('responsible ai')) {
      return "AI ethics refers to the principles and guidelines that ensure AI systems are designed and used responsibly. Some key aspects of AI ethics include:\n\n1. Fairness: AI systems should treat all people fairly and not discriminate based on characteristics like race, gender, or age.\n\n2. Transparency: People should understand how AI makes decisions and what data it uses.\n\n3. Privacy: AI systems should respect people's privacy and handle personal data responsibly.\n\n4. Accountability: Someone should be responsible for how AI systems behave and their impact.\n\n5. Safety: AI systems should be designed to avoid causing harm.\n\nThese principles help ensure that as AI becomes more powerful and widespread, it benefits humanity and respects human rights and values.";
    }
    
    if (lowerPrompt.includes('bias') || lowerPrompt.includes('fair')) {
      return "AI bias occurs when an AI system produces unfair or discriminatory results. This often happens because the data used to train the AI contains human biases or doesn't represent everyone equally.\n\nFor example, if an AI is trained mostly on data from one group of people, it might work better for that group and worse for others. This can lead to unfair outcomes in important areas like hiring, lending, or healthcare.\n\nTo make AI more fair, developers can:\n\n1. Use diverse and representative training data\n2. Test systems for bias before deploying them\n3. Have diverse teams working on AI development\n4. Create clear standards for fairness\n5. Continuously monitor AI systems for unfair outcomes\n\nMaking AI fair is important because these systems increasingly influence many aspects of our lives.";
    }
    
    // Creative or general responses
    if (creative) {
      return "I've thought creatively about your prompt: \"" + prompt + "\"\n\nHere's my response:\n\n" + generateCreativeResponse(prompt);
    } else {
      return "Thank you for your prompt: \"" + prompt + "\"\n\nThis is a simulated AI response for educational purposes. In a real AI system, the response would be generated based on patterns learned from training data, while applying safety filters and ethical guidelines.\n\nTo learn more about how AI generates responses, try exploring the AI Basics course in the Digital Inclusion Companion!";
    }
  };
  
  // Generate a creative response for demonstration
  const generateCreativeResponse = (prompt: string) => {
    const responses = [
      "Imagine a world where technology and nature work in perfect harmony. Trees with solar leaves power our cities, while AI systems monitor and maintain ecological balance. Children learn from both human teachers and AI mentors, each bringing their unique strengths to education.",
      
      "The future of learning might look like a personalized journey for each student. AI companions could adapt to individual learning styles, interests, and pace, while human teachers focus on emotional intelligence, ethics, and creative thinking - the areas where humans still excel beyond machines.",
      
      "Digital citizenship in 2040 might involve participating in both physical and virtual communities, with AI systems helping to translate across languages and cultures instantly. Everyone would have access to the global knowledge base, regardless of their location or background.",
      
      "A sustainable smart city could use AI to optimize energy usage, reduce waste, and improve transportation. Sensors throughout the city would collect data on air quality, traffic patterns, and resource usage, while AI systems would analyze this data to make real-time adjustments for efficiency and sustainability."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  // Handle prompt template selection
  const handleTemplateChange = (value: string) => {
    setPromptTemplate(value);
    
    // Apply template to prompt
    switch (value) {
      case 'explain':
        setUserPrompt("Explain artificial intelligence in simple terms that a 10-year-old would understand. Use examples from everyday life.");
        break;
      case 'compare':
        setUserPrompt("Compare and contrast machine learning and traditional programming. What are the key differences in how they work?");
        break;
      case 'creative':
        setUserPrompt("Imagine a future classroom where AI helps students learn. Describe what it might look like and how AI would be used responsibly.");
        break;
      case 'ethical':
        setUserPrompt("What are three important ethical considerations when designing AI systems for children?");
        break;
      default:
        // Keep current prompt
        break;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center">
          <Wand2 className="h-6 w-6 mr-2 text-primary" />
          <div>
            <CardTitle>Generative AI Playground</CardTitle>
            <CardDescription>
              Practice using AI tools in a safe, educational environment
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Text Generation
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <Image className="h-4 w-4 mr-2" />
              Image Generation
            </TabsTrigger>
          </TabsList>
          
          <div className="my-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <Label htmlFor="safety-level">Safety Level</Label>
              </div>
              <Slider
                id="safety-level"
                value={[safetyLevel]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setSafetyLevel(value[0])}
                className="w-[200px]"
              />
              <span className="text-sm font-medium">
                {safetyLevel === 1 ? 'Minimal' : 
                 safetyLevel === 2 ? 'Low' : 
                 safetyLevel === 3 ? 'Balanced' : 
                 safetyLevel === 4 ? 'High' : 'Maximum'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <Label htmlFor="show-guidance">Show Prompt Guidance</Label>
            </div>
            <Switch
              id="show-guidance"
              checked={showGuidance}
              onCheckedChange={setShowGuidance}
            />
          </div>
          
          <TabsContent value="text" className="space-y-4">
            {showGuidance && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Prompt Writing Tips:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Be specific about what you want the AI to do</li>
                  <li>Provide context about your needs and audience</li>
                  <li>Break complex requests into smaller parts</li>
                  <li>Use clear, simple language</li>
                  <li>Remember that AI has limitations and may not always be accurate</li>
                </ul>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="prompt-template">Prompt Templates</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="creative-mode" className="text-sm">Creative Mode</Label>
                  <Switch
                    id="creative-mode"
                    checked={creativeMode}
                    onCheckedChange={setCreativeMode}
                  />
                </div>
              </div>
              <Select value={promptTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger id="prompt-template">
                  <SelectValue placeholder="Select a template or write your own" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="explain">Explain a concept</SelectItem>
                  <SelectItem value="compare">Compare and contrast</SelectItem>
                  <SelectItem value="creative">Creative scenario</SelectItem>
                  <SelectItem value="ethical">Ethical considerations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-prompt">Your Prompt</Label>
              <Textarea
                id="user-prompt"
                placeholder="Enter your prompt here..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={generateResponse} 
              disabled={isLoading || !userPrompt.trim()}
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate Response"}
            </Button>
            
            {aiResponse && (
              <div className="p-4 border rounded-lg bg-card mt-4">
                <h3 className="font-semibold mb-2">AI Response:</h3>
                <div className="whitespace-pre-line">{aiResponse}</div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">Educational Simulation</Badge>
                  <Button variant="outline" size="sm" onClick={() => {
                    navigator.clipboard.writeText(aiResponse);
                    toast({
                      title: "Copied to clipboard",
                      description: "The AI response has been copied to your clipboard.",
                    });
                  }}>
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="image" className="space-y-4">
            {showGuidance && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Image Prompt Tips:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Describe the image in detail (subject, setting, style, colors)</li>
                  <li>Specify artistic style (e.g., cartoon, realistic, watercolor)</li>
                  <li>Mention lighting, perspective, and mood</li>
                  <li>Keep prompts positive and appropriate for all ages</li>
                  <li>Remember that AI-generated images should be labeled as such</li>
                </ul>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="image-prompt">Image Prompt</Label>
              <Textarea
                id="image-prompt"
                placeholder="Describe the image you want to generate..."
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={generateImage} 
              disabled={isLoading || !imagePrompt.trim()}
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate Image"}
            </Button>
            
            {generatedImage && (
              <div className="p-4 border rounded-lg bg-card mt-4">
                <h3 className="font-semibold mb-2">Generated Image:</h3>
                <div className="flex justify-center">
                  <img 
                    src={generatedImage} 
                    alt="AI-generated image" 
                    className="max-w-full rounded-md"
                  />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">AI-Generated Image</Badge>
                  <Button variant="outline" size="sm" onClick={() => {
                    // In a real app, this would download the image
                    toast({
                      title: "Image saved",
                      description: "The AI-generated image has been saved to your downloads.",
                    });
                  }}>
                    Save Image
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: This is a simulated image generation for educational purposes. In a real application, the image would be generated based on your prompt.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="p-3 bg-muted rounded-lg w-full">
          <h3 className="font-semibold text-sm mb-1">Learning Moment:</h3>
          <p className="text-sm">
            {activeTab === 'text' ? 
              "Text generation AI works by predicting the most likely next words based on patterns it learned from training data. It doesn't truly 'understand' meaning the way humans do, which is why it sometimes makes mistakes or generates incorrect information." :
              "Image generation AI creates images by learning patterns from millions of existing images. When you provide a text prompt, the AI tries to create an image that matches your description based on these learned patterns."}
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Remember: This is a safe educational environment. All generated content is simulated for learning purposes.
        </div>
      </CardFooter>
    </Card>
  );
}
