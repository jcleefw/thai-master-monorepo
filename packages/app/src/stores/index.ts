/**
 * Store module barrel export
 *
 * Provides clean import paths following the barrel pattern.
 * Usage: import { useStore } from '@/stores'
 */

// Main store hook
export { useStore } from './useStore'

// Type definitions
export type {
  Store,
  StoreState,
  StoreActions,
  CharacterProgress,
  VocabularyProgress,
  QuizScores,
  UserPreferences,
} from './types'

// Validation schemas (for testing and external validation)
export {
  storeSchema,
  characterProgressSchema,
  vocabularyProgressSchema,
  quizScoresSchema,
  userPreferencesSchema,
} from './schemas'

export type { StoreSchemaType } from './schemas'
