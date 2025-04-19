'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'vertical'
}

export function YouTubeEmbed({
  videoId,
  title = 'YouTube video player',
  className = '',
  aspectRatio = 'video'
}: YouTubeEmbedProps) {
  if (!videoId) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No video ID provided. Please provide a valid YouTube video ID.
        </AlertDescription>
      </Alert>
    )
  }

  const aspectRatioClass = 
    aspectRatio === 'square' ? 'aspect-square' : 
    aspectRatio === 'vertical' ? 'aspect-[9/16]' : 
    'aspect-video'

  return (
    <div className={`w-full ${aspectRatioClass} ${className}`}>
      <iframe
        className="w-full h-full rounded-md"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
