'use client'

import { useEffect } from 'react'
import { preloadSounds } from '@/lib/sound-system'

/**
 * Component to preload sounds when the app starts
 * This should be included in the root layout
 */
export function SoundPreloader() {
  useEffect(() => {
    // Preload sounds when the component mounts
    preloadSounds()
  }, [])

  // This component doesn't render anything
  return null
}
