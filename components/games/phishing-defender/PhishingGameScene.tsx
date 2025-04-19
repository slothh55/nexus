'use client'

import React, { useState } from 'react'
import { Text3D } from '../shared/Text3D'
import { PhishingEmail } from './PhishingGame'
import { Mail, AlertTriangle, Link2, Paperclip, Clock, AlertCircle } from 'lucide-react'

interface PhishingGameSceneProps {
  currentEmail: PhishingEmail
  selectedElements: string[]
  onElementSelect: (elementId: string) => void
  demoMode?: boolean
}

export function PhishingGameScene({ 
  currentEmail, 
  selectedElements, 
  onElementSelect,
  demoMode = false 
}: PhishingGameSceneProps) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  
  // Get element type icon
  const getElementIcon = (type: string) => {
    switch (type) {
      case 'sender':
        return <Mail className="h-4 w-4" />;
      case 'subject':
        return <AlertCircle className="h-4 w-4" />;
      case 'link':
        return <Link2 className="h-4 w-4" />;
      case 'attachment':
        return <Paperclip className="h-4 w-4" />;
      case 'urgency':
        return <Clock className="h-4 w-4" />;
      case 'grammar':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  }
  
  // Get element type color
  const getElementColor = (type: string) => {
    switch (type) {
      case 'sender':
        return '#ef4444'; // red
      case 'subject':
        return '#f59e0b'; // amber
      case 'link':
        return '#3b82f6'; // blue
      case 'attachment':
        return '#8b5cf6'; // purple
      case 'urgency':
        return '#f43f5e'; // rose
      case 'grammar':
        return '#10b981'; // emerald
      default:
        return '#6b7280'; // gray
    }
  }
  
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-blue-900 p-4 overflow-auto">
      {/* Title */}
      <Text3D position={[0, -4, 0]} fontSize={0.4} color="#ef4444">
        Phishing Defender
      </Text3D>
      
      {/* Email container */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Email header */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">From:</div>
              <div className="font-medium relative">
                {currentEmail.sender}
                
                {/* Sender element (if suspicious) */}
                {currentEmail.phishingElements.some(el => el.type === 'sender') && (
                  <div 
                    className={`absolute -top-1 -left-1 right-0 bottom-0 border-2 rounded cursor-pointer transition-all ${
                      selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'sender')?.id || '') || demoMode
                        ? 'border-red-500 bg-red-500/10'
                        : hoveredElement === 'sender'
                          ? 'border-red-300 bg-red-500/5'
                          : 'border-transparent'
                    }`}
                    onClick={() => onElementSelect(currentEmail.phishingElements.find(el => el.type === 'sender')?.id || '')}
                    onMouseEnter={() => setHoveredElement('sender')}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    {(selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'sender')?.id || '') || demoMode) && (
                      <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Suspicious Sender
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Subject:</div>
              <div className="font-medium relative">
                {currentEmail.subject}
                
                {/* Subject element (if suspicious) */}
                {currentEmail.phishingElements.some(el => el.type === 'subject') && (
                  <div 
                    className={`absolute -top-1 -left-1 right-0 bottom-0 border-2 rounded cursor-pointer transition-all ${
                      selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'subject')?.id || '') || demoMode
                        ? 'border-amber-500 bg-amber-500/10'
                        : hoveredElement === 'subject'
                          ? 'border-amber-300 bg-amber-500/5'
                          : 'border-transparent'
                    }`}
                    onClick={() => onElementSelect(currentEmail.phishingElements.find(el => el.type === 'subject')?.id || '')}
                    onMouseEnter={() => setHoveredElement('subject')}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    {(selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'subject')?.id || '') || demoMode) && (
                      <div className="absolute -top-6 right-0 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Suspicious Subject
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Email content */}
        <div className="p-4 h-[calc(100%-8rem)] overflow-auto">
          <div className="relative whitespace-pre-wrap">
            {/* Process content to make links and other elements interactive */}
            {currentEmail.content.split('[Secure-Link]').map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className="text-blue-500 underline relative cursor-pointer">
                    Click here
                    
                    {/* Link element (if suspicious) */}
                    {currentEmail.phishingElements.some(el => el.type === 'link') && (
                      <div 
                        className={`absolute -top-1 -left-1 right-0 bottom-0 border-2 rounded cursor-pointer transition-all ${
                          selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'link')?.id || '') || demoMode
                            ? 'border-blue-500 bg-blue-500/10'
                            : hoveredElement === 'link'
                              ? 'border-blue-300 bg-blue-500/5'
                              : 'border-transparent'
                        }`}
                        onClick={() => onElementSelect(currentEmail.phishingElements.find(el => el.type === 'link')?.id || '')}
                        onMouseEnter={() => setHoveredElement('link')}
                        onMouseLeave={() => setHoveredElement(null)}
                      >
                        {(selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'link')?.id || '') || demoMode) && (
                          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Link2 className="h-3 w-3" />
                            Suspicious Link
                          </div>
                        )}
                      </div>
                    )}
                  </span>
                )}
              </React.Fragment>
            ))}
            
            {/* Urgency element (if present) */}
            {currentEmail.phishingElements.some(el => el.type === 'urgency') && (
              <div 
                className={`absolute top-0 left-0 right-0 bottom-0 border-2 rounded cursor-pointer transition-all ${
                  selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'urgency')?.id || '') || demoMode
                    ? 'border-rose-500 bg-rose-500/10'
                    : hoveredElement === 'urgency'
                      ? 'border-rose-300 bg-rose-500/5'
                      : 'border-transparent'
                }`}
                onClick={() => onElementSelect(currentEmail.phishingElements.find(el => el.type === 'urgency')?.id || '')}
                onMouseEnter={() => setHoveredElement('urgency')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {(selectedElements.includes(currentEmail.phishingElements.find(el => el.type === 'urgency')?.id || '') || demoMode) && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    False Urgency
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Email footer */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600 absolute bottom-0 left-0 right-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {demoMode ? "Click on suspicious elements to identify them" : ""}
            </div>
            <div className="flex items-center gap-2">
              {currentEmail.phishingElements.map(element => (
                (selectedElements.includes(element.id) || demoMode) && (
                  <div 
                    key={element.id}
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: getElementColor(element.type) }}
                  >
                    {getElementIcon(element.type)}
                    <span>{element.type}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
