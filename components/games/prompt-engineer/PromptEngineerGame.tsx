"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CheckCircle, AlertCircle, Info, Lightbulb } from 'lucide-react';
import { promptEngineeringChallenges } from '@/data/prompt-engineering-challenges';

interface PromptEngineerGameProps {
  onComplete: () => void;
}

export function PromptEngineerGame({ onComplete }: PromptEngineerGameProps) {
  const { toast } = useToast();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'warning' | 'info' | 'error'>('info');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameProgress, setGameProgress] = useLocalStorage('prompt-engineer-progress', {
    completed: false,
    currentChallenge: 0,
    score: 0,
    hintsUsed: 0,
  });

  const currentChallenge = promptEngineeringChallenges[currentChallengeIndex];

  useEffect(() => {
    if (gameProgress.completed) {
      setCompleted(true);
      setScore(gameProgress.score);
      setHintsUsed(gameProgress.hintsUsed);
    } else {
      setCurrentChallengeIndex(gameProgress.currentChallenge);
      setScore(gameProgress.score);
      setHintsUsed(gameProgress.hintsUsed);
    }
  }, [gameProgress]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value);
  };

  const evaluatePrompt = () => {
    let promptScore = 0;
    let feedbackMessage = '';
    let feedbackStatus: 'success' | 'warning' | 'info' | 'error' = 'info';
    
    // Check for required elements in the prompt
    const promptLower = userPrompt.toLowerCase();
    let elementsIncluded = 0;
    let totalElements = currentChallenge.requiredElements.length;
    
    currentChallenge.requiredElements.forEach(element => {
      // Check if the element or its synonyms are in the prompt
      const elementLower = element.text.toLowerCase();
      const synonyms = element.synonyms || [];
      
      if (
        promptLower.includes(elementLower) || 
        synonyms.some(synonym => promptLower.includes(synonym.toLowerCase()))
      ) {
        elementsIncluded++;
      }
    });
    
    // Calculate score based on percentage of required elements included
    const percentIncluded = (elementsIncluded / totalElements) * 100;
    
    // Check for prohibited elements
    let prohibitedFound = false;
    currentChallenge.prohibitedElements.forEach(element => {
      const elementLower = element.toLowerCase();
      if (promptLower.includes(elementLower)) {
        prohibitedFound = true;
      }
    });
    
    // Determine score and feedback
    if (prohibitedFound) {
      promptScore = Math.max(0, Math.floor(percentIncluded / 2)); // Halve the score if prohibited elements are found
      feedbackMessage = currentChallenge.feedback.prohibited;
      feedbackStatus = 'error';
    } else if (percentIncluded >= 90) {
      promptScore = 100;
      feedbackMessage = currentChallenge.feedback.excellent;
      feedbackStatus = 'success';
    } else if (percentIncluded >= 70) {
      promptScore = 80;
      feedbackMessage = currentChallenge.feedback.good;
      feedbackStatus = 'info';
    } else if (percentIncluded >= 40) {
      promptScore = 60;
      feedbackMessage = currentChallenge.feedback.fair;
      feedbackStatus = 'warning';
    } else {
      promptScore = 30;
      feedbackMessage = currentChallenge.feedback.poor;
      feedbackStatus = 'error';
    }
    
    // Add specific feedback about missing elements if score is less than perfect
    if (percentIncluded < 100) {
      feedbackMessage += "\n\nYour prompt is missing these important elements: ";
      const missingElements = currentChallenge.requiredElements.filter(element => {
        const elementLower = element.text.toLowerCase();
        const synonyms = element.synonyms || [];
        return !(
          promptLower.includes(elementLower) || 
          synonyms.some(synonym => promptLower.includes(synonym.toLowerCase()))
        );
      });
      
      feedbackMessage += missingElements.map(element => element.text).join(", ");
    }
    
    // Adjust score based on prompt length (too short or too verbose)
    const wordCount = userPrompt.split(/\s+/).length;
    if (wordCount < 5) {
      promptScore = Math.max(0, promptScore - 20);
      feedbackMessage += "\n\nYour prompt is too short to be effective.";
    } else if (wordCount > 100) {
      promptScore = Math.max(0, promptScore - 10);
      feedbackMessage += "\n\nYour prompt is very long. Consider being more concise.";
    }
    
    // Adjust score based on hints used
    if (showHint) {
      promptScore = Math.max(0, promptScore - 10);
      feedbackMessage += "\n\n(Score reduced by 10 points for using a hint)";
    }
    
    setFeedback(feedbackMessage);
    setFeedbackType(feedbackStatus);
    setShowResults(true);
    
    // Update total score
    const newScore = score + promptScore;
    setScore(newScore);
    
    // Save progress
    setGameProgress({
      completed: currentChallengeIndex === promptEngineeringChallenges.length - 1 && promptScore >= 60,
      currentChallenge: currentChallengeIndex,
      score: newScore,
      hintsUsed: hintsUsed + (showHint ? 1 : 0),
    });
  };

  const handleNext = () => {
    if (currentChallengeIndex < promptEngineeringChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setUserPrompt('');
      setFeedback(null);
      setShowResults(false);
      setShowHint(false);
      
      // Update progress
      setGameProgress({
        ...gameProgress,
        currentChallenge: currentChallengeIndex + 1,
      });
    } else {
      // Game completed
      setCompleted(true);
      setGameProgress({
        ...gameProgress,
        completed: true,
      });
      
      // Notify parent component
      onComplete();
      
      toast({
        title: "Congratulations!",
        description: "You've completed the Prompt Engineer game!",
      });
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  if (completed) {
    const totalPossibleScore = promptEngineeringChallenges.length * 100;
    const percentScore = Math.round((score / totalPossibleScore) * 100);
    
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Prompt Engineer - Results</CardTitle>
          <CardDescription className="text-center">
            You've completed all prompt engineering challenges!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Your Score: {percentScore}%</h3>
            <p className="text-sm text-muted-foreground">Hints used: {hintsUsed}</p>
            <Progress value={percentScore} className="h-4 mt-2" />
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">What You've Learned:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>How to write clear, specific prompts for AI systems</li>
              <li>The importance of providing context and details</li>
              <li>How to avoid problematic or biased language in prompts</li>
              <li>Techniques for getting more helpful and accurate AI responses</li>
              <li>Responsible approaches to prompt engineering</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Next Steps:</h4>
            <p>
              Apply what you've learned to write effective prompts when using AI tools.
              Remember that the way you ask questions greatly affects the answers you receive.
              Always use your prompting skills responsibly and ethically!
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => {
            setCompleted(false);
            setCurrentChallengeIndex(0);
            setScore(0);
            setUserPrompt('');
            setFeedback(null);
            setShowResults(false);
            setShowHint(false);
            setHintsUsed(0);
            setGameProgress({
              completed: false,
              currentChallenge: 0,
              score: 0,
              hintsUsed: 0,
            });
          }}>
            Play Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">Challenge {currentChallengeIndex + 1} of {promptEngineeringChallenges.length}</Badge>
          <Badge variant="secondary">Score: {score}</Badge>
        </div>
        <CardTitle>{currentChallenge.title}</CardTitle>
        <CardDescription>{currentChallenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Challenge:</h3>
          <p>{currentChallenge.challenge}</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Write Your Prompt:</h3>
          <Textarea
            placeholder="Type your prompt here..."
            value={userPrompt}
            onChange={handlePromptChange}
            rows={6}
            className="w-full"
          />
          {!showHint && !showResults && (
            <div className="mt-2 text-right">
              <Button variant="outline" size="sm" onClick={handleShowHint} className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                <span>Hint</span>
              </Button>
            </div>
          )}
          {showHint && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Hint:</h4>
                  <p>{currentChallenge.hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {showResults && feedback && (
          <div className={`p-4 rounded-lg ${
            feedbackType === 'success' ? 'bg-green-100 border-green-500' :
            feedbackType === 'warning' ? 'bg-yellow-100 border-yellow-500' :
            feedbackType === 'error' ? 'bg-red-100 border-red-500' :
            'bg-blue-100 border-blue-500'
          } border`}>
            <div className="flex items-start">
              {feedbackType === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />}
              {feedbackType === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />}
              {feedbackType === 'error' && <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />}
              {feedbackType === 'info' && <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />}
              <div>
                <h4 className="font-semibold mb-1">Feedback:</h4>
                <p className="whitespace-pre-line">{feedback}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Example AI Response:</h3>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-gray-700">{currentChallenge.exampleResponse}</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">This is what a good AI response might look like for this challenge.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showResults ? (
          <Button onClick={evaluatePrompt} disabled={userPrompt.trim().length < 3}>
            Submit Prompt
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentChallengeIndex < promptEngineeringChallenges.length - 1 ? 'Next Challenge' : 'Complete Game'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
