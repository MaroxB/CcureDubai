import { useState, useEffect, useCallback } from 'react'

/**
 * Persistent state hook backed by localStorage.
 * Falls back to `initialValue` if the key doesn't exist yet.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return initialValue
      const parsed = JSON.parse(item)
      // Guard against stored null/undefined (e.g. corrupt write)
      return parsed ?? initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        return valueToStore
      })
    } catch (error) {
      console.error(`useLocalStorage [${key}]:`, error)
    }
  }, [key])

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`useLocalStorage removeValue [${key}]:`, error)
    }
  }, [key, initialValue])

  // Sync across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue)
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
