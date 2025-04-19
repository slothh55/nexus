'use client'

import React, { useState } from 'react'
import { Text3D } from '../shared/Text3D'
import { AIWorldBuilderScenario, WorldElement, getCategoryColor, getElementCategoryColor } from '@/data/ai-world-builder-scenarios'
import { Sparkles, Info, Check, AlertTriangle } from 'lucide-react'

interface AIWorldBuilderSceneProps {
  scenario: AIWorldBuilderScenario
  selectedElements: string[]
  addressedIssues: string[]
  onElementSelect: (elementId: string) => void
  onIssueAddress: (elementId: string, issueId: string) => void
  demoMode?: boolean
}

export function AIWorldBuilderScene({ 
  scenario, 
  selectedElements, 
  addressedIssues,
  onElementSelect,
  onIssueAddress,
  demoMode = false 
}: AIWorldBuilderSceneProps) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [hoveredIssue, setHoveredIssue] = useState<{elementId: string, issueId: string} | null>(null)
  
  // Get background style based on theme
  const getBackgroundStyle = (theme: string) => {
    switch (theme) {
      case 'fantasy':
        return 'from-indigo-900 to-purple-900';
      case 'sci-fi':
        return 'from-blue-900 to-cyan-900';
      case 'historical':
        return 'from-amber-900 to-red-900';
      case 'modern':
        return 'from-gray-900 to-slate-900';
      default:
        return 'from-gray-900 to-indigo-900';
    }
  }
  
  return (
    <div className={`w-full h-full relative bg-gradient-to-br ${getBackgroundStyle(scenario.theme)} p-4 overflow-auto`}>
      {/* Title */}
      <Text3D position={[0, -4, 0]} fontSize={0.4} color="#ffffff">
        AI World Builder
      </Text3D>
      
      {/* World canvas */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden shadow-lg">
        <div className="relative w-full h-full">
          {/* World elements */}
          {scenario.worldElements.map((element) => (
            <div
              key={element.id}
              className={`absolute cursor-pointer transition-all duration-200 rounded-md border ${
                selectedElements.includes(element.id)
                  ? 'bg-white/20 border-white'
                  : hoveredElement === element.id
                    ? 'bg-white/10 border-white/50'
                    : demoMode
                      ? 'bg-white/5 border-white/30'
                      : 'bg-transparent border-transparent'
              }`}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.width}%`,
                height: `${element.height}%`,
              }}
              onClick={() => onElementSelect(element.id)}
              onMouseEnter={() => setHoveredElement(element.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {/* Element label */}
              {(selectedElements.includes(element.id) || hoveredElement === element.id || demoMode) && (
                <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs p-1 rounded whitespace-nowrap">
                  <span 
                    className="inline-block w-2 h-2 rounded-full mr-1" 
                    style={{ backgroundColor: getElementCategoryColor(element.category) }}
                  ></span>
                  {element.name} ({element.category})
                </div>
              )}
              
              {/* Element content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-xs font-medium text-center p-2">
                  {element.name}
                </div>
              </div>
              
              {/* Ethical considerations (only shown when element is selected) */}
              {selectedElements.includes(element.id) && (
                <div className="absolute -right-64 top-0 w-60 bg-black/80 text-white text-xs p-2 rounded">
                  <h4 className="font-medium mb-1">Ethical Considerations:</h4>
                  <ul className="space-y-2">
                    {element.ethicalConsiderations.map((issue) => (
                      <li 
                        key={issue.id}
                        className={`p-1 rounded relative ${
                          addressedIssues.includes(`${element.id}-${issue.id}`)
                            ? 'bg-green-900/30 border border-green-500/50'
                            : hoveredIssue?.elementId === element.id && hoveredIssue?.issueId === issue.id
                              ? 'bg-yellow-900/30 border border-yellow-500/50'
                              : 'bg-gray-900/30 border border-gray-500/50'
                        }`}
                        onMouseEnter={() => setHoveredIssue({elementId: element.id, issueId: issue.id})}
                        onMouseLeave={() => setHoveredIssue(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onIssueAddress(element.id, issue.id);
                        }}
                      >
                        <div className="flex items-start gap-1">
                          <span 
                            className="inline-block w-2 h-2 rounded-full mt-1" 
                            style={{ backgroundColor: getCategoryColor(issue.category) }}
                          ></span>
                          <div>
                            <span className="font-medium">{issue.issue}</span>
                            <p className="text-white/70 text-[10px] mt-0.5">{issue.description}</p>
                          </div>
                          {addressedIssues.includes(`${element.id}-${issue.id}`) && (
                            <Check className="h-3 w-3 text-green-500 ml-auto flex-shrink-0" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      {demoMode && (
        <div className="absolute top-[5%] left-[20%] w-[60%] text-center text-white/80 text-sm">
          Click on world elements to select them and address ethical considerations
        </div>
      )}
      
      {/* Element counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-purple-400" />
        <span>Elements: {selectedElements.length} / {scenario.worldElements.length}</span>
      </div>
      
      {/* Issues counter */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <span>Issues Addressed: {addressedIssues.length} / {scenario.worldElements.reduce((total, element) => total + element.ethicalConsiderations.length, 0)}</span>
      </div>
    </div>
  )
}
