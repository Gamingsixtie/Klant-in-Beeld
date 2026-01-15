/**
 * useWidgetData Hook
 * React hook for fetching and caching widget data
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { dataCache, fetchWithCache } from '../services/dataCache'
import { useAppStore } from '../stores/appStore'

// Default options
const DEFAULT_OPTIONS = {
  enabled: true,
  refetchInterval: null, // null = no auto-refetch
  staleTime: 60000, // 1 minute
  cacheTime: 300000, // 5 minutes
  retry: 3,
  retryDelay: 1000
}

/**
 * Hook for fetching widget data with caching
 * @param {Object} dataSource - Widget data source configuration
 * @param {Object} options - Fetch options
 */
export function useWidgetData(dataSource, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  const [state, setState] = useState({
    data: undefined,
    isLoading: true,
    isError: false,
    error: null,
    isFromCache: false,
    lastUpdated: null
  })

  const intervalRef = useRef(null)
  const retryCountRef = useRef(0)

  // Get raw data from app store
  const { baten, inspanningen, risicos, doelen, vermogens, stuurparameters } = useAppStore()

  // Data fetcher function
  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!opts.enabled || !dataSource) {
      setState(prev => ({ ...prev, isLoading: false }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, isError: false, error: null }))

    try {
      // Try to get from cache first
      const cached = !forceRefresh && dataCache.get(dataSource)
      if (cached) {
        setState({
          data: cached,
          isLoading: false,
          isError: false,
          error: null,
          isFromCache: true,
          lastUpdated: new Date().toISOString()
        })
        return
      }

      // Process data based on entity type
      const result = await processDataSource(dataSource, {
        baten,
        inspanningen,
        risicos,
        doelen,
        vermogens,
        stuurparameters
      })

      // Cache the result
      dataCache.set(dataSource, result, opts.staleTime)

      setState({
        data: result,
        isLoading: false,
        isError: false,
        error: null,
        isFromCache: false,
        lastUpdated: new Date().toISOString()
      })

      retryCountRef.current = 0

    } catch (error) {
      // Retry logic
      if (retryCountRef.current < opts.retry) {
        retryCountRef.current++
        setTimeout(() => fetchData(forceRefresh), opts.retryDelay * retryCountRef.current)
        return
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
        error
      }))
    }
  }, [dataSource, opts.enabled, opts.staleTime, opts.retry, opts.retryDelay, baten, inspanningen, risicos, doelen, vermogens, stuurparameters])

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Setup refetch interval
  useEffect(() => {
    if (opts.refetchInterval && opts.enabled) {
      intervalRef.current = setInterval(() => {
        fetchData(true)
      }, opts.refetchInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [opts.refetchInterval, opts.enabled, fetchData])

  // Refetch function
  const refetch = useCallback(() => {
    retryCountRef.current = 0
    return fetchData(true)
  }, [fetchData])

  // Invalidate cache
  const invalidate = useCallback(() => {
    if (dataSource?.entity) {
      dataCache.invalidate(dataSource.entity)
    }
    return refetch()
  }, [dataSource, refetch])

  return {
    ...state,
    refetch,
    invalidate
  }
}

/**
 * Process data source and return computed data
 */
async function processDataSource(dataSource, rawData) {
  const { entity, metric, aggregation, groupBy, filter, sortBy, order } = dataSource

  // Get base data
  let data = []
  switch (entity) {
    case 'baten':
      data = [...rawData.baten]
      break
    case 'inspanningen':
      data = [...rawData.inspanningen]
      break
    case 'risicos':
      data = [...rawData.risicos]
      break
    case 'doelen':
      data = [...rawData.doelen]
      break
    case 'vermogens':
      data = [...rawData.vermogens]
      break
    case 'stuurparameters':
      // Special handling for stuurparameters
      return processStuurparameters(metric)
    case 'voortgang':
      return processVoortgang(rawData)
    default:
      return []
  }

  // Apply filters
  if (filter) {
    data = applyFilters(data, filter)
  }

  // Apply sorting
  if (sortBy) {
    data = applySorting(data, sortBy, order)
  }

  // Apply aggregation
  if (aggregation) {
    return applyAggregation(data, aggregation, metric)
  }

  // Apply groupBy
  if (groupBy) {
    return applyGroupBy(data, groupBy, metric)
  }

  return data
}

/**
 * Apply filters to data
 */
function applyFilters(data, filter) {
  return data.filter(item => {
    return Object.entries(filter).every(([key, value]) => {
      if (value === null || value === undefined) return true
      return item[key] === value
    })
  })
}

/**
 * Apply sorting to data
 */
function applySorting(data, sortBy, order = 'asc') {
  return [...data].sort((a, b) => {
    const aVal = a[sortBy] ?? 0
    const bVal = b[sortBy] ?? 0

    if (typeof aVal === 'string') {
      return order === 'desc'
        ? bVal.localeCompare(aVal)
        : aVal.localeCompare(bVal)
    }

    return order === 'desc' ? bVal - aVal : aVal - bVal
  })
}

/**
 * Apply aggregation to data
 */
function applyAggregation(data, aggregation, metric) {
  switch (aggregation) {
    case 'count':
      return { value: data.length, type: 'count' }

    case 'sum':
      return {
        value: data.reduce((sum, item) => sum + (parseFloat(item[metric]) || 0), 0),
        type: 'sum'
      }

    case 'avg':
      const total = data.reduce((sum, item) => sum + (parseFloat(item[metric]) || 0), 0)
      return {
        value: data.length > 0 ? total / data.length : 0,
        type: 'avg'
      }

    case 'min':
      return {
        value: Math.min(...data.map(item => parseFloat(item[metric]) || Infinity)),
        type: 'min'
      }

    case 'max':
      return {
        value: Math.max(...data.map(item => parseFloat(item[metric]) || -Infinity)),
        type: 'max'
      }

    default:
      return { value: data.length, type: 'count' }
  }
}

/**
 * Apply groupBy to data
 */
function applyGroupBy(data, groupBy, metric) {
  const groups = {}

  data.forEach(item => {
    const key = item[groupBy] || 'Unknown'
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
  })

  return Object.entries(groups).map(([key, items]) => ({
    name: key,
    value: metric
      ? items.reduce((sum, item) => sum + (parseFloat(item[metric]) || parseFloat(item.huidigeWaarde) || 0), 0) / items.length
      : items.length,
    count: items.length,
    items
  }))
}

/**
 * Process stuurparameters for gereedheid calculation
 */
function processStuurparameters(metric) {
  if (metric === 'gereedheid') {
    // Mock gereedheid calculation - in production this would use real data
    return {
      value: 72,
      label: 'Go/No-Go Gereedheid',
      suffix: '%',
      trend: 5
    }
  }
  return { value: 0 }
}

/**
 * Process voortgang/progress data
 */
function processVoortgang(rawData) {
  // Generate mock trend data
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6']
  const baseValue = 30

  return months.map((month, index) => ({
    name: month,
    value: baseValue + (index * 10) + Math.random() * 10,
    target: baseValue + (index * 12)
  }))
}

/**
 * Hook for multiple widgets data
 */
export function useMultipleWidgetData(dataSources, options = {}) {
  const results = dataSources.map(ds =>
    useWidgetData(ds, options)
  )

  const isAnyLoading = results.some(r => r.isLoading)
  const isAnyError = results.some(r => r.isError)

  return {
    results,
    isAnyLoading,
    isAnyError,
    refetchAll: () => Promise.all(results.map(r => r.refetch()))
  }
}

/**
 * Hook for widget data with transformation
 */
export function useTransformedWidgetData(dataSource, transform, options = {}) {
  const { data, ...rest } = useWidgetData(dataSource, options)

  const transformedData = useMemo(() => {
    if (!data || !transform) return data
    try {
      return transform(data)
    } catch (error) {
      console.error('Data transformation error:', error)
      return data
    }
  }, [data, transform])

  return {
    ...rest,
    data: transformedData,
    rawData: data
  }
}

export default useWidgetData
