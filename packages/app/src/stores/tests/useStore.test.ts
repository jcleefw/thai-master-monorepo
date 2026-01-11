/**
 * Unit tests for basic Zustand store functionality
 *
 * Tests cover:
 * - Store initialization with correct defaults
 * - State updates via actions
 * - Store reset functionality
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '../useStore'

describe('useStore - Basic Functionality', () => {
  beforeEach(() => {
    // Clear LocalStorage and reset store before each test
    localStorage.clear()
    useStore.getState().resetStore()
  })

  it('should initialize with correct default state', () => {
    const state = useStore.getState()

    // Verify all state sections exist
    expect(state.characterProgress).toBeDefined()
    expect(state.vocabularyProgress).toBeDefined()
    expect(state.quizScores).toBeDefined()
    expect(state.userPreferences).toBeDefined()

    // Verify user preferences have correct default values
    expect(state.userPreferences.alphabetThreshold).toBe(0.70)
    expect(state.userPreferences.vocabularyThreshold).toBe(0.50)

    // Verify placeholder sections are empty objects
    expect(state.characterProgress).toEqual({})
    expect(state.vocabularyProgress).toEqual({})
    expect(state.quizScores).toEqual({})
  })

  it('should update character progress', () => {
    const { updateCharacterProgress } = useStore.getState()

    const mockProgress = { someField: 'test-value' }
    updateCharacterProgress(mockProgress)

    const state = useStore.getState()
    expect(state.characterProgress).toEqual(mockProgress)
  })

  it('should update vocabulary progress', () => {
    const { updateVocabularyProgress } = useStore.getState()

    const mockProgress = { someField: 'vocab-test' }
    updateVocabularyProgress(mockProgress)

    const state = useStore.getState()
    expect(state.vocabularyProgress).toEqual(mockProgress)
  })

  it('should update quiz scores', () => {
    const { updateQuizScores } = useStore.getState()

    const mockScores = { someScore: 85 }
    updateQuizScores(mockScores)

    const state = useStore.getState()
    expect(state.quizScores).toEqual(mockScores)
  })

  it('should update user preferences', () => {
    const { updateUserPreferences } = useStore.getState()

    const newPreferences = {
      alphabetThreshold: 0.80,
      vocabularyThreshold: 0.60,
    }
    updateUserPreferences(newPreferences)

    const state = useStore.getState()
    expect(state.userPreferences.alphabetThreshold).toBe(0.80)
    expect(state.userPreferences.vocabularyThreshold).toBe(0.60)
  })

  it('should partially update user preferences', () => {
    const { updateUserPreferences } = useStore.getState()

    // Update only alphabet threshold
    updateUserPreferences({ alphabetThreshold: 0.85 })

    const state = useStore.getState()
    expect(state.userPreferences.alphabetThreshold).toBe(0.85)
    expect(state.userPreferences.vocabularyThreshold).toBe(0.50) // Should remain default
  })

  it('should reset store to default state', () => {
    const { updateCharacterProgress, updateUserPreferences, resetStore } = useStore.getState()

    // Make some changes
    updateCharacterProgress({ someField: 'changed' })
    updateUserPreferences({ alphabetThreshold: 0.90 })

    // Reset store
    resetStore()

    // Verify everything is back to defaults
    const state = useStore.getState()
    expect(state.characterProgress).toEqual({})
    expect(state.userPreferences.alphabetThreshold).toBe(0.70)
    expect(state.userPreferences.vocabularyThreshold).toBe(0.50)
  })

  it('should have all required actions defined', () => {
    const state = useStore.getState()

    expect(state.updateCharacterProgress).toBeDefined()
    expect(state.updateVocabularyProgress).toBeDefined()
    expect(state.updateQuizScores).toBeDefined()
    expect(state.updateUserPreferences).toBeDefined()
    expect(state.resetStore).toBeDefined()

    expect(typeof state.updateCharacterProgress).toBe('function')
    expect(typeof state.updateVocabularyProgress).toBe('function')
    expect(typeof state.updateQuizScores).toBe('function')
    expect(typeof state.updateUserPreferences).toBe('function')
    expect(typeof state.resetStore).toBe('function')
  })
})
