import '@testing-library/jest-dom'

// Create a complete localStorage mock
// This must run immediately (not in beforeAll) so it's available when modules are imported
const localStorageMock = {
  _data: {} as Record<string, string>,

  getItem(key: string): string | null {
    return this._data[key] || null
  },

  setItem(key: string, value: string): void {
    this._data[key] = String(value)
  },

  removeItem(key: string): void {
    delete this._data[key]
  },

  clear(): void {
    this._data = {}
  },

  get length(): number {
    return Object.keys(this._data).length
  },

  key(index: number): string | null {
    const keys = Object.keys(this._data)
    return keys[index] || null
  },
}

// Assign localStorage to globalThis immediately
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
})
