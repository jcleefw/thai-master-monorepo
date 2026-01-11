/**
 * Type definitions for the global Zustand store
 *
 * This file contains TypeScript interfaces for all state sections.
 * These are placeholder structures that will be expanded in future epics.
 */

/**
 * Character practice progress tracking
 *
 * Placeholder for Epic 2 - Character Learning Foundation
 * Will track: practiced character IDs, accuracy, last practiced date,
 * completion status, and daily practice counts
 */
// Intentionally empty placeholder - will be expanded in Epic 2
export interface CharacterProgress {
  // Placeholder - will be expanded in Epic 2 stories
  // Structure TBD based on character learning requirements
}

/**
 * Vocabulary learning progress and spaced repetition data
 *
 * Placeholder for Epic 3 - Vocabulary Learning System
 * Will track: vocabulary knowledge levels, spaced repetition state,
 * last studied date, and known words count
 */
// Intentionally empty placeholder - will be expanded in Epic 3
export interface VocabularyProgress {
  // Placeholder - will be expanded in Epic 3 stories
  // Structure TBD based on spaced repetition algorithm requirements
}

/**
 * Quiz performance and accuracy tracking
 *
 * Placeholder for Epic 4 - Assessment & Performance Review
 * Will track: quiz accuracy by category (consonants, vowels, tone marks, vocabulary),
 * quiz history, and total quizzes taken
 */
// Intentionally empty placeholder - will be expanded in Epic 4
export interface QuizScores {
  // Placeholder - will be expanded in Epic 4 stories
  // Structure TBD based on quiz and assessment requirements
}

/**
 * User preferences and configurable settings
 *
 * Configurable thresholds for spaced repetition algorithm per architecture requirements
 * Additional preferences will be added in Epic 5
 *
 * @property alphabetThreshold - Mastery threshold for alphabet characters (default: 0.70 = 70%)
 * @property vocabularyThreshold - Mastery threshold for vocabulary words (default: 0.50 = 50%)
 */
export interface UserPreferences {
  /** Alphabet mastery threshold (0-1) - Default: 0.70 (70%) */
  alphabetThreshold: number
  /** Vocabulary mastery threshold (0-1) - Default: 0.50 (50%) */
  vocabularyThreshold: number
  // Additional preferences will be added in Epic 5
}

/**
 * Root store state interface combining all state sections
 *
 * This is the complete shape of the global Zustand store.
 * All state is managed in a single global store (NOT feature-based stores).
 */
export interface StoreState {
  /** Character practice progress (Epic 2) */
  characterProgress: CharacterProgress
  /** Vocabulary learning progress (Epic 3) */
  vocabularyProgress: VocabularyProgress
  /** Quiz performance tracking (Epic 4) */
  quizScores: QuizScores
  /** User preferences and settings (Epic 5) */
  userPreferences: UserPreferences
}

/**
 * Store actions interface for updating state
 *
 * These actions will be expanded in future epics with specific implementations.
 * Currently defined as placeholders for state structure.
 */
export interface StoreActions {
  /** Update character progress (Epic 2) */
  updateCharacterProgress: (_progress: Partial<CharacterProgress>) => void
  /** Update vocabulary progress (Epic 3) */
  updateVocabularyProgress: (_progress: Partial<VocabularyProgress>) => void
  /** Update quiz scores (Epic 4) */
  updateQuizScores: (_scores: Partial<QuizScores>) => void
  /** Update user preferences (Epic 5) */
  updateUserPreferences: (_preferences: Partial<UserPreferences>) => void
  /** Reset entire store to default state */
  resetStore: () => void
}

/**
 * Complete store interface combining state and actions
 */
export type Store = StoreState & StoreActions
