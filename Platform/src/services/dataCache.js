/**
 * Data Cache Service
 * In-memory cache with TTL support for widget data
 */

class DataCache {
  constructor(defaultTTL = 60000) {
    this.cache = new Map()
    this.defaultTTL = defaultTTL // Default: 1 minute
  }

  /**
   * Generate a cache key from data source config
   * @param {Object} dataSource - Widget data source configuration
   * @returns {string} - Cache key
   */
  generateKey(dataSource) {
    return JSON.stringify(dataSource)
  }

  /**
   * Get cached data
   * @param {string|Object} key - Cache key or data source config
   * @returns {any|null} - Cached data or null if not found/expired
   */
  get(key) {
    const cacheKey = typeof key === 'object' ? this.generateKey(key) : key
    const entry = this.cache.get(cacheKey)

    if (!entry) return null

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(cacheKey)
      return null
    }

    // Update access time for LRU
    entry.lastAccessed = Date.now()
    return entry.data
  }

  /**
   * Set cached data
   * @param {string|Object} key - Cache key or data source config
   * @param {any} data - Data to cache
   * @param {number} ttl - Time to live in milliseconds (optional)
   */
  set(key, data, ttl = this.defaultTTL) {
    const cacheKey = typeof key === 'object' ? this.generateKey(key) : key

    this.cache.set(cacheKey, {
      data,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttl,
      lastAccessed: Date.now()
    })

    // Cleanup old entries if cache is too large
    if (this.cache.size > 100) {
      this.cleanup()
    }
  }

  /**
   * Check if key exists and is not expired
   * @param {string|Object} key - Cache key or data source config
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null
  }

  /**
   * Invalidate specific cache entries
   * @param {string} entity - Entity type to invalidate (e.g., 'baten', 'inspanningen')
   */
  invalidate(entity) {
    for (const [key, entry] of this.cache.entries()) {
      try {
        const keyData = JSON.parse(key)
        if (keyData.entity === entity) {
          this.cache.delete(key)
        }
      } catch {
        // Key is not a JSON string, skip
      }
    }
  }

  /**
   * Invalidate all cache entries
   */
  invalidateAll() {
    this.cache.clear()
  }

  /**
   * Remove expired and least recently used entries
   */
  cleanup() {
    const now = Date.now()

    // Remove expired entries
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key)
      }
    }

    // If still too large, remove oldest accessed entries
    if (this.cache.size > 80) {
      const entries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].lastAccessed - b[1].lastAccessed)

      const toRemove = entries.slice(0, entries.length - 80)
      toRemove.forEach(([key]) => this.cache.delete(key))
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getStats() {
    let expiredCount = 0
    let totalSize = 0
    const now = Date.now()

    for (const [, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        expiredCount++
      }
      totalSize += JSON.stringify(entry.data).length
    }

    return {
      totalEntries: this.cache.size,
      expiredEntries: expiredCount,
      approximateSize: `${(totalSize / 1024).toFixed(2)} KB`,
      hitRate: this.hitCount / (this.hitCount + this.missCount) || 0
    }
  }
}

// Singleton instance
const cacheInstance = new DataCache()

/**
 * Hook for using the cache in React components
 * @param {Object} dataSource - Widget data source configuration
 * @param {Function} fetchFn - Function to fetch data if not cached
 * @param {Object} options - Cache options
 */
export function useCachedData(dataSource, fetchFn, options = {}) {
  const { ttl = 60000, enabled = true } = options

  // Try cache first
  if (enabled) {
    const cached = cacheInstance.get(dataSource)
    if (cached !== null) {
      return { data: cached, isFromCache: true }
    }
  }

  // Fetch fresh data
  const data = fetchFn(dataSource)

  // Cache the result
  if (enabled && data !== null && data !== undefined) {
    cacheInstance.set(dataSource, data, ttl)
  }

  return { data, isFromCache: false }
}

/**
 * Wrapper for async data fetching with cache
 * @param {Object} dataSource - Widget data source configuration
 * @param {Function} fetchFn - Async function to fetch data
 * @param {Object} options - Cache options
 */
export async function fetchWithCache(dataSource, fetchFn, options = {}) {
  const { ttl = 60000, enabled = true, forceRefresh = false } = options

  // Try cache first (unless forcing refresh)
  if (enabled && !forceRefresh) {
    const cached = cacheInstance.get(dataSource)
    if (cached !== null) {
      return { data: cached, isFromCache: true }
    }
  }

  // Fetch fresh data
  const data = await fetchFn(dataSource)

  // Cache the result
  if (enabled && data !== null && data !== undefined) {
    cacheInstance.set(dataSource, data, ttl)
  }

  return { data, isFromCache: false }
}

// Export singleton and functions
export const dataCache = cacheInstance
export default cacheInstance
