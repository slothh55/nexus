'use client'

import React, { useState } from 'react'
import { Text3D } from '../shared/Text3D'
import { PromptChallenge } from '@/data/prompt-engineering-challenges'

interface PromptEngineerSceneProps {
  challenge: PromptChallenge
  selectedComponents: string[]
  onComponentSelect: (componentId: string) => void
  onReorderComponents: (startIndex: number, endIndex: number) => void
  demoMode?: boolean
}

export function PromptEngineerScene({
  challenge,
  selectedComponents,
  onComponentSelect,
  onReorderComponents,
  demoMode = false
}: PromptEngineerSceneProps) {
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'instruction':
        return '#3b82f6'; // blue
      case 'context':
        return '#8b5cf6'; // purple
      case 'example':
        return '#10b981'; // emerald
      case 'constraint':
        return '#ef4444'; // red
      case 'output':
        return '#f59e0b'; // amber
      default:
        return '#6b7280'; // gray
    }
  }

  // Handle reordering
  const handleMoveUp = (index: number) => {
    if (index > 0) {
      onReorderComponents(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < selectedComponents.length - 1) {
      onReorderComponents(index, index + 1);
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-900 to-indigo-900 p-4 overflow-auto">
      {/* Title */}
      <Text3D position={[0, -4, 0]} fontSize={0.4} color="#ffffff">
        Prompt Engineering Master
      </Text3D>

      {/* Content container */}
      <div className="absolute top-[10%] left-[5%] w-[90%] h-[80%] bg-white dark:bg-gray-800 rounded-lg p-4 overflow-auto">
        <h3 className="text-xl font-bold mb-2 text-center">{challenge.title}</h3>

        {/* Scenario */}
        <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <h4 className="font-medium mb-1">Scenario:</h4>
          <p className="text-sm">{challenge.scenario}</p>
        </div>

        {/* Goal */}
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="font-medium mb-1">Your Goal:</h4>
          <p className="text-sm">{challenge.goal}</p>
        </div>

        {/* Prompt Builder */}
        <div className="mb-4">
          <h4 className="font-medium mb-2">Your Prompt:</h4>

          {selectedComponents.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
              Select prompt components below to build your prompt
            </div>
          ) : (
            <div className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 min-h-[100px]">
              {selectedComponents.map((componentId, index) => {
                const component = challenge.promptComponents.find(c => c.id === componentId);
                if (!component) return null;

                return (
                  <div
                    key={component.id}
                    className="mb-2 p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                  >
                    <div className="flex items-center gap-1">
                      <button
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === selectedComponents.length - 1}
                      >
                        ↓
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded"
                        onClick={() => onComponentSelect(component.id)}
                      >
                        ×
                      </button>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getCategoryColor(component.category) }}
                    ></div>
                    <p className="text-sm">{component.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Available Components */}
        <div>
          <h4 className="font-medium mb-2">Available Components:</h4>
          <div className="grid grid-cols-1 gap-2">
            {challenge.promptComponents.map((component) => {
              // Skip if already selected
              if (selectedComponents.includes(component.id) && !demoMode) return null;

              return (
                <div
                  key={component.id}
                  className={`p-2 rounded-md border flex items-center gap-2 cursor-pointer transition-colors ${
                    selectedComponents.includes(component.id)
                      ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => !selectedComponents.includes(component.id) && onComponentSelect(component.id)}
                >
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCategoryColor(component.category) }}
                    ></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{component.category}</span>
                  </div>
                  <p className="text-sm">{component.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        {demoMode && (
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Select prompt components to build an effective and ethical prompt
          </div>
        )}
      </div>

      {/* Component counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        Components: {selectedComponents.length} / {challenge.optimalPrompt.length}
      </div>
    </div>
  )
}
