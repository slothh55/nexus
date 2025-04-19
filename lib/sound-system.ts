/**
 * Sound System for Digital Inclusion Companion
 * Uses Howler.js for audio management
 */

import { Howl, Howler } from 'howler';

// Define sound types
export type SoundType = 'correct' | 'incorrect' | 'success' | 'click' | 'achievement';

// Sound cache to prevent reloading sounds
const soundCache: Record<string, Howl> = {};

// Sound configuration
const sounds: Record<SoundType, string> = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  success: '/sounds/success.mp3',
  click: '/sounds/click.mp3',
  achievement: '/sounds/achievement.mp3',
};

// Volume settings
const defaultVolume = 0.5;

/**
 * Play a sound effect
 * @param type The type of sound to play
 * @param volume Optional volume override (0-1)
 * @returns The Howl instance
 */
export function playSound(type: SoundType, volume?: number): Howl | null {
  try {
    // Check if sound exists in configuration
    if (!sounds[type]) {
      console.warn(`Sound type "${type}" not found`);
      return null;
    }

    // Get sound path
    const soundPath = sounds[type];

    // Check if sound is already loaded in cache
    if (!soundCache[soundPath]) {
      // Create new Howl instance
      soundCache[soundPath] = new Howl({
        src: [soundPath],
        volume: volume ?? defaultVolume,
        preload: true,
        onloaderror: (id, error) => {
          console.error(`Error loading sound ${soundPath}:`, error);
        },
      });
    }

    // Play the sound
    soundCache[soundPath].play();
    return soundCache[soundPath];
  } catch (error) {
    console.error('Failed to play sound:', error);
    return null;
  }
}

/**
 * Preload all sounds
 * This can be called during app initialization to prevent delays
 */
export function preloadSounds(): void {
  Object.values(sounds).forEach((soundPath) => {
    if (!soundCache[soundPath]) {
      soundCache[soundPath] = new Howl({
        src: [soundPath],
        volume: defaultVolume,
        preload: true,
      });
    }
  });
}

/**
 * Set global volume for all sounds
 * @param volume Volume level (0-1)
 */
export function setGlobalVolume(volume: number): void {
  Howler.volume(Math.max(0, Math.min(1, volume)));
}

/**
 * Mute/unmute all sounds
 * @param muted Whether sounds should be muted
 */
export function setMuted(muted: boolean): void {
  Howler.mute(muted);
}

/**
 * Check if sounds are currently muted
 * @returns True if sounds are muted
 */
export function isMuted(): boolean {
  return Howler.muted;
}

/**
 * Stop all currently playing sounds
 */
export function stopAllSounds(): void {
  Object.values(soundCache).forEach((sound) => {
    sound.stop();
  });
}
