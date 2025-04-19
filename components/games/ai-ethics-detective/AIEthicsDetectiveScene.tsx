'use client'

import React, { useState } from 'react'
import { Text3D } from '../shared/Text3D'
import { AIEthicsScenario } from '@/data/ai-ethics-scenarios'

interface AIEthicsDetectiveSceneProps {
  scenario: AIEthicsScenario
  foundIssues: string[]
  onIssueClick: (issueId: string) => void
  demoMode?: boolean
}

export function AIEthicsDetectiveScene({ 
  scenario, 
  foundIssues, 
  onIssueClick,
  demoMode = false 
}: AIEthicsDetectiveSceneProps) {
  const [hoveredIssue, setHoveredIssue] = useState<string | null>(null)
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bias':
        return '#ef4444'; // red
      case 'privacy':
        return '#8b5cf6'; // purple
      case 'copyright':
        return '#f59e0b'; // amber
      case 'misinformation':
        return '#3b82f6'; // blue
      case 'transparency':
        return '#10b981'; // emerald
      default:
        return '#6b7280'; // gray
    }
  }
  
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-900 to-indigo-900 p-4 overflow-auto">
      {/* Title */}
      <Text3D position={[0, -4, 0]} fontSize={0.4} color="#ffffff">
        AI Ethics Detective
      </Text3D>
      
      {/* Content container */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-white dark:bg-gray-800 rounded-lg p-4 overflow-auto">
        <h3 className="text-xl font-bold mb-2 text-center">{scenario.title}</h3>
        
        {/* Content display */}
        <div className="relative mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[300px]">
          {/* Display content based on type */}
          <div className="whitespace-pre-wrap font-mono text-sm">
            {scenario.content}
          </div>
          
          {/* Clickable issue areas */}
          {scenario.issues.map((issue) => (
            <div
              key={issue.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                foundIssues.includes(issue.id) 
                  ? 'bg-green-500/30 border-2 border-green-500' 
                  : hoveredIssue === issue.id 
                    ? 'bg-yellow-500/20 border border-yellow-500' 
                    : demoMode 
                      ? 'bg-red-500/10 border border-red-500/50' 
                      : 'bg-transparent border border-transparent'
              }`}
              style={{
                left: `${issue.x}%`,
                top: `${issue.y}%`,
                width: `${issue.width}%`,
                height: `${issue.height}%`,
              }}
              onClick={() => onIssueClick(issue.id)}
              onMouseEnter={() => setHoveredIssue(issue.id)}
              onMouseLeave={() => setHoveredIssue(null)}
            >
              {(foundIssues.includes(issue.id) || demoMode) && (
                <div className="absolute -top-6 left-0 bg-black/80 text-white text-xs p-1 rounded whitespace-nowrap">
                  <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: getCategoryColor(issue.category) }}></span>
                  {issue.category}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Instructions */}
        {demoMode && (
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Click on problematic areas to identify ethical issues in AI-generated content
          </div>
        )}
      </div>
      
      {/* Issue counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        Issues found: {foundIssues.length} / {scenario.issues.length}
      </div>
    </div>
  )
}
