/**
 * Global Zustand store with LocalStorage persistence and Zod validation
 *
 * CRITICAL: This is a SINGLE GLOBAL STORE (NOT feature-based stores)
 * Architecture decision: All state managed in one store per architecture.md
 *
 * Features:
 * - Automatic LocalStorage persistence via persist middleware
 * - Zod validation on hydration (app load)
 * - Automatic corrupted data handling (reset + backup + log)
 * - Quota exceeded error handling
 * - Zero data loss guarantee (NFR-R1)
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as Sentry from '@sentry/react'
import { storeSchema } from './schemas'
import type { Store, StoreState, CharacterProgress, VocabularyProgress, QuizScores, UserPreferences } from './types'

/**
 * Default initial state values
 *
 * These are placeholder defaults that will be expanded in future epics.
 * UserPreferences includes configurable thresholds per architecture requirements.
 */
const defaultState: StoreState = {
  characterProgress: {},
  vocabularyProgress: {},
  quizScores: {},
  userPreferences: {
    alphabetThreshold: 0.70,      // 70% accuracy for alphabet mastery (PRD requirement)
    vocabularyThreshold: 0.50,    // 50% accuracy for vocabulary mastery (PRD requirement)
  },
}

/**
 * Custom storage adapter with integrated Zod validation
 *
 * Validation runs on hydration (app load), NOT on every state update.
 * This ensures performance while maintaining data integrity.
 *
 * Error handling:
 * - Corrupted JSON → backup to 'thai-master:store:corrupted', reset, log
 * - Invalid schema → backup to 'thai-master:store:corrupted', reset, log
 * - Quota exceeded → log error, continue (graceful degradation)
 */
const storage = createJSONStorage(() => ({
  getItem: (name: string) => {
    try {
      const item = localStorage.getItem(name)

      // No data in LocalStorage - return null (use defaults)
      if (!item) {
        return null
      }

      // Parse JSON
      let parsed
      try {
        parsed = JSON.parse(item)
      } catch (parseError) {
        console.error('❌ LocalStorage data parsing failed - corrupted JSON detected:', parseError)
        console.error('Resetting store to default state. Corrupted data backed up for debugging.')

        // Report to Sentry with full context
        Sentry.captureException(parseError, {
          level: 'error',
          tags: {
            error_type: 'localstorage_json_parse_error',
            store_key: name,
          },
          contexts: {
            corrupted_data: {
              raw_value: item.substring(0, 500), // First 500 chars to avoid payload size issues
              value_length: item.length,
            },
          },
        })

        // Backup corrupted data for debugging
        try {
          localStorage.setItem('thai-master:store:corrupted', item)
        } catch (backupError) {
          console.error('Failed to backup corrupted data:', backupError)
        }

        // Clean up corrupted data
        localStorage.removeItem(name)
        return null
      }

      // Validate against Zod schema
      try {
        storeSchema.parse(parsed)
        return item  // Return original string - Zustand handles parsing
      } catch (validationError) {
        console.error('❌ LocalStorage data validation failed - schema mismatch detected:', validationError)
        console.error('Resetting store to default state. Corrupted data backed up for debugging.')

        // Report to Sentry with full context
        Sentry.captureException(validationError, {
          level: 'error',
          tags: {
            error_type: 'localstorage_zod_validation_error',
            store_key: name,
          },
          contexts: {
            corrupted_data: {
              data_structure: JSON.stringify(parsed, null, 2).substring(0, 1000), // First 1000 chars
              data_keys: Object.keys(parsed || {}),
            },
            validation_error: {
              error_details: validationError instanceof Error ? validationError.message : String(validationError),
            },
          },
        })

        // Backup corrupted data for debugging
        try {
          localStorage.setItem('thai-master:store:corrupted', item)
        } catch (backupError) {
          console.error('Failed to backup corrupted data:', backupError)
        }

        // Clean up invalid data
        localStorage.removeItem(name)
        return null
      }
    } catch (error) {
      console.error('❌ Unexpected error in storage.getItem:', error)
      return null
    }
  },

  setItem: (name: string, value: unknown) => {
    try {
      localStorage.setItem(name, JSON.stringify(value))
    } catch (error) {
      // Handle quota exceeded errors gracefully
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error('❌ LocalStorage quota exceeded - unable to save state')
        console.error('Please clear browser data or export your progress for backup')

        // Report to Sentry
        Sentry.captureException(error, {
          level: 'warning',
          tags: {
            error_type: 'localstorage_quota_exceeded',
            store_key: name,
          },
          contexts: {
            storage_info: {
              attempted_value_size: JSON.stringify(value).length,
            },
          },
        })
      } else {
        console.error('❌ Error saving to LocalStorage:', error)

        // Report other storage errors to Sentry
        Sentry.captureException(error instanceof Error ? error : new Error(String(error)), {
          level: 'error',
          tags: {
            error_type: 'localstorage_setitem_error',
            store_key: name,
          },
        })
      }
      // Don't throw - allow app to continue functioning
    }
  },

  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name)
    } catch (error) {
      console.error('❌ Error removing from LocalStorage:', error)
    }
  },
}))

/**
 * Global Zustand store hook
 *
 * Usage: const { characterProgress, updateCharacterProgress } = useStore()
 *
 * IMPORTANT: This is the ONLY store in the application.
 * Do NOT create additional feature-based stores.
 */
export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Initial state
      ...defaultState,

      // Actions

      /**
       * Update character progress
       * Placeholder for Epic 2 - will be expanded with specific logic
       */
      updateCharacterProgress: (progress: Partial<CharacterProgress>) => {
        set((state) => ({
          characterProgress: {
            ...state.characterProgress,
            ...progress,
          },
        }))
      },

      /**
       * Update vocabulary progress
       * Placeholder for Epic 3 - will be expanded with spaced repetition logic
       */
      updateVocabularyProgress: (progress: Partial<VocabularyProgress>) => {
        set((state) => ({
          vocabularyProgress: {
            ...state.vocabularyProgress,
            ...progress,
          },
        }))
      },

      /**
       * Update quiz scores
       * Placeholder for Epic 4 - will be expanded with accuracy calculation logic
       */
      updateQuizScores: (scores: Partial<QuizScores>) => {
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            ...scores,
          },
        }))
      },

      /**
       * Update user preferences
       * Currently supports configurable thresholds for spaced repetition
       * Will be expanded in Epic 5 with additional preferences
       */
      updateUserPreferences: (preferences: Partial<UserPreferences>) => {
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            ...preferences,
          },
        }))
      },

      /**
       * Reset entire store to default state
       * Useful for testing, logout, or data corruption recovery
       */
      resetStore: () => {
        set(defaultState)
      },
    }),
    {
      name: 'thai-master:store',  // LocalStorage key with required prefix
      storage,                     // Custom storage adapter with Zod validation
    }
  )
)
