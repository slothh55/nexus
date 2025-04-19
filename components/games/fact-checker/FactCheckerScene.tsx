'use client'

import React, { useState } from 'react'
import { Text3D } from '../shared/Text3D'
import { FactClaim } from './FactCheckerGame'
import { Brain, ThumbsUp, ThumbsDown, CheckCircle, XCircle, Search, Book, Sparkles } from 'lucide-react'

interface FactCheckerSceneProps {
  currentClaim: FactClaim
  userVerdict: boolean | null
  onVerdictSelect: (verdict: boolean) => void
  demoMode?: boolean
}

export function FactCheckerScene({ 
  currentClaim, 
  userVerdict, 
  onVerdictSelect,
  demoMode = false 
}: FactCheckerSceneProps) {
  const [hoveredVerdict, setHoveredVerdict] = useState<'true' | 'false' | null>(null)
  const [selectedEvidence, setSelectedEvidence] = useState<number | null>(null)
  const [hoveredEvidence, setHoveredEvidence] = useState<number | null>(null)
  
  // Get reliability color
  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return '#10b981' // emerald/green
    if (reliability >= 70) return '#f59e0b' // amber/yellow
    return '#ef4444' // red
  }
  
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-indigo-900 to-purple-900 p-4 overflow-hidden">
      {/* Title */}
      <Text3D position={[0, -4, 0]} fontSize={0.4} color="#3b82f6">
        Fact Checker Challenge
      </Text3D>
      
      {/* Library background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Bookshelves */}
        <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-amber-900/80 to-amber-800/60"></div>
        <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-amber-900/80 to-amber-800/60"></div>
        
        {/* Books (decorative) */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`book-left-${i}`} 
            className="absolute left-[2%] w-[10%] h-[3%]" 
            style={{ 
              top: `${10 + (i * 4)}%`,
              backgroundColor: ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6'][i % 5],
              transform: `rotate(${Math.sin(i) * 5}deg)`
            }}
          ></div>
        ))}
        
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`book-right-${i}`} 
            className="absolute right-[2%] w-[10%] h-[3%]" 
            style={{ 
              top: `${10 + (i * 4)}%`,
              backgroundColor: ['#7e22ce', '#9333ea', '#a855f7', '#c084fc', '#d8b4fe'][i % 5],
              transform: `rotate(${Math.sin(i) * 5}deg)`
            }}
          ></div>
        ))}
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={`particle-${i}`} 
            className="absolute rounded-full opacity-60 animate-pulse"
            style={{ 
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: ['#3b82f6', '#8b5cf6', '#d946ef'][i % 3],
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Claim container */}
      <div className="absolute top-[15%] left-[20%] w-[60%] h-[40%] bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden shadow-lg">
        {/* Claim header */}
        <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-white" />
            <h3 className="text-white font-medium">Claim to Verify</h3>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              {currentClaim.category}
            </Badge>
            <Badge variant="outline" className={
              currentClaim.difficulty === 'easy' ? 'bg-green-500/20 text-white border-green-500/30' :
              currentClaim.difficulty === 'medium' ? 'bg-yellow-500/20 text-white border-yellow-500/30' :
              'bg-red-500/20 text-white border-red-500/30'
            }>
              {currentClaim.difficulty.charAt(0).toUpperCase() + currentClaim.difficulty.slice(1)}
            </Badge>
          </div>
        </div>
        
        {/* Claim content */}
        <div className="p-6 flex items-center justify-center h-[calc(100%-4rem)]">
          <p className="text-white text-xl text-center font-medium">
            {currentClaim.claim}
          </p>
        </div>
        
        {/* Magical glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-xl"></div>
        </div>
      </div>
      
      {/* Evidence books (interactive) */}
      <div className="absolute bottom-[15%] left-[20%] w-[60%] h-[20%] flex items-end justify-center gap-4">
        {currentClaim.evidence.map((evidence, index) => (
          <div 
            key={index}
            className={`h-full flex flex-col items-center cursor-pointer transition-all ${hoveredEvidence === index ? 'scale-105' : ''} ${selectedEvidence === index ? 'ring-2 ring-white' : ''}`}
            style={{ width: `${100 / currentClaim.evidence.length}%`, maxWidth: '120px' }}
            onClick={() => setSelectedEvidence(selectedEvidence === index ? null : index)}
            onMouseEnter={() => setHoveredEvidence(index)}
            onMouseLeave={() => setHoveredEvidence(null)}
          >
            <div 
              className="w-full h-[80%] rounded-t-md flex items-center justify-center relative overflow-hidden"
              style={{ 
                backgroundColor: getReliabilityColor(evidence.reliability),
                opacity: selectedEvidence === index ? 1 : 0.8
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Book className="text-white/30 h-12 w-12" />
              </div>
              <div className="relative z-10 text-white text-xs font-medium text-center p-2">
                {evidence.source}
              </div>
            </div>
            <div className="w-full h-[20%] bg-gray-800/80 flex items-center justify-center">
              <div className="text-white text-xs">{evidence.reliability}%</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Evidence details popup */}
      {selectedEvidence !== null && (
        <div className="absolute top-[15%] left-[20%] w-[60%] bg-gray-900/90 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden shadow-lg z-20">
          <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-white" />
              <h3 className="text-white font-medium">Source Details</h3>
            </div>
            <button 
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setSelectedEvidence(null)}
            >
              ✕
            </button>
          </div>
          <div className="p-4 text-white">
            <div className="mb-3">
              <div className="text-sm text-white/70 mb-1">Source:</div>
              <div className="font-medium text-lg">{currentClaim.evidence[selectedEvidence].source}</div>
            </div>
            <div className="mb-3">
              <div className="text-sm text-white/70 mb-1">Reliability:</div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-full h-2 rounded-full" 
                  style={{ backgroundColor: getReliabilityColor(currentClaim.evidence[selectedEvidence].reliability) }}
                ></div>
                <div className="font-medium">{currentClaim.evidence[selectedEvidence].reliability}%</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-sm text-white/70 mb-1">Quote:</div>
              <div className="italic bg-white/10 p-3 rounded-md">"{currentClaim.evidence[selectedEvidence].quote}"</div>
            </div>
            <div>
              <div className="text-sm text-white/70 mb-1">Type:</div>
              <Badge 
                className={`${currentClaim.evidence[selectedEvidence].type === 'scientific' || currentClaim.evidence[selectedEvidence].type === 'educational' ? 'bg-green-500/20 border-green-500/30' : 'bg-yellow-500/20 border-yellow-500/30'}`}
              >
                {currentClaim.evidence[selectedEvidence].type.charAt(0).toUpperCase() + currentClaim.evidence[selectedEvidence].type.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      )}
      
      {/* Verdict buttons */}
      {(userVerdict === null || demoMode) && (
        <div className="absolute bottom-[5%] left-[20%] w-[60%] flex items-center justify-center gap-8">
          <button
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all ${
              hoveredVerdict === 'true' || (demoMode && Math.random() > 0.5)
                ? 'bg-green-500 text-white scale-110'
                : 'bg-white/10 text-white hover:bg-green-500/80 hover:text-white hover:scale-105'
            }`}
            onClick={() => !demoMode && onVerdictSelect(true)}
            onMouseEnter={() => setHoveredVerdict('true')}
            onMouseLeave={() => setHoveredVerdict(null)}
          >
            <ThumbsUp className="h-8 w-8 mb-1" />
            <span className="text-sm font-medium">TRUE</span>
          </button>
          
          <button
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all ${
              hoveredVerdict === 'false' || (demoMode && Math.random() > 0.5)
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/10 text-white hover:bg-red-500/80 hover:text-white hover:scale-105'
            }`}
            onClick={() => !demoMode && onVerdictSelect(false)}
            onMouseEnter={() => setHoveredVerdict('false')}
            onMouseLeave={() => setHoveredVerdict(null)}
          >
            <ThumbsDown className="h-8 w-8 mb-1" />
            <span className="text-sm font-medium">FALSE</span>
          </button>
        </div>
      )}
      
      {/* Verdict result */}
      {userVerdict !== null && !demoMode && (
        <div className="absolute bottom-[5%] left-[20%] w-[60%] flex items-center justify-center">
          <div className={`p-4 rounded-lg ${
            currentClaim.isTrue === userVerdict
              ? 'bg-green-500/20 border border-green-500/40'
              : 'bg-red-500/20 border border-red-500/40'
          }`}>
            <div className="flex items-center gap-3">
              {currentClaim.isTrue === userVerdict ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500" />
              )}
              <div>
                <div className={`font-medium ${
                  currentClaim.isTrue === userVerdict ? 'text-green-400' : 'text-red-400'
                }`}>
                  {currentClaim.isTrue === userVerdict ? 'Correct!' : 'Incorrect!'}
                </div>
                <div className="text-white text-sm">
                  This claim is <strong>{currentClaim.isTrue ? 'TRUE' : 'FALSE'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      {demoMode && (
        <div className="absolute top-[5%] left-[20%] w-[60%] text-center text-white/80 text-sm">
          Examine the claim and evidence, then decide if it's true or false
        </div>
      )}
      
      {/* Hint for evidence books */}
      <div className="absolute bottom-[36%] left-[20%] w-[60%] text-center text-white/60 text-xs animate-pulse">
        Click on books to view source details
      </div>
    </div>
  )
}

// Simple Badge component to avoid dependency on the UI library
function Badge({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}
