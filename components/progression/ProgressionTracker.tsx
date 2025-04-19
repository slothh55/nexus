"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CheckCircle, Lock, Star, Trophy, BookOpen, Gamepad2 } from 'lucide-react';

interface ProgressionTrackerProps {
  userId?: string;
  learningPathId: string;
}

export function ProgressionTracker({ userId, learningPathId }: ProgressionTrackerProps) {
  // Get learning path data based on ID
  const [learningPathData, setLearningPathData] = useState<any>(null);
  const [userProgress, setUserProgress] = useLocalStorage(`user-progress-${learningPathId}`, {
    completedCourses: [],
    completedGames: [],
    assessmentScores: {},
    badges: [],
    competencyLevels: {
      understand: 0,
      apply: 0,
      create: 0
    },
    overallProgress: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate with local data
    import('@/data/learning-paths').then(module => {
      const path = module.learningPaths.find(p => p.id === learningPathId);
      if (path) {
        setLearningPathData(path);
      }
    });
    
    // Calculate overall progress based on completed items
    calculateOverallProgress();
  }, [learningPathId]);

  const calculateOverallProgress = () => {
    if (!learningPathData) return;
    
    // Get all courses and games from the learning path
    const totalCourses = learningPathData?.courses?.length || 0;
    const totalGames = learningPathData?.games?.length || 0;
    const totalItems = totalCourses + totalGames;
    
    // Count completed items
    const completedItems = userProgress.completedCourses.length + userProgress.completedGames.length;
    
    // Calculate percentage
    const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    // Update progress
    setUserProgress(prev => ({
      ...prev,
      overallProgress: progressPercentage
    }));
  };

  const getCompetencyLevelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 40) return 'Intermediate';
    return 'Beginner';
  };

  const getNextRecommendation = () => {
    if (!learningPathData) return null;
    
    // Check for uncompleted courses
    const uncompletedCourses = learningPathData.courses.filter(
      (course: any) => !userProgress.completedCourses.includes(course.id)
    );
    
    if (uncompletedCourses.length > 0) {
      return {
        type: 'course',
        item: uncompletedCourses[0]
      };
    }
    
    // Check for uncompleted games
    const uncompletedGames = learningPathData.games.filter(
      (game: any) => !userProgress.completedGames.includes(game.id)
    );
    
    if (uncompletedGames.length > 0) {
      return {
        type: 'game',
        item: uncompletedGames[0]
      };
    }
    
    // If everything is completed, recommend assessment
    return {
      type: 'assessment',
      item: {
        id: 'final-assessment',
        title: 'Final Competency Assessment',
        description: 'Test your overall AI literacy competency'
      }
    };
  };

  if (!learningPathData) {
    return <div>Loading learning path data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{learningPathData.title} Progress</CardTitle>
          <CardDescription>Track your journey through the {learningPathData.title} learning path</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Overall Progress</span>
              <span>{userProgress.overallProgress}%</span>
            </div>
            <Progress value={userProgress.overallProgress} className="h-3" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{getCompetencyLevelLabel(userProgress.competencyLevels.understand)}</div>
              <div className="text-sm text-muted-foreground">Understanding</div>
              <Progress value={userProgress.competencyLevels.understand} className="h-2 mt-2" />
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{getCompetencyLevelLabel(userProgress.competencyLevels.apply)}</div>
              <div className="text-sm text-muted-foreground">Application</div>
              <Progress value={userProgress.competencyLevels.apply} className="h-2 mt-2" />
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{getCompetencyLevelLabel(userProgress.competencyLevels.create)}</div>
              <div className="text-sm text-muted-foreground">Creation</div>
              <Progress value={userProgress.competencyLevels.create} className="h-2 mt-2" />
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Earned Badges</h3>
            <div className="flex flex-wrap gap-2">
              {userProgress.badges.length > 0 ? (
                userProgress.badges.map((badge: string) => (
                  <Badge key={badge} variant="outline" className="py-2 px-3">
                    <Trophy className="h-4 w-4 mr-1" />
                    {badge}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Complete courses and games to earn badges!</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="courses">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>Track your progress through the learning modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPathData.courses.map((course: any, index: number) => {
                  const isCompleted = userProgress.completedCourses.includes(course.id);
                  const isLocked = index > 0 && !userProgress.completedCourses.includes(learningPathData.courses[index - 1].id);
                  
                  return (
                    <div key={course.id} className="flex items-center p-3 border rounded-lg">
                      <div className={`mr-3 p-2 rounded-full ${isCompleted ? 'bg-green-100' : isLocked ? 'bg-gray-100' : 'bg-blue-100'}`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : isLocked ? (
                          <Lock className="h-5 w-5 text-gray-400" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      </div>
                      <Badge variant={isCompleted ? "success" : isLocked ? "outline" : "secondary"}>
                        {isCompleted ? "Completed" : isLocked ? "Locked" : "In Progress"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="games" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Games</CardTitle>
              <CardDescription>Practice your skills with these interactive challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPathData.games.map((game: any, index: number) => {
                  const isCompleted = userProgress.completedGames.includes(game.id);
                  // Games are unlocked after completing the first course
                  const isLocked = userProgress.completedCourses.length === 0;
                  
                  return (
                    <div key={game.id} className="flex items-center p-3 border rounded-lg">
                      <div className={`mr-3 p-2 rounded-full ${isCompleted ? 'bg-green-100' : isLocked ? 'bg-gray-100' : 'bg-purple-100'}`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : isLocked ? (
                          <Lock className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Gamepad2 className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{game.title}</h4>
                        <p className="text-sm text-muted-foreground">{game.description}</p>
                      </div>
                      <Badge variant={isCompleted ? "success" : isLocked ? "outline" : "secondary"}>
                        {isCompleted ? "Completed" : isLocked ? "Locked" : "Available"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Competency Assessments</CardTitle>
              <CardDescription>Test your knowledge and track your competency levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPathData.courses.map((course: any) => {
                  const hasCompletedCourse = userProgress.completedCourses.includes(course.id);
                  const assessmentScore = userProgress.assessmentScores[course.id] || 0;
                  
                  return (
                    <div key={`assessment-${course.id}`} className="flex items-center p-3 border rounded-lg">
                      <div className={`mr-3 p-2 rounded-full ${assessmentScore > 0 ? 'bg-green-100' : hasCompletedCourse ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {assessmentScore > 0 ? (
                          <Star className="h-5 w-5 text-green-600" />
                        ) : hasCompletedCourse ? (
                          <Star className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title} Assessment</h4>
                        <p className="text-sm text-muted-foreground">
                          {assessmentScore > 0 
                            ? `Completed with ${assessmentScore}% score` 
                            : hasCompletedCourse 
                              ? 'Ready to take assessment' 
                              : 'Complete the course to unlock'}
                        </p>
                      </div>
                      {assessmentScore > 0 && (
                        <Badge variant="success">{assessmentScore}%</Badge>
                      )}
                    </div>
                  );
                })}
                
                <div className="flex items-center p-3 border rounded-lg">
                  <div className={`mr-3 p-2 rounded-full ${userProgress.overallProgress >= 80 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {userProgress.overallProgress >= 80 ? (
                      <Trophy className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Final AI Literacy Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      {userProgress.overallProgress >= 80 
                        ? 'Comprehensive assessment of all AI literacy skills' 
                        : 'Complete 80% of the learning path to unlock'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>Recommended next steps on your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          {(() => {
            const recommendation = getNextRecommendation();
            if (!recommendation) return <p>You've completed everything in this learning path!</p>;
            
            return (
              <div className="p-4 border rounded-lg bg-muted/50">
                <h3 className="font-medium flex items-center">
                  {recommendation.type === 'course' && <BookOpen className="h-5 w-5 mr-2 text-blue-600" />}
                  {recommendation.type === 'game' && <Gamepad2 className="h-5 w-5 mr-2 text-purple-600" />}
                  {recommendation.type === 'assessment' && <Star className="h-5 w-5 mr-2 text-amber-600" />}
                  {recommendation.item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{recommendation.item.description}</p>
                <Button className="mt-3" size="sm">
                  {recommendation.type === 'course' ? 'Start Course' : 
                   recommendation.type === 'game' ? 'Play Game' : 'Take Assessment'}
                </Button>
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
}
