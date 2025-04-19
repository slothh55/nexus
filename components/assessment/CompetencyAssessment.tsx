"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { aiLiteracyAssessment } from '@/data/ai-literacy-assessment';

interface CompetencyAssessmentProps {
  courseId: string;
  onComplete: (score: number) => void;
}

export function CompetencyAssessment({ courseId, onComplete }: CompetencyAssessmentProps) {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [assessmentProgress, setAssessmentProgress] = useLocalStorage(`assessment-progress-${courseId}`, {
    completed: false,
    currentQuestion: 0,
    selectedAnswers: {},
    score: 0,
  });

  // Filter questions for the current course
  const courseQuestions = aiLiteracyAssessment.filter(q => q.courseId === courseId);
  const currentQuestion = courseQuestions[currentQuestionIndex];

  useEffect(() => {
    if (assessmentProgress.completed) {
      setCompleted(true);
      setScore(assessmentProgress.score);
      setSelectedAnswers(assessmentProgress.selectedAnswers);
    } else {
      setCurrentQuestionIndex(assessmentProgress.currentQuestion);
      setSelectedAnswers(assessmentProgress.selectedAnswers);
      setScore(assessmentProgress.score);
    }
  }, [assessmentProgress]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerId,
    }));
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
    
    // Check if answer is correct
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      // Update score based on competency level
      let pointsEarned = 0;
      switch (currentQuestion.competencyLevel) {
        case 'understand':
          pointsEarned = 5;
          break;
        case 'apply':
          pointsEarned = 10;
          break;
        case 'create':
          pointsEarned = 15;
          break;
        default:
          pointsEarned = 5;
      }
      
      setScore(prev => prev + pointsEarned);
      
      toast({
        title: "Correct!",
        description: `You earned ${pointsEarned} points.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Review the explanation and try to understand the concept.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    
    if (currentQuestionIndex < courseQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      
      // Update progress
      setAssessmentProgress({
        completed: false,
        currentQuestion: currentQuestionIndex + 1,
        selectedAnswers,
        score,
      });
    } else {
      // Assessment completed
      setCompleted(true);
      
      // Calculate competency levels based on score
      const totalPossibleScore = calculateTotalPossibleScore(courseQuestions);
      const percentScore = (score / totalPossibleScore) * 100;
      
      // Update progress
      setAssessmentProgress({
        completed: true,
        currentQuestion: currentQuestionIndex,
        selectedAnswers,
        score,
      });
      
      // Notify parent component
      onComplete(percentScore);
    }
  };

  const calculateTotalPossibleScore = (questions: typeof aiLiteracyAssessment) => {
    return questions.reduce((total, question) => {
      switch (question.competencyLevel) {
        case 'understand':
          return total + 5;
        case 'apply':
          return total + 10;
        case 'create':
          return total + 15;
        default:
          return total + 5;
      }
    }, 0);
  };

  const getCompetencyLevelLabel = (level: string) => {
    switch (level) {
      case 'understand':
        return 'Understanding';
      case 'apply':
        return 'Application';
      case 'create':
        return 'Creation';
      default:
        return 'Basic';
    }
  };

  if (completed) {
    const totalPossibleScore = calculateTotalPossibleScore(courseQuestions);
    const percentScore = Math.round((score / totalPossibleScore) * 100);
    
    let competencyAchieved = 'Beginner';
    if (percentScore >= 90) {
      competencyAchieved = 'Expert';
    } else if (percentScore >= 75) {
      competencyAchieved = 'Advanced';
    } else if (percentScore >= 60) {
      competencyAchieved = 'Intermediate';
    }
    
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Assessment Results</CardTitle>
          <CardDescription className="text-center">
            You've completed the AI literacy assessment!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Your Score: {percentScore}%</h3>
            <p className="text-lg mt-2">Competency Level: <Badge variant="outline">{competencyAchieved}</Badge></p>
            <Progress value={percentScore} className="h-4 mt-4" />
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Competency Breakdown:</h4>
            <div className="space-y-2">
              {['understand', 'apply', 'create'].map(level => {
                const questionsAtLevel = courseQuestions.filter(q => q.competencyLevel === level);
                const possibleScoreAtLevel = calculateTotalPossibleScore(questionsAtLevel);
                const correctAnswersAtLevel = questionsAtLevel.filter(q => 
                  selectedAnswers[courseQuestions.indexOf(q)] === q.correctAnswer
                ).length;
                
                return (
                  <div key={level} className="flex justify-between items-center">
                    <span>{getCompetencyLevelLabel(level)}:</span>
                    <span>{correctAnswersAtLevel} of {questionsAtLevel.length} questions</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Next Steps:</h4>
            <p>
              Based on your results, you've demonstrated {competencyAchieved.toLowerCase()} competency in AI literacy.
              Continue exploring the courses and games to further develop your skills and understanding.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => {
            setCompleted(false);
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedAnswers({});
            setShowExplanation(false);
            setAssessmentProgress({
              completed: false,
              currentQuestion: 0,
              selectedAnswers: {},
              score: 0,
            });
          }}>
            Retake Assessment
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">Question {currentQuestionIndex + 1} of {courseQuestions.length}</Badge>
          <Badge variant="secondary">Score: {score}</Badge>
        </div>
        <CardTitle>AI Literacy Assessment</CardTitle>
        <CardDescription>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="mr-2">
              {getCompetencyLevelLabel(currentQuestion.competencyLevel)}
            </Badge>
            <span>{currentQuestion.competencyArea}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Question:</h3>
          <p>{currentQuestion.question}</p>
        </div>
        
        <div className="space-y-4">
          <RadioGroup
            value={selectedAnswers[currentQuestionIndex]}
            onValueChange={handleAnswerSelect}
          >
            {currentQuestion.answers.map((answer) => (
              <div key={answer.id} className="flex items-start space-x-2">
                <RadioGroupItem
                  value={answer.id}
                  id={answer.id}
                  disabled={showExplanation}
                />
                <Label
                  htmlFor={answer.id}
                  className="flex-1"
                >
                  {answer.text}
                </Label>
                {showExplanation && answer.id === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {showExplanation && answer.id === selectedAnswers[currentQuestionIndex] && 
                  answer.id !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {showExplanation && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Explanation:</h4>
                <p>{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showExplanation ? (
          <Button 
            onClick={handleCheckAnswer} 
            disabled={!selectedAnswers[currentQuestionIndex]}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentQuestionIndex < courseQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
