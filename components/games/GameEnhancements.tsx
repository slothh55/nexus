"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Trophy, Star, CheckCircle, BookOpen, Gamepad2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameEnhancementsProps {
  gameId: string;
  onComplete: (score: number) => void;
}

export function GameEnhancements({ gameId, onComplete }: GameEnhancementsProps) {
  const { toast } = useToast();
  const [streakCount, setStreakCount] = useLocalStorage(`${gameId}-streak`, 0);
  const [achievements, setAchievements] = useLocalStorage(`${gameId}-achievements`, []);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastCompletionDate, setLastCompletionDate] = useLocalStorage(`${gameId}-last-completion`, '');
  const [dailyGoalMet, setDailyGoalMet] = useLocalStorage(`${gameId}-daily-goal`, false);
  const [difficultyLevel, setDifficultyLevel] = useLocalStorage(`${gameId}-difficulty`, 'beginner');
  const [xpPoints, setXpPoints] = useLocalStorage(`${gameId}-xp`, 0);
  const [level, setLevel] = useLocalStorage(`${gameId}-level`, 1);
  
  // Game-specific achievements
  const gameAchievements = {
    'ai-ethics-detective': [
      { id: 'first-case', title: 'First Case Solved', description: 'Solve your first ethics scenario', icon: <CheckCircle className="h-4 w-4" />, xp: 50 },
      { id: 'streak-3', title: 'On a Roll', description: 'Solve 3 scenarios in a row correctly', icon: <Star className="h-4 w-4" />, xp: 100 },
      { id: 'all-categories', title: 'Ethics Expert', description: 'Find issues in all ethics categories', icon: <Trophy className="h-4 w-4" />, xp: 200 },
      { id: 'perfect-score', title: 'Perfect Detective', description: 'Get a perfect score on a hard scenario', icon: <Award className="h-4 w-4" />, xp: 300 },
    ],
    'ai-world-builder': [
      { id: 'first-design', title: 'First Design', description: 'Complete your first AI system design', icon: <CheckCircle className="h-4 w-4" />, xp: 50 },
      { id: 'inclusive-designer', title: 'Inclusive Designer', description: 'Create a highly inclusive AI system', icon: <Star className="h-4 w-4" />, xp: 100 },
      { id: 'all-scenarios', title: 'World Builder', description: 'Design AI systems for all scenarios', icon: <Trophy className="h-4 w-4" />, xp: 200 },
      { id: 'ethical-master', title: 'Ethical Master', description: 'Score 90%+ on all design challenges', icon: <Award className="h-4 w-4" />, xp: 300 },
    ],
    'prompt-engineer': [
      { id: 'first-prompt', title: 'First Prompt', description: 'Write your first successful prompt', icon: <CheckCircle className="h-4 w-4" />, xp: 50 },
      { id: 'no-hints', title: 'Independent Thinker', description: 'Complete a challenge without using hints', icon: <Star className="h-4 w-4" />, xp: 100 },
      { id: 'all-challenges', title: 'Prompt Master', description: 'Complete all prompt engineering challenges', icon: <Trophy className="h-4 w-4" />, xp: 200 },
      { id: 'perfect-prompt', title: 'Perfect Prompter', description: 'Create a prompt that includes all required elements', icon: <Award className="h-4 w-4" />, xp: 300 },
    ]
  };
  
  // Check for level up based on XP
  useEffect(() => {
    const xpThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    let newLevel = 1;
    
    for (let i = 1; i < xpThresholds.length; i++) {
      if (xpPoints >= xpThresholds[i]) {
        newLevel = i + 1;
      } else {
        break;
      }
    }
    
    if (newLevel > level) {
      setLevel(newLevel);
      celebrateLevelUp(newLevel);
    }
  }, [xpPoints, level]);
  
  // Check for daily streak
  useEffect(() => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    if (lastCompletionDate === yesterdayString) {
      // Continuing streak
      setStreakCount(prev => prev + 1);
    } else if (lastCompletionDate !== today) {
      // Reset streak if not played yesterday and not yet played today
      setStreakCount(1);
    }
    
    // Check for streak achievements
    if (streakCount === 3 && !achievements.includes('streak-3')) {
      awardAchievement('streak-3');
    }
    
    // Set today as completion date
    setLastCompletionDate(today);
    setDailyGoalMet(true);
  }, []);
  
  // Award an achievement
  const awardAchievement = (achievementId: string) => {
    if (!achievements.includes(achievementId)) {
      setAchievements([...achievements, achievementId]);
      
      // Find achievement details
      const achievementDetails = gameAchievements[gameId as keyof typeof gameAchievements]?.find(a => a.id === achievementId);
      
      if (achievementDetails) {
        // Award XP
        setXpPoints(prev => prev + achievementDetails.xp);
        
        // Show celebration
        setShowCelebration(true);
        triggerConfetti();
        
        // Show toast
        toast({
          title: `Achievement Unlocked: ${achievementDetails.title}`,
          description: achievementDetails.description,
          variant: "default",
        });
        
        // Hide celebration after 3 seconds
        setTimeout(() => {
          setShowCelebration(false);
        }, 3000);
      }
    }
  };
  
  // Trigger confetti animation
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  // Celebrate level up
  const celebrateLevelUp = (newLevel: number) => {
    triggerConfetti();
    
    toast({
      title: `Level Up! You're now level ${newLevel}`,
      description: "Keep learning to unlock more achievements and levels!",
      variant: "default",
    });
  };
  
  // Get XP progress to next level
  const getXpProgress = () => {
    const xpThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    
    if (level >= xpThresholds.length) return 100; // Max level
    
    const currentLevelXp = xpThresholds[level - 1];
    const nextLevelXp = xpThresholds[level];
    const xpForNextLevel = nextLevelXp - currentLevelXp;
    const xpProgress = xpPoints - currentLevelXp;
    
    return Math.round((xpProgress / xpForNextLevel) * 100);
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficultyLevel(newDifficulty);
    
    toast({
      title: `Difficulty changed to ${newDifficulty}`,
      description: `Game difficulty has been updated. ${newDifficulty === 'expert' ? 'Good luck!' : ''}`,
      variant: "default",
    });
  };
  
  // Simulate game completion
  const simulateGameCompletion = (score: number) => {
    // Award first completion achievement if not already awarded
    if (!achievements.includes(`first-${gameId.split('-').pop()}`)) {
      awardAchievement(`first-${gameId.split('-').pop()}`);
    }
    
    // Award XP based on score and difficulty
    let xpGained = Math.round(score / 10);
    if (difficultyLevel === 'intermediate') xpGained *= 1.5;
    if (difficultyLevel === 'expert') xpGained *= 2;
    
    setXpPoints(prev => prev + xpGained);
    
    // Notify parent component
    onComplete(score);
  };

  return (
    <div className="space-y-6">
      {/* Player Stats Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Player Stats</CardTitle>
            <Badge variant="outline" className="font-bold">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>XP: {xpPoints}</span>
              <span>Next Level: {getXpProgress()}%</span>
            </div>
            <Progress value={getXpProgress()} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-1" />
              <span className="font-medium">Daily Streak:</span>
            </div>
            <Badge variant={streakCount > 0 ? "default" : "outline"}>
              {streakCount} {streakCount === 1 ? 'day' : 'days'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-amber-500 mr-1" />
              <span className="font-medium">Achievements:</span>
            </div>
            <Badge variant="outline">{achievements.length} / {gameAchievements[gameId as keyof typeof gameAchievements]?.length}</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Gamepad2 className="h-5 w-5 text-amber-500 mr-1" />
              <span className="font-medium">Difficulty:</span>
            </div>
            <div className="flex space-x-1">
              <Button 
                size="sm" 
                variant={difficultyLevel === 'beginner' ? "default" : "outline"}
                onClick={() => handleDifficultyChange('beginner')}
                className="h-7 text-xs"
              >
                Beginner
              </Button>
              <Button 
                size="sm" 
                variant={difficultyLevel === 'intermediate' ? "default" : "outline"}
                onClick={() => handleDifficultyChange('intermediate')}
                className="h-7 text-xs"
              >
                Intermediate
              </Button>
              <Button 
                size="sm" 
                variant={difficultyLevel === 'expert' ? "default" : "outline"}
                onClick={() => handleDifficultyChange('expert')}
                className="h-7 text-xs"
              >
                Expert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-amber-500" />
            Achievements
          </CardTitle>
          <CardDescription>
            Complete special challenges to earn achievements and XP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gameAchievements[gameId as keyof typeof gameAchievements]?.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-3 border rounded-lg flex items-center ${
                  achievements.includes(achievement.id) 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-muted/50 border-muted text-muted-foreground'
                }`}
              >
                <div className={`p-2 rounded-full mr-3 ${
                  achievements.includes(achievement.id) 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs">{achievement.description}</p>
                </div>
                <Badge className="ml-auto" variant={achievements.includes(achievement.id) ? "default" : "outline"}>
                  {achievement.xp} XP
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-8 rounded-lg text-center animate-bounce">
            <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
            <p className="text-lg">
              {gameAchievements[gameId as keyof typeof gameAchievements]?.find(a => a.id === achievements[achievements.length - 1])?.title}
            </p>
          </div>
        </div>
      )}
      
      {/* Simulation Controls (for demo purposes) */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation Controls</CardTitle>
          <CardDescription>
            These controls simulate game completion for demonstration purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={() => simulateGameCompletion(60)}>
              Complete Game (60% Score)
            </Button>
            <Button onClick={() => simulateGameCompletion(90)}>
              Complete Game (90% Score)
            </Button>
            <Button onClick={() => triggerConfetti()}>
              Trigger Celebration
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Note: In the actual game, these controls would not be visible. Achievements and XP would be awarded based on real player performance.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
