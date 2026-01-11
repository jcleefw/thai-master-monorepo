/**
 * Store Debug Component
 *
 * Development tool to test and visualize Zustand store functionality.
 * Tests: persistence, validation, corruption recovery, all actions.
 *
 * REMOVE BEFORE PRODUCTION - This is a development/testing tool only.
 */

import { useStore } from '../stores'

export function StoreDebug() {
  const store = useStore()

  const testCharacterProgress = () => {
    store.updateCharacterProgress({
      testCharacterId: 'cons-01',
      testPracticed: true,
      testTimestamp: new Date().toISOString(),
    } as any)
  }

  const testVocabularyProgress = () => {
    store.updateVocabularyProgress({
      testWordId: 'vocab-01',
      testKnown: true,
      testLastStudied: new Date().toISOString(),
    } as any)
  }

  const testQuizScores = () => {
    store.updateQuizScores({
      testConsonantAccuracy: Math.floor(Math.random() * 100),
      testQuizDate: new Date().toISOString(),
    } as any)
  }

  const testUserPreferences = () => {
    const newThreshold = Math.random() * 0.5 + 0.5 // Random between 0.5-1.0
    store.updateUserPreferences({
      alphabetThreshold: parseFloat(newThreshold.toFixed(2)),
    })
  }

  const corruptData = () => {
    // Manually corrupt LocalStorage data to test recovery
    localStorage.setItem('thai-master:store', '{invalid json')
    window.alert('LocalStorage corrupted! Reload the page to test corruption recovery.')
  }

  const corruptSchema = () => {
    // Set invalid schema data
    const invalidData = {
      characterProgress: {},
      vocabularyProgress: {},
      quizScores: {},
      userPreferences: {
        alphabetThreshold: 5.0, // Invalid: exceeds max of 1.0
        vocabularyThreshold: -1.0, // Invalid: below min of 0
      },
    }
    localStorage.setItem('thai-master:store', JSON.stringify(invalidData))
    window.alert('Schema corrupted! Reload the page to test schema validation recovery.')
  }

  const viewLocalStorage = () => {
    const storeData = localStorage.getItem('thai-master:store')
    const corruptedData = localStorage.getItem('thai-master:store:corrupted')

    console.clear()
    console.log('=== LocalStorage Contents ===')
    console.log('Store Data:', storeData ? JSON.parse(storeData) : 'empty')
    console.log('Corrupted Backup:', corruptedData || 'none')

    window.alert('Check browser console for LocalStorage contents')
  }

  const clearAllData = () => {
    localStorage.clear()
    store.resetStore()
    window.alert('LocalStorage cleared and store reset!')
  }

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <h1>🔧 Store Debug Panel</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Test Zustand store with LocalStorage persistence and Zod validation
      </p>

      {/* Current State Display */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem',
      }}>
        <h2>Current Store State</h2>
        <div style={{
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '400px',
        }}>
          <pre>{JSON.stringify(store, null, 2)}</pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Test Store Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={testCharacterProgress}
            style={buttonStyle('#4CAF50')}
          >
            Update Character Progress
          </button>
          <button
            onClick={testVocabularyProgress}
            style={buttonStyle('#2196F3')}
          >
            Update Vocabulary Progress
          </button>
          <button
            onClick={testQuizScores}
            style={buttonStyle('#FF9800')}
          >
            Update Quiz Scores
          </button>
          <button
            onClick={testUserPreferences}
            style={buttonStyle('#9C27B0')}
          >
            Update User Preferences
          </button>
          <button
            onClick={() => store.resetStore()}
            style={buttonStyle('#f44336')}
          >
            Reset Store
          </button>
        </div>
      </div>

      {/* LocalStorage Tools */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>LocalStorage & Validation Tests</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={viewLocalStorage}
            style={buttonStyle('#607D8B')}
          >
            View LocalStorage (Console)
          </button>
          <button
            onClick={() => window.location.reload()}
            style={buttonStyle('#009688')}
          >
            Reload Page (Test Persistence)
          </button>
          <button
            onClick={corruptData}
            style={buttonStyle('#FF5722')}
          >
            Corrupt JSON (Test Recovery)
          </button>
          <button
            onClick={corruptSchema}
            style={buttonStyle('#E91E63')}
          >
            Corrupt Schema (Test Validation)
          </button>
          <button
            onClick={clearAllData}
            style={buttonStyle('#795548')}
          >
            Clear All Data
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #2196F3',
      }}>
        <h3 style={{ marginTop: 0 }}>How to Test</h3>
        <ol style={{ marginBottom: 0, lineHeight: '1.8' }}>
          <li><strong>Test Actions:</strong> Click action buttons to update store state. Watch state update in real-time above.</li>
          <li><strong>Test Persistence:</strong> Make changes, then click "Reload Page". State should persist after reload.</li>
          <li><strong>Test Corruption Recovery:</strong> Click "Corrupt JSON" or "Corrupt Schema", then reload. Store should reset and backup corrupted data.</li>
          <li><strong>View LocalStorage:</strong> Click to see raw LocalStorage data in console. Check for <code>thai-master:store</code> and <code>thai-master:store:corrupted</code> keys.</li>
          <li><strong>Test Validation:</strong> Look for console errors when corruption is detected. Errors should be descriptive with schema details.</li>
        </ol>
      </div>

      {/* User Preferences Details */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
      }}>
        <h3>User Preferences (Configurable Thresholds)</h3>
        <p>
          <strong>Alphabet Threshold:</strong> {(store.userPreferences.alphabetThreshold * 100).toFixed(0)}%
          <span style={{ color: '#666', marginLeft: '1rem' }}>(Default: 70%)</span>
        </p>
        <p>
          <strong>Vocabulary Threshold:</strong> {(store.userPreferences.vocabularyThreshold * 100).toFixed(0)}%
          <span style={{ color: '#666', marginLeft: '1rem' }}>(Default: 50%)</span>
        </p>
      </div>
    </div>
  )
}

const buttonStyle = (color: string) => ({
  padding: '0.75rem 1.5rem',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'opacity 0.2s',
  ':hover': {
    opacity: 0.9,
  },
})
