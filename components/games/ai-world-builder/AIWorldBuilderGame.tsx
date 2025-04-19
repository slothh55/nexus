"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { worldBuilderScenarios } from '@/data/ai-world-builder-scenarios';

interface AIWorldBuilderGameProps {
  onComplete: () => void;
}

export function AIWorldBuilderGame({ onComplete }: AIWorldBuilderGameProps) {
  const { toast } = useToast();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'warning' | 'info' | 'error'>('info');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [gameProgress, setGameProgress] = useLocalStorage('ai-world-builder-progress', {
    completed: false,
    currentScenario: 0,
    score: 0,
  });

  const currentScenario = worldBuilderScenarios[currentScenarioIndex];

  useEffect(() => {
    if (gameProgress.completed) {
      setCompleted(true);
      setScore(gameProgress.score);
    } else {
      setCurrentScenarioIndex(gameProgress.currentScenario);
      setScore(gameProgress.score);
    }
  }, [gameProgress]);

  const handleChoiceChange = (category: string, value: any) => {
    setUserChoices((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const evaluateChoices = () => {
    let scenarioScore = 0;
    let feedbackMessage = '';
    let feedbackStatus: 'success' | 'warning' | 'info' | 'error' = 'info';
    
    // Evaluate each category in the current scenario
    Object.keys(currentScenario.choices).forEach(category => {
      const userChoice = userChoices[category];
      const optimalChoices = currentScenario.optimalChoices[category];
      
      // Different evaluation logic based on choice type
      if (Array.isArray(userChoice)) {
        // For multi-select options
        const correctChoices = userChoice.filter(choice => optimalChoices.includes(choice));
        const scoreForCategory = (correctChoices.length / optimalChoices.length) * currentScenario.categoryWeights[category];
        scenarioScore += scoreForCategory;
      } else if (typeof userChoice === 'number') {
        // For slider values
        const optimalValue = optimalChoices as number;
        const difference = Math.abs(userChoice - optimalValue);
        const maxDifference = 100; // Assuming sliders go from 0-100
        const scoreForCategory = (1 - (difference / maxDifference)) * currentScenario.categoryWeights[category];
        scenarioScore += scoreForCategory;
      } else if (typeof userChoice === 'boolean') {
        // For toggle/switch values
        if (userChoice === optimalChoices) {
          scenarioScore += currentScenario.categoryWeights[category];
        }
      } else if (typeof userChoice === 'string') {
        // For select/dropdown values
        if (userChoice === optimalChoices) {
          scenarioScore += currentScenario.categoryWeights[category];
        }
      }
    });
    
    // Normalize score to 0-100
    scenarioScore = Math.round(scenarioScore);
    
    // Determine feedback based on score
    if (scenarioScore >= 80) {
      feedbackMessage = currentScenario.feedback.excellent;
      feedbackStatus = 'success';
    } else if (scenarioScore >= 60) {
      feedbackMessage = currentScenario.feedback.good;
      feedbackStatus = 'info';
    } else if (scenarioScore >= 40) {
      feedbackMessage = currentScenario.feedback.fair;
      feedbackStatus = 'warning';
    } else {
      feedbackMessage = currentScenario.feedback.poor;
      feedbackStatus = 'error';
    }
    
    setFeedback(feedbackMessage);
    setFeedbackType(feedbackStatus);
    setShowResults(true);
    
    // Update total score
    const newScore = score + scenarioScore;
    setScore(newScore);
    
    // Save progress
    setGameProgress({
      completed: currentScenarioIndex === worldBuilderScenarios.length - 1,
      currentScenario: currentScenarioIndex,
      score: newScore,
    });
  };

  const handleNext = () => {
    if (currentScenarioIndex < worldBuilderScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setUserChoices({});
      setFeedback(null);
      setShowResults(false);
      
      // Update progress
      setGameProgress({
        ...gameProgress,
        currentScenario: currentScenarioIndex + 1,
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
        description: "You've completed the AI World Builder game!",
      });
    }
  };

  const renderChoiceInput = (category: string, choiceOptions: any) => {
    const choiceType = currentScenario.choiceTypes[category];
    
    switch (choiceType) {
      case 'select':
        return (
          <Select
            value={userChoices[category] || ''}
            onValueChange={(value) => handleChoiceChange(category, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(choiceOptions).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'slider':
        return (
          <Slider
            defaultValue={[50]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => handleChoiceChange(category, value[0])}
            className="my-4"
          />
        );
        
      case 'toggle':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={userChoices[category] || false}
              onCheckedChange={(checked) => handleChoiceChange(category, checked)}
            />
            <Label>{choiceOptions.label}</Label>
          </div>
        );
        
      case 'multiselect':
        return (
          <div className="space-y-2">
            {Object.entries(choiceOptions).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${category}-${value}`}
                  checked={userChoices[category]?.includes(value) || false}
                  onChange={(e) => {
                    const currentSelections = userChoices[category] || [];
                    if (e.target.checked) {
                      handleChoiceChange(category, [...currentSelections, value]);
                    } else {
                      handleChoiceChange(category, currentSelections.filter((v: string) => v !== value));
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor={`${category}-${value}`}>{label as string}</Label>
              </div>
            ))}
          </div>
        );
        
      default:
        return <p>Unknown choice type</p>;
    }
  };

  if (completed) {
    const totalPossibleScore = worldBuilderScenarios.length * 100;
    const percentScore = Math.round((score / totalPossibleScore) * 100);
    
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">AI World Builder - Results</CardTitle>
          <CardDescription className="text-center">
            You've completed all scenarios!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Your Score: {percentScore}%</h3>
            <Progress value={percentScore} className="h-4 mt-2" />
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">What You've Learned:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>How to design AI systems that are inclusive and accessible</li>
              <li>The importance of considering diverse user needs</li>
              <li>How to balance AI capabilities with ethical considerations</li>
              <li>Strategies for creating AI that respects privacy and promotes fairness</li>
              <li>The impact of design choices on different user groups</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Next Steps:</h4>
            <p>
              Apply what you've learned to create your own AI system designs that prioritize
              inclusion, fairness, and user well-being. Remember that the choices you make
              as a designer have real impacts on the people who use your technology.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => {
            setCompleted(false);
            setCurrentScenarioIndex(0);
            setScore(0);
            setUserChoices({});
            setFeedback(null);
            setShowResults(false);
            setGameProgress({
              completed: false,
              currentScenario: 0,
              score: 0,
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
          <Badge variant="outline">Scenario {currentScenarioIndex + 1} of {worldBuilderScenarios.length}</Badge>
          <Badge variant="secondary">Score: {score}</Badge>
        </div>
        <CardTitle>{currentScenario.title}</CardTitle>
        <CardDescription>{currentScenario.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Scenario:</h3>
          <p>{currentScenario.scenario}</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold">Design Your AI System:</h3>
          
          {Object.entries(currentScenario.choices).map(([category, choices]) => (
            <div key={category} className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">{currentScenario.categoryLabels[category]}</h4>
              <p className="text-sm text-muted-foreground mb-3">{currentScenario.categoryDescriptions[category]}</p>
              {renderChoiceInput(category, choices)}
            </div>
          ))}
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
                <p>{feedback}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showResults ? (
          <Button onClick={evaluateChoices} disabled={Object.keys(userChoices).length < Object.keys(currentScenario.choices).length}>
            Submit Design
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentScenarioIndex < worldBuilderScenarios.length - 1 ? 'Next Scenario' : 'Complete Game'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
