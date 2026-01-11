import '@testing-library/jest-dom'

// Mock localStorage for tests
// jsdom provides localStorage, but we need to ensure it's available before any modules load
if (typeof globalThis.localStorage === 'undefined') {
  const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString()
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
      get length() {
        return Object.keys(store).length
      },
      key: (index: number) => {
        const keys = Object.keys(store)
        return keys[index] || null
      },
    }
  })()

  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })
}
