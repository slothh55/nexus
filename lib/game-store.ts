import { create } from 'zustand'

// Types for game assets
export type GameAsset = {
  id: string
  type: 'model' | 'texture' | 'audio'
  url: string
  loaded: boolean
}

// Types for game progress
export type GameProgress = {
  gameId: string
  completed: boolean
  score: number
  highScore: number
  lastPlayed: string
}

// Game store state
interface GameStoreState {
  // Assets management
  assets: Record<string, GameAsset>
  loadingProgress: number
  
  // Game progress
  gameProgress: Record<string, GameProgress>
  
  // Actions
  registerAsset: (asset: Omit<GameAsset, 'loaded'>) => void
  setAssetLoaded: (id: string) => void
  setLoadingProgress: (progress: number) => void
  updateGameProgress: (progress: GameProgress) => void
}

// Create the store
export const useGameStore = create<GameStoreState>((set) => ({
  // Initial state
  assets: {},
  loadingProgress: 0,
  gameProgress: {},
  
  // Actions
  registerAsset: (asset) => set((state) => ({
    assets: {
      ...state.assets,
      [asset.id]: { ...asset, loaded: false }
    }
  })),
  
  setAssetLoaded: (id) => set((state) => ({
    assets: {
      ...state.assets,
      [id]: { ...state.assets[id], loaded: true }
    }
  })),
  
  setLoadingProgress: (progress) => set({
    loadingProgress: progress
  }),
  
  updateGameProgress: (progress) => set((state) => ({
    gameProgress: {
      ...state.gameProgress,
      [progress.gameId]: progress
    }
  }))
}))
