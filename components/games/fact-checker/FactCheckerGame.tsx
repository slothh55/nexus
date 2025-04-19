'use client'

import React, { useState, useEffect } from 'react'
import { GameCanvas } from '../shared/GameCanvas'
import { LoadingScreen } from '../shared/LoadingScreen'
import { useGameState, useGameTimer, formatTime } from '@/lib/game-utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Brain, 
  Search, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Clock, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles,
  AlertCircle,
  BookOpen,
  FileText,
  Globe,
  Link,
  Shield,
  Star
} from 'lucide-react'
import { FactCheckerScene } from './FactCheckerScene'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAchievements } from '@/hooks/use-achievements'
import { useConfetti } from '@/hooks/use-confetti'

// Game state type
interface GameState {
  started: boolean
  over: boolean
  score: number
  lives: number
  level: number
  currentClaimIndex: number
  claimsPlayed: number[]
  showFeedback: boolean
  lastAnswerCorrect: boolean
  showInstructions: boolean
  showGameOver: boolean
  userVerdict: boolean | null
  activeTab: string
  difficulty: 'beginner' | 'intermediate' | 'expert'
  timeLimit: number
  sourceChecked: string[]
  streakCount: number
  totalCorrect: number
  totalClaims: number
}

// Claim data type
export interface FactClaim {
  id: number
  claim: string
  isTrue: boolean
  explanation: string
  evidence: {
    source: string
    url: string
    reliability: number
    quote: string
    type: 'scientific' | 'educational' | 'news' | 'blog' | 'social'
  }[]
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  relatedTruth: string
  tipForChecking?: string
}

// Sample claims data
const factClaims: FactClaim[] = [
  {
    id: 1,
    claim: "Bananas grow on trees.",
    isTrue: false,
    explanation:
      "Bananas actually grow on plants, not trees. The banana 'tree' is technically a herb and the banana itself is considered a berry. The trunk of a banana plant is made of tightly wrapped leaves, not wood.",
    evidence: [
      {
        source: "National Geographic",
        url: "https://www.nationalgeographic.com/",
        reliability: 95,
        quote:
          "Bananas grow on plants, not trees. These plants are classified as herbs, and bananas themselves are berries.",
        type: "educational",
      },
      {
        source: "Banana Facts Website",
        url: "https://www.bananafacts.org/",
        reliability: 85,
        quote: "The banana plant is the largest herbaceous flowering plant in the world, not a tree.",
        type: "educational",
      },
      {
        source: "Fruit Blog",
        url: "https://fruitblog.example.com/",
        reliability: 60,
        quote: "Bananas are delicious tropical fruits that grow on tall banana trees in warm climates.",
        type: "blog",
      },
    ],
    difficulty: "easy",
    category: "Botany",
    relatedTruth: "Bananas grow on large herbaceous plants that can reach up to 25 feet tall.",
    tipForChecking: "When fact-checking botanical claims, consult scientific or educational sources rather than casual blogs or social media."
  },
  {
    id: 2,
    claim: "The Great Wall of China is visible from space with the naked eye.",
    isTrue: false,
    explanation:
      "Contrary to popular belief, the Great Wall of China cannot be seen from space with the naked eye. While some human structures are visible from space with the help of cameras and telescopes, the Great Wall is difficult to spot even with these tools due to its color blending with the surrounding landscape.",
    evidence: [
      {
        source: "NASA",
        url: "https://www.nasa.gov/",
        reliability: 99,
        quote:
          "The Great Wall of China, frequently billed as the only man-made object visible from space, isn't visible from low Earth orbit without magnification.",
        type: "scientific",
      },
      {
        source: "Scientific American",
        url: "https://www.scientificamerican.com/",
        reliability: 95,
        quote:
          "Contrary to common belief, the Great Wall of China is not visible from space by the naked eye without aid.",
        type: "scientific",
      },
      {
        source: "China Daily",
        url: "http://www.chinadaily.com.cn/",
        reliability: 70,
        quote: "The Great Wall is one of the greatest wonders in the world and can be seen from space.",
        type: "news",
      },
    ],
    difficulty: "medium",
    category: "Geography",
    relatedTruth:
      "The Great Wall of China spans approximately 13,171 miles (21,196 kilometers) and is a UNESCO World Heritage Site.",
    tipForChecking: "For scientific claims, prioritize sources from scientific organizations (like NASA) over general news outlets, especially when the claim involves technical capabilities."
  },
  {
    id: 3,
    claim: "A dog's mouth is cleaner than a human's mouth.",
    isTrue: false,
    explanation:
      "This is a common misconception. Dogs' mouths contain different types of bacteria than human mouths, but they are not cleaner. In fact, dogs' mouths can harbor bacteria that can be harmful to humans. Both human and dog mouths contain hundreds of different bacterial species.",
    evidence: [
      {
        source: "American Kennel Club",
        url: "https://www.akc.org/",
        reliability: 90,
        quote:
          "The bacteria in a dog's mouth are different from the bacteria in a human's mouth. Dogs' mouths aren't necessarily cleaner than human mouths.",
        type: "educational",
      },
      {
        source: "Journal of Oral Microbiology",
        url: "https://www.tandfonline.com/toc/zjom20/current",
        reliability: 98,
        quote:
          "Studies have shown that dogs carry specific types of bacteria in their mouths that humans don't typically have, and vice versa. Neither can be considered 'cleaner' in absolute terms.",
        type: "scientific",
      },
      {
        source: "Pet Health Blog",
        url: "https://pethealthblog.example.com/",
        reliability: 65,
        quote:
          "Dogs' mouths are much cleaner than humans', which is why they can lick their wounds without getting infections.",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Biology",
    relatedTruth:
      "Both dog and human mouths contain hundreds of bacterial species, many of which are specific to each species.",
    tipForChecking: "When evaluating health claims, look for peer-reviewed scientific journals or established medical organizations rather than blogs or anecdotal evidence."
  },
  {
    id: 4,
    claim: "Water conducts electricity.",
    isTrue: false,
    explanation:
      "Pure water (H2O) is actually an insulator and does not conduct electricity well. What conducts electricity is the impurities in water, such as dissolved salts and minerals. These impurities break down into ions that can carry an electric current through the water.",
    evidence: [
      {
        source: "American Chemical Society",
        url: "https://www.acs.org/",
        reliability: 98,
        quote:
          "Pure water is not a good conductor of electricity. It's the impurities in water, such as dissolved salts, that conduct electricity.",
        type: "scientific",
      },
      {
        source: "Khan Academy",
        url: "https://www.khanacademy.org/",
        reliability: 95,
        quote:
          "Distilled water is a poor conductor of electricity because it doesn't contain dissolved ions. Tap water conducts electricity due to dissolved minerals and salts.",
        type: "educational",
      },
      {
        source: "Science Facts",
        url: "https://sciencefacts.example.com/",
        reliability: 75,
        quote: "Water is a good conductor of electricity, which is why you should never use electrical appliances near water.",
        type: "blog",
      },
    ],
    difficulty: "hard",
    category: "Physics",
    relatedTruth:
      "Pure water is a poor conductor of electricity, but tap water and seawater conduct electricity well due to dissolved minerals and salts.",
    tipForChecking: "For scientific claims, be aware of oversimplifications. Many scientific facts have important nuances that are often lost in popular understanding."
  },
  {
    id: 5,
    claim: "Humans only use 10% of their brains.",
    isTrue: false,
    explanation:
      "This is a persistent myth with no scientific basis. Modern brain scans have shown that all parts of the brain have active functions, and while not all neurons fire simultaneously, over the course of a day, a person uses virtually all of their brain. Different activities activate different parts of the brain, but there is no 'unused' 90%.",
    evidence: [
      {
        source: "Scientific American",
        url: "https://www.scientificamerican.com/",
        reliability: 95,
        quote:
          "The 10% myth is demonstrably false. Brain scans clearly show activity throughout the entire brain, even during sleep.",
        type: "scientific",
      },
      {
        source: "Neurological Society of America",
        url: "https://www.example-neurology.org/",
        reliability: 97,
        quote:
          "Functional MRI studies demonstrate that even simple tasks activate multiple brain regions, and no area of the brain is completely inactive during normal consciousness.",
        type: "scientific",
      },
      {
        source: "Mind Power Blog",
        url: "https://mindpower.example.com/",
        reliability: 40,
        quote:
          "Humans only use 10% of their brain capacity. Imagine what we could achieve if we unlocked the other 90%!",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Neuroscience",
    relatedTruth:
      "Humans use all parts of their brain, though not all at the same time. Different activities activate different regions of the brain.",
    tipForChecking: "Be skeptical of claims that have been popularized in movies or fiction, especially those that seem too amazing to be true."
  },
  {
    id: 6,
    claim: "Lightning never strikes the same place twice.",
    isTrue: false,
    explanation:
      "This is a common saying but is scientifically false. Lightning can and does strike the same place multiple times. Tall structures like the Empire State Building are struck by lightning dozens of times each year. Lightning tends to hit tall objects that conduct electricity well, making them likely targets for repeated strikes.",
    evidence: [
      {
        source: "National Weather Service",
        url: "https://www.weather.gov/",
        reliability: 98,
        quote:
          "Lightning can strike the same place multiple times during a single thunderstorm. Tall, isolated objects are more susceptible to lightning strikes.",
        type: "scientific",
      },
      {
        source: "Empire State Building Official Site",
        url: "https://www.esbnyc.com/",
        reliability: 90,
        quote:
          "The Empire State Building is struck by lightning approximately 25 times per year, sometimes multiple times during a single storm.",
        type: "educational",
      },
      {
        source: "Weather Myths Blog",
        url: "https://weathermyths.example.com/",
        reliability: 60,
        quote:
          "The old saying that lightning never strikes the same place twice is a way to reassure people that unfortunate events won't repeat themselves.",
        type: "blog",
      },
    ],
    difficulty: "easy",
    category: "Meteorology",
    relatedTruth:
      "Lightning often strikes the same place multiple times, especially tall structures and isolated objects.",
    tipForChecking: "For weather and natural phenomena claims, consult official meteorological organizations rather than folk wisdom or sayings."
  },
  {
    id: 7,
    claim: "Vitamin C prevents the common cold.",
    isTrue: false,
    explanation:
      "While Vitamin C is important for immune function, scientific research has not found strong evidence that it prevents colds in the general population. Some studies suggest it may slightly reduce the duration or severity of colds in some people, but it does not prevent infection. Regular supplementation may provide a small benefit for people under high physical stress.",
    evidence: [
      {
        source: "National Institutes of Health",
        url: "https://www.nih.gov/",
        reliability: 99,
        quote:
          "Regular supplementation with vitamin C does not reduce the incidence of colds in the general population, but may reduce their duration and severity.",
        type: "scientific",
      },
      {
        source: "Cochrane Database of Systematic Reviews",
        url: "https://www.cochranelibrary.com/",
        reliability: 98,
        quote:
          "Taking vitamin C regularly does not prevent the common cold in the average person. However, it may reduce the duration of cold symptoms by about 8% in adults and 14% in children.",
        type: "scientific",
      },
      {
        source: "Health & Wellness Blog",
        url: "https://healthblog.example.com/",
        reliability: 50,
        quote:
          "Vitamin C is a powerful cold-fighter! Take it daily to boost your immune system and prevent catching colds this winter.",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Health",
    relatedTruth:
      "Vitamin C may slightly reduce the duration and severity of colds but does not prevent them in most people.",
    tipForChecking: "For health claims, look for systematic reviews and meta-analyses that combine results from multiple studies, rather than single studies or anecdotal evidence."
  },
  {
    id: 8,
    claim: "The Great Pyramid of Giza was built by slaves.",
    isTrue: false,
    explanation:
      "Archaeological evidence suggests that the Great Pyramid was not built by slaves but by paid workers. Discoveries of worker villages, including bakeries, breweries, and burial sites, indicate that the workers were respected members of society. They were likely skilled laborers and farmers who worked on the pyramids during the Nile's annual flood when they couldn't farm.",
    evidence: [
      {
        source: "Harvard University Archaeology Department",
        url: "https://archaeology.harvard.edu/",
        reliability: 97,
        quote:
          "Evidence from worker settlements near the pyramids suggests they were built by paid laborers, not slaves. These workers were given proper burials near the pyramids, an honor that would not have been afforded to slaves.",
        type: "scientific",
      },
      {
        source: "Smithsonian Magazine",
        url: "https://www.smithsonianmag.com/",
        reliability: 93,
        quote:
          "Archaeological discoveries since the 1990s have revealed that the pyramid builders were native Egyptian agricultural laborers who worked on the pyramids during the farming off-season.",
        type: "educational",
      },
      {
        source: "Ancient Mysteries Blog",
        url: "https://ancientmysteries.example.com/",
        reliability: 45,
        quote:
          "The massive pyramids could only have been built through the forced labor of thousands of slaves under the harsh Egyptian sun.",
        type: "blog",
      },
    ],
    difficulty: "hard",
    category: "History",
    relatedTruth:
      "The Great Pyramid was likely built by paid skilled workers and farmers who worked during the Nile's annual flood season.",
    tipForChecking: "For historical claims, be aware that new archaeological evidence can change our understanding of history. Check for recent scholarly updates rather than relying on older textbooks or popular culture."
  },
  {
    id: 9,
    claim: "Eating carrots improves your night vision.",
    isTrue: false,
    explanation:
      "While carrots contain vitamin A (from beta-carotene), which is important for eye health and vision, eating carrots doesn't actually improve night vision beyond normal levels. This myth originated during World War II when the British spread disinformation that their pilots' exceptional night vision came from eating carrots, when in reality they were using radar technology they wanted to keep secret.",
    evidence: [
      {
        source: "American Academy of Ophthalmology",
        url: "https://www.aao.org/",
        reliability: 98,
        quote:
          "While vitamin A deficiency can cause night blindness, eating extra carrots won't improve vision beyond normal levels in people who aren't deficient.",
        type: "scientific",
      },
      {
        source: "British Medical Journal",
        url: "https://www.bmj.com/",
        reliability: 97,
        quote:
          "The carrot-night vision myth was propaganda spread during WWII to hide the fact that the Royal Air Force was using radar to locate German bombers at night.",
        type: "scientific",
      },
      {
        source: "Nutrition Blog",
        url: "https://nutritionblog.example.com/",
        reliability: 65,
        quote:
          "Carrots are packed with beta-carotene that converts to vitamin A, boosting your night vision and eye health!",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Nutrition",
    relatedTruth:
      "Vitamin A from carrots is important for eye health, but eating extra carrots won't improve night vision beyond normal levels.",
    tipForChecking: "For nutrition claims, be wary of exaggerated benefits. Many foods are healthy but don't have 'super' powers. Check medical or nutrition science sources rather than wellness blogs."
  },
  {
    id: 10,
    claim: "We have five senses: sight, hearing, taste, smell, and touch.",
    isTrue: false,
    explanation:
      "Humans actually have many more than five senses. In addition to the traditional five, we have proprioception (awareness of body position), equilibrioception (balance), thermoception (temperature), nociception (pain), hunger, thirst, and several others. The 'five senses' concept is an oversimplification that has persisted in popular culture.",
    evidence: [
      {
        source: "Harvard Medical School",
        url: "https://hms.harvard.edu/",
        reliability: 98,
        quote:
          "Humans have many more than five senses. We can detect temperature, pain, hunger, thirst, body position, balance, and more, all of which qualify as distinct senses.",
        type: "scientific",
      },
      {
        source: "Neuroscience Journal",
        url: "https://www.jneurosci.org/",
        reliability: 97,
        quote:
          "The traditional five senses model fails to account for numerous sensory systems including proprioception, equilibrioception, and interoception, among others.",
        type: "scientific",
      },
      {
        source: "Elementary Education Resources",
        url: "https://elementaryeducation.example.com/",
        reliability: 75,
        quote:
          "The five senses - sight, hearing, taste, smell, and touch - help us understand and interact with the world around us.",
        type: "educational",
      },
    ],
    difficulty: "hard",
    category: "Biology",
    relatedTruth:
      "Humans have many more than five senses, including balance, temperature detection, pain, and awareness of body position.",
    tipForChecking: "Be skeptical of oversimplified facts taught in elementary education. Many scientific concepts are initially taught in simplified forms that don't capture the full complexity."
  },
  {
    id: 11,
    claim: "Goldfish have a three-second memory.",
    isTrue: false,
    explanation:
      "Contrary to popular belief, goldfish have a memory span of at least three months, not three seconds. They can learn to respond to certain sounds, colors, and routines. Research has shown they can be trained to recognize feeding times and even perform simple tricks, demonstrating their ability to form long-term memories.",
    evidence: [
      {
        source: "Animal Cognition Journal",
        url: "https://www.springer.com/journal/10071",
        reliability: 96,
        quote:
          "Studies have demonstrated that goldfish can remember learned behaviors for months and can distinguish between different humans, sounds, and colors.",
        type: "scientific",
      },
      {
        source: "University of Oxford Animal Behavior Research",
        url: "https://www.ox.ac.uk/",
        reliability: 97,
        quote:
          "Goldfish have demonstrated the ability to learn complex tasks and retain this learning for extended periods, disproving the three-second memory myth.",
        type: "scientific",
      },
      {
        source: "Pet Care Blog",
        url: "https://petcareblog.example.com/",
        reliability: 60,
        quote:
          "Goldfish are simple creatures with tiny brains and memories that last only seconds, which is why they can happily live in small bowls.",
        type: "blog",
      },
    ],
    difficulty: "easy",
    category: "Zoology",
    relatedTruth:
      "Goldfish can remember things for months and can learn to recognize people, sounds, and feeding routines.",
    tipForChecking: "Animal behavior claims often get simplified or anthropomorphized in popular culture. Check zoological or scientific sources rather than pet blogs or common sayings."
  },
  {
    id: 12,
    claim: "You should drink eight 8-ounce glasses of water every day.",
    isTrue: false,
    explanation:
      "The '8x8 rule' (eight 8-ounce glasses of water daily) has no scientific basis. Water needs vary based on activity level, climate, health, and diet. Many foods contain significant water, contributing to hydration. The Institute of Medicine recommends about 3.7 liters (125 oz) total water for men and 2.7 liters (91 oz) for women daily from all sources, including food, not just drinking water.",
    evidence: [
      {
        source: "Mayo Clinic",
        url: "https://www.mayoclinic.org/",
        reliability: 98,
        quote:
          "No single formula fits everyone. But knowing more about your body's need for fluids will help you estimate how much water to drink each day. Food typically provides about 20% of total water intake.",
        type: "scientific",
      },
      {
        source: "Journal of Physiology",
        url: "https://physoc.onlinelibrary.wiley.com/journal/14697793",
        reliability: 97,
        quote:
          "The origin of the '8x8' rule remains unclear, and scientific studies suggest that adequate intake varies widely based on environmental factors, exercise, and individual physiology.",
        type: "scientific",
      },
      {
        source: "Wellness Hydration Guide",
        url: "https://wellnessguide.example.com/",
        reliability: 55,
        quote:
          "Everyone should drink at least eight 8-ounce glasses of pure water daily to flush toxins and maintain optimal health.",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Health",
    relatedTruth:
      "Water needs vary by individual. Total water intake includes water from food and all beverages, not just plain water.",
    tipForChecking: "For health recommendations, look for guidance from medical organizations rather than wellness blogs, and be wary of one-size-fits-all rules."
  },
  {
    id: 13,
    claim: "The tongue has specific taste zones for sweet, sour, salty, and bitter.",
    isTrue: false,
    explanation:
      "The tongue map showing distinct zones for different tastes (sweet at the tip, bitter at the back, etc.) is a misconception. In reality, all taste buds can detect all taste sensations, though there may be slight differences in sensitivity across the tongue. This myth originated from a mistranslation of a German paper in the early 20th century and persisted in textbooks despite being disproven.",
    evidence: [
      {
        source: "Nature Neuroscience",
        url: "https://www.nature.com/neuro/",
        reliability: 99,
        quote:
          "All taste qualities can be detected across all regions of the tongue that contain taste buds. The 'tongue map' is a scientific misconception.",
        type: "scientific",
      },
      {
        source: "Smithsonian Magazine",
        url: "https://www.smithsonianmag.com/",
        reliability: 93,
        quote:
          "The tongue map showing distinct taste regions was based on a mistranslation of German research from 1901 and has been thoroughly debunked by modern research.",
        type: "educational",
      },
      {
        source: "Elementary Science Textbook",
        url: "https://elementaryscience.example.com/",
        reliability: 70,
        quote:
          "The tongue has special areas for different tastes: sweet at the tip, sour at the sides, bitter at the back, and salty across the front and sides.",
        type: "educational",
      },
    ],
    difficulty: "medium",
    category: "Biology",
    relatedTruth:
      "All taste buds can detect all five basic tastes (sweet, sour, salty, bitter, and umami), though with slight variations in sensitivity.",
    tipForChecking: "Be wary of 'facts' that have been taught in schools for generations without updates. Scientific understanding evolves, but educational materials don't always keep pace."
  },
  {
    id: 14,
    claim: "Humans evolved from chimpanzees.",
    isTrue: false,
    explanation:
      "Humans did not evolve from chimpanzees. Rather, humans and chimpanzees share a common ancestor that lived approximately 6-7 million years ago. After this ancestral species, the lineages split and evolved separately, with one eventually leading to modern humans and the other to modern chimpanzees. We are evolutionary cousins, not descendants of each other.",
    evidence: [
      {
        source: "American Museum of Natural History",
        url: "https://www.amnh.org/",
        reliability: 97,
        quote:
          "Humans and chimpanzees are evolutionary cousins, having split from a common ancestor about 6-7 million years ago, rather than humans evolving from chimpanzees.",
        type: "scientific",
      },
      {
        source: "Nature Journal",
        url: "https://www.nature.com/",
        reliability: 99,
        quote:
          "Genomic studies confirm that humans and chimpanzees share approximately 98.8% of their DNA, supporting the theory of a common ancestor rather than direct descent.",
        type: "scientific",
      },
      {
        source: "Evolution Skeptics Forum",
        url: "https://evolutionskeptics.example.com/",
        reliability: 30,
        quote:
          "Scientists claim humans evolved from monkeys, but this theory has many holes and contradicts the evidence of intelligent design.",
        type: "blog",
      },
    ],
    difficulty: "hard",
    category: "Evolution",
    relatedTruth:
      "Humans and chimpanzees share a common ancestor that lived approximately 6-7 million years ago, after which our evolutionary paths diverged.",
    tipForChecking: "For evolutionary biology claims, consult natural history museums and peer-reviewed scientific sources rather than religious or ideologically motivated websites."
  },
  {
    id: 15,
    claim: "The COVID-19 vaccines alter your DNA.",
    isTrue: false,
    explanation:
      "COVID-19 vaccines do not alter human DNA. mRNA vaccines (like Pfizer and Moderna) deliver instructions to cells to make a protein that triggers an immune response, but the mRNA never enters the cell nucleus where DNA is kept. Vector vaccines (like Johnson & Johnson) use a modified version of a different virus to deliver instructions, but these also do not integrate into DNA. After the body produces an immune response, the vaccine material breaks down and is eliminated.",
    evidence: [
      {
        source: "Centers for Disease Control and Prevention",
        url: "https://www.cdc.gov/",
        reliability: 98,
        quote:
          "COVID-19 vaccines do not change or interact with your DNA in any way. The genetic material in mRNA vaccines never enters the nucleus of the cell, which is where our DNA is kept.",
        type: "scientific",
      },
      {
        source: "World Health Organization",
        url: "https://www.who.int/",
        reliability: 97,
        quote:
          "None of the authorized COVID-19 vaccines can modify a person's genes. Vaccine mRNA does not enter the cell nucleus and does not interact with DNA.",
        type: "scientific",
      },
      {
        source: "Health Freedom Alliance",
        url: "https://healthfreedom.example.com/",
        reliability: 20,
        quote:
          "The experimental COVID vaccines use new technology that alters your genetic code, turning people into genetically modified organisms.",
        type: "blog",
      },
    ],
    difficulty: "medium",
    category: "Medicine",
    relatedTruth:
      "COVID-19 vaccines work by instructing cells to produce an immune response without altering DNA or entering the cell nucleus.",
    tipForChecking: "For medical and vaccine information, rely on major health organizations like the CDC and WHO rather than alternative health websites or social media posts."
  }
];

// Define the game achievements
const achievements = [
  { id: 'first-check', title: 'Fact Novice', description: 'Complete your first fact check', icon: <FileText className="h-4 w-4" />, xp: 50 },
  { id: 'source-master', title: 'Source Master', description: 'Correctly evaluate all sources in a round', icon: <Link className="h-4 w-4" />, xp: 100 },
  { id: 'speed-checker', title: 'Quick Verifier', description: 'Complete a fact-checking round in under 20 seconds', icon: <Clock className="h-4 w-4" />, xp: 75 },
  { id: 'fact-expert', title: 'Fact-Checking Expert', description: 'Reach a score of 500 points', icon: <Trophy className="h-4 w-4" />, xp: 200 },
  { id: 'all-types', title: 'Misinformation Analyst', description: 'Identify all types of misinformation', icon: <Shield className="h-4 w-4" />, xp: 150 },
  { id: 'perfect-streak', title: 'Truth Streak', description: 'Get 5 correct verdicts in a row', icon: <Star className="h-4 w-4" />, xp: 125 }
]

// Source reliability rating component
const ReliabilityRating = ({ rating }: { rating: number }) => {
  let color = 'text-red-500'
  if (rating >= 90) color = 'text-green-500'
  else if (rating >= 70) color = 'text-amber-500'
  
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm">Reliability:</span>
      <div className="flex items-center">
        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              rating >= 90 ? 'bg-green-500' :
              rating >= 70 ? 'bg-amber-500' :
              rating >= 50 ? 'bg-orange-500' :
              'bg-red-500'
            }`}
            style={{ width: `${rating}%` }}
          ></div>
        </div>
        <span className={`ml-2 text-sm font-medium ${color}`}>{rating}%</span>
      </div>
    </div>
  )
}

// Source type badge component
const SourceTypeBadge = ({ type }: { type: string }) => {
  let color = 'bg-gray-100 text-gray-800'
  let icon = <FileText className="h-3 w-3 mr-1" />
  
  switch (type) {
    case 'scientific':
      color = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      icon = <Brain className="h-3 w-3 mr-1" />
      break
    case 'educational':
      color = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      icon = <BookOpen className="h-3 w-3 mr-1" />
      break
    case 'news':
      color = 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      icon = <Globe className="h-3 w-3 mr-1" />
      break
    case 'blog':
      color = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      icon = <FileText className="h-3 w-3 mr-1" />
      break
    case 'social':
      color = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      icon = <Globe className="h-3 w-3 mr-1" />
      break
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {icon}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

export function FactCheckerGame() {
  // Game state
  const [state, updateState] = useGameState<GameState>({
    started: false,
    over: false,
    score: 0,
    lives: 3,
    level: 1,
    currentClaimIndex: 0,
    claimsPlayed: [],
    showFeedback: false,
    lastAnswerCorrect: false,
    showInstructions: true,
    showGameOver: false,
    userVerdict: null,
    activeTab: 'claim',
    difficulty: 'beginner',
    timeLimit: 60,
    sourceChecked: [],
    streakCount: 0,
    totalCorrect: 0,
    totalClaims: 0
  });

  // Timer
  const { timeLeft, startTimer, pauseTimer, resetTimer } = useGameTimer(state.timeLimit, () => {
    handleTimeUp();
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  // Achievements and confetti hooks
  const { addAchievement, achievements: earnedAchievements } = useAchievements('fact-checker')
  const { triggerConfetti } = useConfetti()

  // Simulate asset loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Current claim
  const currentClaim = factClaims[state.currentClaimIndex];

  // Set difficulty
  const setDifficulty = (difficulty: 'beginner' | 'intermediate' | 'expert') => {
    let timeLimit = 60;
    if (difficulty === 'intermediate') timeLimit = 45;
    if (difficulty === 'expert') timeLimit = 30;
    
    updateState({ 
      difficulty,
      timeLimit
    });
  };

  // Start game
  const startGame = () => {
    // Get a random claim that hasn't been played yet
    const availableClaims = factClaims.filter(claim => !state.claimsPlayed.includes(claim.id));
    const randomIndex = Math.floor(Math.random() * availableClaims.length);
    const newClaimIndex = factClaims.findIndex(claim => claim.id === availableClaims[randomIndex].id);

    updateState({
      started: true,
      over: false,
      score: 0,
      lives: 3,
      level: 1,
      currentClaimIndex: newClaimIndex,
      claimsPlayed: [availableClaims[randomIndex].id],
      showFeedback: false,
      lastAnswerCorrect: false,
      showInstructions: false,
      showGameOver: false,
      userVerdict: null,
      activeTab: 'claim',
      sourceChecked: [],
      streakCount: 0,
      totalCorrect: 0,
      totalClaims: 0
    });

    resetTimer();
    startTimer();
  };

  // Handle verdict selection
  const handleVerdict = (verdict: boolean) => {
    pauseTimer();

    const isCorrect = currentClaim.isTrue === verdict;
    const timeTaken = state.timeLimit - timeLeft;

    // Calculate score
    let scoreIncrease = 0;
    if (isCorrect) {
      scoreIncrease = 10; // Base score for correct classification

      // Time bonus (more time left = more points)
      scoreIncrease += Math.floor(timeLeft / 5);

      // Difficulty bonus
      if (currentClaim.difficulty === 'medium') scoreIncrease += 5;
      if (currentClaim.difficulty === 'hard') scoreIncrease += 10;
      
      // Source checking bonus
      const sourceCheckBonus = Math.min(20, state.sourceChecked.length * 5);
      scoreIncrease += sourceCheckBonus;
    }

    // Update streak count
    const newStreakCount = isCorrect ? state.streakCount + 1 : 0;
    
    // Update state
    updateState({
      score: state.score + scoreIncrease,
      lives: isCorrect ? state.lives : state.lives - 1,
      showFeedback: true,
      lastAnswerCorrect: isCorrect,
      userVerdict: verdict,
      streakCount: newStreakCount,
      totalCorrect: isCorrect ? state.totalCorrect + 1 : state.totalCorrect,
      totalClaims: state.totalClaims + 1
    });

    // Check for achievements
    if (state.totalClaims === 0) {
      addAchievement('first-check');
    }
    
    if (timeTaken < 20 && isCorrect) {
      if (!earnedAchievements.includes('speed-checker')) {
        addAchievement('speed-checker');
      }
    }
    
    if (state.score + scoreIncrease >= 500 && !earnedAchievements.includes('fact-expert')) {
      addAchievement('fact-expert');
      triggerConfetti();
    }
    
    if (newStreakCount >= 5 && !earnedAchievements.includes('perfect-streak')) {
      addAchievement('perfect-streak');
      triggerConfetti();
    }
    
    if (state.sourceChecked.length === currentClaim.evidence.length && !earnedAchievements.includes('source-master')) {
      addAchievement('source-master');
    }

    // Check if game over
    if (!isCorrect && state.lives <= 1) {
      updateState({
        over: true,
        showGameOver: true
      });
    }
  };

  // Handle time up
  const handleTimeUp = () => {
    updateState({
      lives: state.lives - 1,
      showFeedback: true,
      lastAnswerCorrect: false,
      userVerdict: null,
      streakCount: 0,
      totalClaims: state.totalClaims + 1
    });

    // Check if game over
    if (state.lives <= 1) {
      updateState({
        over: true,
        showGameOver: true
      });
    }
  };

  // Track source checking
  const trackSourceCheck = (source: string) => {
    if (!state.sourceChecked.includes(source)) {
      updateState({
        sourceChecked: [...state.sourceChecked, source]
      });
    }
  };

  // Next claim
  const nextClaim = () => {
    // Get a random claim that hasn't been played yet
    const availableClaims = factClaims.filter(claim => !state.claimsPlayed.includes(claim.id));

    // If all claims have been played, reset the played list
    if (availableClaims.length === 0) {
      updateState({
        claimsPlayed: [],
        level: state.level + 1
      });
      return nextClaim();
    }

    const randomIndex = Math.floor(Math.random() * availableClaims.length);
    const newClaimIndex = factClaims.findIndex(claim => claim.id === availableClaims[randomIndex].id);

    updateState({
      currentClaimIndex: newClaimIndex,
      claimsPlayed: [...state.claimsPlayed, availableClaims[randomIndex].id],
      showFeedback: false,
      userVerdict: null,
      activeTab: 'claim',
      sourceChecked: []
    });

    resetTimer();
    startTimer();
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    updateState({ activeTab: value });
    
    // Track source checking when evidence tab is selected
    if (value === 'evidence') {
      trackSourceCheck('tab_view');
    }
  };

  if (loading) {
    return <LoadingScreen progress={75} message="Loading Fact Checker Challenge..." />;
  }

  return (
    <div className="space-y-4">
      {/* Game header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-500" />
            Fact Checker Challenge
          </h1>
          <p className="text-muted-foreground mt-2">
            Test your fact-checking skills! Can you tell what's true and what's false?
          </p>
        </div>

        {state.started && !state.over && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold">{state.score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: state.lives }).map((_, i) => (
                <Brain key={i} className="h-5 w-5 text-blue-500 fill-blue-500" />
              ))}
              {Array.from({ length: 3 - state.lives }).map((_, i) => (
                <Brain key={i + state.lives} className="h-5 w-5 text-gray-300" />
              ))}
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Level {state.level}
            </Badge>
          </div>
        )}
      </div>

      {/* Game content */}
      {!state.started ? (
        <Card className="overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500/10 p-2">
                <Brain className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle>Fact Checker Challenge</CardTitle>
            </div>
            <CardDescription>
              Test your fact-checking skills in this exciting game! Can you tell what's true and what's false?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-muted/30 aspect-video">
                <GameCanvas controls={false} background="#f8fafc">
                  <FactCheckerScene
                    demoMode={true}
                    currentClaim={factClaims[0]}
                    userVerdict={null}
                    onVerdictSelect={() => {}}
                  />
                </GameCanvas>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">How to Play:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Read the claim carefully</li>
                    <li>Examine the evidence from different sources</li>
                    <li>Consider the reliability of each source</li>
                    <li>Decide if the claim is true or false</li>
                    <li>Learn from feedback to improve your fact-checking skills</li>
                  </ol>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-300">
                    <AlertCircle className="h-4 w-4" />
                    Fact-Checking Tips:
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <span>Consider the source's reliability and expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <span>Scientific and educational sources are generally more reliable than blogs or social media</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <span>Look for consensus among multiple reliable sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <span>Be aware of your own biases and preconceptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <span>Check if the claim is too good (or bad) to be true</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Choose difficulty:</h3>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setDifficulty('beginner')} 
                      variant={state.difficulty === 'beginner' ? 'default' : 'outline'}
                    >
                      Beginner
                    </Button>
                    <Button 
                      onClick={() => setDifficulty('intermediate')} 
                      variant={state.difficulty === 'intermediate' ? 'default' : 'outline'}
                    >
                      Intermediate
                    </Button>
                    <Button 
                      onClick={() => setDifficulty('expert')} 
                      variant={state.difficulty === 'expert' ? 'default' : 'outline'}
                    >
                      Expert
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {state.difficulty === 'beginner' && 'Beginner: More time (60 seconds) and more obvious claims.'}
                    {state.difficulty === 'intermediate' && 'Intermediate: Less time (45 seconds) and more challenging claims.'}
                    {state.difficulty === 'expert' && 'Expert: Very limited time (30 seconds) and subtle, difficult claims.'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startGame} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Start Game
            </Button>
          </CardFooter>
        </Card>
      ) : !state.showFeedback ? (
        <div className="space-y-4">
          {/* Progress Bar */}
          <Progress value={(timeLeft / state.timeLimit) * 100} className="h-2" />
          
          {/* Claim Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Evaluate This Claim</CardTitle>
                <Badge variant="outline">{currentClaim.category}</Badge>
              </div>
              <CardDescription>
                Read carefully and check the evidence before making your decision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={state.activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="claim">Claim</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                </TabsList>
                
                <TabsContent value="claim" className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">The Claim:</h3>
                    <p className="text-lg font-medium">{currentClaim.claim}</p>
                  </div>
                  
                  {state.difficulty === 'beginner' && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Fact-Checking Tip</AlertTitle>
                      <AlertDescription>
                        Check the evidence tab to see what different sources say about this claim. Pay attention to the reliability of each source.
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>
                
                <TabsContent value="evidence" className="space-y-4">
                  <div className="space-y-3">
                    {currentClaim.evidence.map((evidence, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{evidence.source}</CardTitle>
                              <CardDescription className="text-xs">
                                <a href="#" className="text-blue-500 hover:underline" onClick={(e) => {
                                  e.preventDefault();
                                  trackSourceCheck(evidence.source);
                                }}>
                                  {evidence.url}
                                </a>
                              </CardDescription>
                            </div>
                            <SourceTypeBadge type={evidence.type} />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-sm italic border-l-2 pl-3 py-1 border-muted-foreground/20">
                            "{evidence.quote}"
                          </div>
                          <div className="mt-2">
                            <ReliabilityRating rating={evidence.reliability} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {state.difficulty !== 'expert' && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Source Evaluation Tip</AlertTitle>
                      <AlertDescription>
                        {state.difficulty === 'beginner' 
                          ? 'Scientific and educational sources are generally more reliable than blogs or social media. Look for consensus among multiple reliable sources.'
                          : 'Consider if the source has expertise in this specific topic area. Even reliable sources can be wrong outside their area of expertise.'}
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button 
                onClick={() => handleVerdict(true)} 
                variant="outline" 
                className="w-1/2 mr-2 border-green-200 hover:bg-green-100 hover:text-green-600 dark:border-green-800 dark:hover:bg-green-900/30"
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                True
              </Button>
              <Button 
                onClick={() => handleVerdict(false)} 
                variant="outline" 
                className="w-1/2 ml-2 border-red-200 hover:bg-red-100 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-900/30"
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                False
              </Button>
            </CardFooter>
          </Card>
          
          {/* Streak Counter */}
          {state.streakCount > 0 && (
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <Sparkles className="h-4 w-4 mr-1" />
                Truth Streak: {state.streakCount}
              </Badge>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Feedback Card */}
          <Card>
            <CardHeader className={`${
              state.lastAnswerCorrect 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className="flex items-center gap-3">
                {state.lastAnswerCorrect ? (
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                ) : (
                  <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
                  </div>
                )}
                <div>
                  <CardTitle>
                    {state.lastAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                  </CardTitle>
                  <CardDescription>
                    {state.lastAnswerCorrect ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Good fact-checking! This claim is {currentClaim.isTrue ? 'true' : 'false'}.
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        This claim is actually {currentClaim.isTrue ? 'true' : 'false'}.
                      </span>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">The Claim:</h3>
                <p className="text-lg">{currentClaim.claim}</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Explanation:</h3>
                <p>{currentClaim.explanation}</p>
              </div>
              
              {currentClaim.relatedTruth && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">The Truth:</h3>
                  <p>{currentClaim.relatedTruth}</p>
                </div>
              )}
              
              {currentClaim.tipForChecking && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Fact-Checking Tip:
                  </h3>
                  <p>{currentClaim.tipForChecking}</p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Source Analysis:</h3>
                <div className="space-y-2">
                  {currentClaim.evidence.map((evidence, index) => (
                    <div 
                      key={index} 
                      className={`p-3 border rounded-lg ${
                        (evidence.reliability >= 90 && !currentClaim.isTrue && evidence.quote.toLowerCase().includes('not') || evidence.quote.toLowerCase().includes('isn\'t')) || 
                        (evidence.reliability >= 90 && currentClaim.isTrue && !evidence.quote.toLowerCase().includes('not') && !evidence.quote.toLowerCase().includes('isn\'t'))
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                          : (evidence.reliability < 70 && evidence.quote.toLowerCase().includes(currentClaim.isTrue ? 'not' : 'is'))
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <SourceTypeBadge type={evidence.type} />
                          <span className="font-medium">{evidence.source}</span>
                        </div>
                        <ReliabilityRating rating={evidence.reliability} />
                      </div>
                      <div className="mt-2 text-sm italic">
                        "{evidence.quote}"
                      </div>
                      <div className="mt-2 text-xs">
                        {evidence.reliability >= 90 
                          ? 'Highly reliable source with expertise in this area.'
                          : evidence.reliability >= 70
                            ? 'Moderately reliable source, but may have some bias.'
                            : 'Less reliable source, may contain misinformation or bias.'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={nextClaim} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Next Claim
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Game Over Dialog */}
      <Dialog open={state.showGameOver} onOpenChange={(open) => !open && updateState({ showGameOver: false })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Game Over!</DialogTitle>
            <DialogDescription>
              You've completed the Fact Checker Challenge!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-blue-500/10 p-4">
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold">Your Score: {state.score}</h3>
              <p className="text-muted-foreground">
                {state.score >= 500 ? "Amazing! You're a Fact-Checking Expert!" :
                 state.score >= 300 ? "Great job! You've got strong fact-checking skills!" :
                 "Good effort! Keep practicing to improve your fact-checking abilities."}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {state.totalCorrect}
                </div>
                <div className="text-sm text-muted-foreground">
                  Correct Verdicts
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {Math.round((state.totalCorrect / state.totalClaims) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Accuracy Rate
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">What you've learned:</h4>
              <ul className="text-sm space-y-1">
                <li>• How to evaluate the reliability of different sources</li>
                <li>• The importance of checking multiple sources before making a judgment</li>
                <li>• How to identify common misconceptions and misinformation</li>
                <li>• Why scientific and educational sources are generally more reliable</li>
                <li>• How to recognize your own biases when evaluating information</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">Achievements Earned:</h4>
              <div className="grid grid-cols-2 gap-2">
                {achievements.filter(a => earnedAchievements.includes(a.id)).map(achievement => (
                  <div key={achievement.id} className="flex items-center gap-2 text-sm">
                    <div className="text-amber-500">{achievement.icon}</div>
                    <span>{achievement.title}</span>
                  </div>
                ))}
                {earnedAchievements.length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-2">No achievements earned yet. Keep playing to unlock achievements!</p>
                )}
              </div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">Fact-Checking in Real Life:</h4>
              <p className="text-sm">
                The skills you've practiced in this game are valuable in everyday life. Before sharing information online or making decisions based on claims you hear, take a moment to verify the facts from reliable sources. This helps combat misinformation and makes the internet a more trustworthy place.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Instructions Dialog */}
      <Dialog open={state.showInstructions} onOpenChange={(open) => updateState({ showInstructions: open })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>How to Play</DialogTitle>
            <DialogDescription>
              Learn how to be a fact-checking expert!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Game Rules:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>You'll be presented with a claim to evaluate</li>
                <li>Check the evidence tab to see what different sources say</li>
                <li>Decide if the claim is true or false before time runs out</li>
                <li>You have 3 lives - each incorrect verdict or timeout costs 1 life</li>
                <li>Earn points for correct verdicts, with bonuses for speed and difficulty</li>
              </ol>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <h3 className="font-medium mb-2">Scoring:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Base points: 10 points for each correct verdict</li>
                <li>• Time bonus: Up to 12 points for quick decisions</li>
                <li>• Difficulty bonus: +5 for medium claims, +10 for hard claims</li>
                <li>• Source checking bonus: Up to 20 points for examining sources</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <h3 className="font-medium mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                Fact-Checking Tips:
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <span>Consider the source's reliability and expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <span>Scientific and educational sources are generally more reliable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <span>Look for consensus among multiple reliable sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <span>Be aware of your own biases and preconceptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <span>Check if the claim is too good (or bad) to be true</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => updateState({ showInstructions: false })}
              className="w-full"
            >
              Got It!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
