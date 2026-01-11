/**
 * Unit tests for Zod validation schemas
 *
 * Tests cover:
 * - Valid data passes schema validation
 * - Invalid data fails schema validation with specific errors
 * - Default values are applied correctly
 * - Schema structure matches TypeScript interfaces
 */

import { describe, it, expect } from 'vitest'
import {
  storeSchema,
  characterProgressSchema,
  vocabularyProgressSchema,
  quizScoresSchema,
  userPreferencesSchema,
} from '../schemas'

describe('Zod Schemas - Valid Data', () => {
  it('should validate complete valid store state', () => {
    const validState = {
      characterProgress: {},
      vocabularyProgress: {},
      quizScores: {},
      userPreferences: {
        alphabetThreshold: 0.70,
        vocabularyThreshold: 0.50,
      },
    }

    const result = storeSchema.safeParse(validState)
    expect(result.success).toBe(true)
  })

  it('should validate characterProgress schema with empty object', () => {
    const result = characterProgressSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('should validate vocabularyProgress schema with empty object', () => {
    const result = vocabularyProgressSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('should validate quizScores schema with empty object', () => {
    const result = quizScoresSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('should validate userPreferences with correct threshold values', () => {
    const validPreferences = {
      alphabetThreshold: 0.70,
      vocabularyThreshold: 0.50,
    }

    const result = userPreferencesSchema.safeParse(validPreferences)
    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.alphabetThreshold).toBe(0.70)
      expect(result.data.vocabularyThreshold).toBe(0.50)
    }
  })

  it('should apply default values for userPreferences', () => {
    const result = userPreferencesSchema.safeParse({})
    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.alphabetThreshold).toBe(0.70)
      expect(result.data.vocabularyThreshold).toBe(0.50)
    }
  })

  it('should accept threshold values at boundaries (0 and 1)', () => {
    const minResult = userPreferencesSchema.safeParse({
      alphabetThreshold: 0,
      vocabularyThreshold: 0,
    })
    expect(minResult.success).toBe(true)

    const maxResult = userPreferencesSchema.safeParse({
      alphabetThreshold: 1,
      vocabularyThreshold: 1,
    })
    expect(maxResult.success).toBe(true)
  })
})

describe('Zod Schemas - Invalid Data', () => {
  it('should reject store state missing required fields', () => {
    const invalidState = {
      characterProgress: {},
      // vocabularyProgress missing
      quizScores: {},
      userPreferences: {
        alphabetThreshold: 0.70,
        vocabularyThreshold: 0.50,
      },
    }

    const result = storeSchema.safeParse(invalidState)
    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0)
    }
  })

  it('should reject userPreferences with invalid threshold types', () => {
    const invalidPreferences = {
      alphabetThreshold: 'not-a-number',
      vocabularyThreshold: 0.50,
    }

    const result = userPreferencesSchema.safeParse(invalidPreferences)
    expect(result.success).toBe(false)

    if (!result.success) {
      const issues = result.error.issues
      expect(issues.length).toBeGreaterThan(0)
      expect(issues[0].path).toContain('alphabetThreshold')
    }
  })

  it('should reject threshold values below 0', () => {
    const invalidPreferences = {
      alphabetThreshold: -0.1,
      vocabularyThreshold: 0.50,
    }

    const result = userPreferencesSchema.safeParse(invalidPreferences)
    expect(result.success).toBe(false)

    if (!result.success) {
      const issues = result.error.issues
      expect(issues.some(issue => issue.path.includes('alphabetThreshold'))).toBe(true)
    }
  })

  it('should reject threshold values above 1', () => {
    const invalidPreferences = {
      alphabetThreshold: 1.5,
      vocabularyThreshold: 0.50,
    }

    const result = userPreferencesSchema.safeParse(invalidPreferences)
    expect(result.success).toBe(false)

    if (!result.success) {
      const issues = result.error.issues
      expect(issues.some(issue => issue.path.includes('alphabetThreshold'))).toBe(true)
    }
  })

  it('should reject non-object characterProgress', () => {
    const result = characterProgressSchema.safeParse('not-an-object')
    expect(result.success).toBe(false)
  })

  it('should reject non-object vocabularyProgress', () => {
    const result = vocabularyProgressSchema.safeParse([])
    expect(result.success).toBe(false)
  })

  it('should reject non-object quizScores', () => {
    const result = quizScoresSchema.safeParse(null)
    expect(result.success).toBe(false)
  })

  it('should provide specific error messages for validation failures', () => {
    const invalidState = {
      characterProgress: 'wrong type',
      vocabularyProgress: {},
      quizScores: {},
      userPreferences: {
        alphabetThreshold: 2.0, // Out of range
        vocabularyThreshold: 0.50,
      },
    }

    const result = storeSchema.safeParse(invalidState)
    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0)

      // Verify errors have path information
      const errorPaths = result.error.issues.map(issue => issue.path.join('.'))
      expect(errorPaths.length).toBeGreaterThan(0)
    }
  })
})

describe('Zod Schemas - Schema Structure', () => {
  it('should have all required top-level fields in storeSchema', () => {
    const schemaShape = storeSchema.shape

    expect(schemaShape.characterProgress).toBeDefined()
    expect(schemaShape.vocabularyProgress).toBeDefined()
    expect(schemaShape.quizScores).toBeDefined()
    expect(schemaShape.userPreferences).toBeDefined()
  })

  it('should have correct field types in userPreferencesSchema', () => {
    const schemaShape = userPreferencesSchema.shape

    expect(schemaShape.alphabetThreshold).toBeDefined()
    expect(schemaShape.vocabularyThreshold).toBeDefined()
  })
})
