# Quiz and Badge System Implementation

This document explains the implementation of the quiz and badge system for the Digital Inclusion Companion application.

## Overview

The system provides a client-side implementation of quizzes, badges, and progress tracking without requiring authentication. All data is stored in the browser's localStorage, making it accessible across sessions while maintaining privacy.

## Components

### 1. Local Storage System (`lib/local-storage.ts`)

- Provides utilities for storing and retrieving user progress data
- Handles game progress, quiz results, and badge achievements
- Includes versioning for future updates
- Calculates overall progress across all activities

### 2. Badge System (`lib/badge-system.ts`)

- Defines badge types and criteria for earning badges
- Implements badge awarding logic based on user actions
- Provides utilities for checking badge eligibility
- Supports different badge levels (bronze, silver, gold)
- Includes special achievement badges for completing multiple activities

### 3. Quiz System (`lib/quiz-system.ts`)

- Defines quiz data structures and question formats
- Handles quiz scoring and result calculation
- Tracks quiz progress and completion status
- Integrates with the badge system to award badges for quiz completion

### 4. Quiz Data (`data/quizzes/`)

- Contains quiz questions and answers for different topics:
  - Phishing Defender Quiz
  - Fact Checker Quiz
  - Password Hero Quiz
  - Privacy Protector Quiz

### 5. UI Components

- `GameQuiz.tsx`: Reusable quiz component with animations and feedback
- `BadgeCard.tsx`: Displays badge information with progress tracking
- `BadgeNotification.tsx`: Shows notifications when badges are earned

## Pages

- `/badges`: Displays all available badges and their unlock status
- `/quizzes`: Shows available quizzes and tracks completion
- `/progress`: Provides an overview of the user's learning journey

## How It Works

1. When a user completes a quiz or game, their progress is saved to localStorage
2. The system automatically checks if any badges should be awarded
3. If a badge is earned, a notification is displayed
4. Progress is tracked across sessions, allowing users to continue their journey

## Adding New Quizzes

To add a new quiz:

1. Create a new quiz file in `data/quizzes/`
2. Add the quiz to the index file in `data/quizzes/index.ts`
3. Define badge criteria for the quiz in `lib/badge-system.ts`

## Adding New Badges

To add a new badge:

1. Add the badge definition to the `badges` array in `lib/badge-system.ts`
2. Define the criteria for earning the badge
3. The badge will automatically appear on the badges page

## Sound Effects

The system includes sound effects for:
- Correct answers
- Incorrect answers
- Badge unlocks

Place sound files in the `/public/sounds/` directory.

## Future Enhancements

- Add more quiz types (matching, fill-in-the-blank, etc.)
- Implement timed challenges
- Add more badge levels and special achievements
- Create leaderboards using anonymous IDs
