/**
 * Zod validation schemas for store state
 *
 * These schemas are used to validate LocalStorage data on hydration.
 * Validation happens in the persist middleware's custom storage adapter.
 * Failed validation triggers automatic reset with corrupted data backup.
 */

import { z } from 'zod'

/**
 * Character progress validation schema
 *
 * Placeholder for Epic 2 - will be expanded with specific fields
 * Currently validates as empty object (no fields yet)
 * .strict() ensures no unexpected keys are accepted
 */
export const characterProgressSchema = z.object({
  // Placeholder - will be expanded in Epic 2 stories
  // When expanded, this will validate:
  // - practicedCharacterIds: array of strings
  // - lastPracticedDate: ISO date string
  // - dailyPracticeCount: non-negative integer
  // - completionDate: nullable ISO date string
  // - isMasteryComplete: boolean
}).strict()

/**
 * Vocabulary progress validation schema
 *
 * Placeholder for Epic 3 - will be expanded with spaced repetition fields
 * Currently validates as empty object (no fields yet)
 * .strict() ensures no unexpected keys are accepted
 */
export const vocabularyProgressSchema = z.object({
  // Placeholder - will be expanded in Epic 3 stories
  // When expanded, this will validate:
  // - vocabularyKnowledge: array of knowledge state objects
  // - lastStudiedDate: ISO date string
  // - dailyWordsLearned: non-negative integer
  // - totalKnownWords: non-negative integer
  // - completionDate: nullable ISO date string
  // - isVocabularyComplete: boolean
}).strict()

/**
 * Quiz scores validation schema
 *
 * Placeholder for Epic 4 - will be expanded with accuracy tracking fields
 * Currently validates as empty object (no fields yet)
 * .strict() ensures no unexpected keys are accepted
 */
export const quizScoresSchema = z.object({
  // Placeholder - will be expanded in Epic 4 stories
  // When expanded, this will validate:
  // - consonantAccuracy: number (0-100)
  // - vowelAccuracy: number (0-100)
  // - toneMarkAccuracy: number (0-100)
  // - vocabularyAccuracy: number (0-100)
  // - quizHistory: array of quiz session objects
  // - totalQuizzesTaken: non-negative integer
  // - lastQuizDate: ISO date string
}).strict()

/**
 * User preferences validation schema
 *
 * Validates configurable thresholds for spaced repetition algorithm
 * Additional preferences will be added in Epic 5
 */
export const userPreferencesSchema = z.object({
  /**
   * Alphabet mastery threshold (0-1)
   * Default: 0.70 (70% accuracy required for mastery)
   */
  alphabetThreshold: z.number().min(0).max(1).default(0.70),
  /**
   * Vocabulary mastery threshold (0-1)
   * Default: 0.50 (50% accuracy required for mastery)
   */
  vocabularyThreshold: z.number().min(0).max(1).default(0.50),
  // Additional preferences will be added in Epic 5
})

/**
 * Root store validation schema
 *
 * Combines all section schemas to validate the complete store state.
 * This is used in the persist middleware's getItem method to validate
 * LocalStorage data on hydration (app load).
 *
 * If validation fails:
 * 1. Corrupted data is backed up to 'thai-master:store:corrupted'
 * 2. Store is reset to default state
 * 3. Error is logged to console
 * 4. App continues functioning (no crash)
 */
export const storeSchema = z.object({
  characterProgress: characterProgressSchema,
  vocabularyProgress: vocabularyProgressSchema,
  quizScores: quizScoresSchema,
  userPreferences: userPreferencesSchema,
})

/**
 * TypeScript type inferred from the Zod schema
 *
 * This ensures the Zod schema and TypeScript interface stay in sync.
 * Use this type for runtime validation scenarios.
 */
export type StoreSchemaType = z.infer<typeof storeSchema>
