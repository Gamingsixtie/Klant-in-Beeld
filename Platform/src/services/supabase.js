import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// ==================== HELPERS ====================
// Convert snake_case to camelCase
const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase)
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      acc[camelKey] = toCamelCase(obj[key])
      return acc
    }, {})
  }
  return obj
}

// Convert camelCase to snake_case
const toSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase)
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      acc[snakeKey] = toSnakeCase(obj[key])
      return acc
    }, {})
  }
  return obj
}

// ==================== BATEN ====================
export async function fetchBaten() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('baten')
    .select('*')
    .order('created_at')
  if (error) throw error
  return toCamelCase(data)
}

export async function createBaat(baat) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('baten')
    .insert([toSnakeCase(baat)])
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function updateBaat(id, updates) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('baten')
    .update(toSnakeCase(updates))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function deleteBaat(id) {
  if (!supabase) return
  const { error } = await supabase.from('baten').delete().eq('id', id)
  if (error) throw error
}

// ==================== INSPANNINGEN ====================
export async function fetchInspanningen() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('inspanningen')
    .select('*')
    .order('start_maand')
  if (error) throw error
  return toCamelCase(data)
}

export async function createInspanning(inspanning) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('inspanningen')
    .insert([toSnakeCase(inspanning)])
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function updateInspanning(id, updates) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('inspanningen')
    .update(toSnakeCase(updates))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function deleteInspanning(id) {
  if (!supabase) return
  const { error } = await supabase.from('inspanningen').delete().eq('id', id)
  if (error) throw error
}

// ==================== STAKEHOLDERS ====================
export async function fetchStakeholders() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('stakeholders')
    .select('*')
    .order('rol')
  if (error) throw error
  return toCamelCase(data)
}

export async function createStakeholder(stakeholder) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('stakeholders')
    .insert([toSnakeCase(stakeholder)])
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function updateStakeholder(id, updates) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('stakeholders')
    .update(toSnakeCase(updates))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function deleteStakeholder(id) {
  if (!supabase) return
  const { error } = await supabase.from('stakeholders').delete().eq('id', id)
  if (error) throw error
}

// ==================== RISICOS ====================
export async function fetchRisicos() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('risicos')
    .select('*')
    .order('score', { ascending: false })
  if (error) throw error
  return toCamelCase(data)
}

export async function createRisico(risico) {
  if (!supabase) return null
  // Remove score as it's computed in DB
  const { score, ...rest } = risico
  const { data, error } = await supabase
    .from('risicos')
    .insert([toSnakeCase(rest)])
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function updateRisico(id, updates) {
  if (!supabase) return null
  // Remove score as it's computed in DB
  const { score, ...rest } = updates
  const { data, error } = await supabase
    .from('risicos')
    .update(toSnakeCase(rest))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function deleteRisico(id) {
  if (!supabase) return
  const { error } = await supabase.from('risicos').delete().eq('id', id)
  if (error) throw error
}

// ==================== ISSUES ====================
export async function fetchIssues() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .order('datum_gemeld', { ascending: false })
  if (error) throw error
  return toCamelCase(data)
}

export async function createIssue(issue) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('issues')
    .insert([toSnakeCase(issue)])
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function updateIssue(id, updates) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('issues')
    .update(toSnakeCase(updates))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return toCamelCase(data)
}

export async function deleteIssue(id) {
  if (!supabase) return
  const { error } = await supabase.from('issues').delete().eq('id', id)
  if (error) throw error
}

// ==================== CONNECTION TEST ====================
export async function testConnection() {
  if (!supabase) return { connected: false, error: 'Supabase niet geconfigureerd' }
  try {
    const { error } = await supabase.from('baten').select('count').limit(1)
    if (error) throw error
    return { connected: true }
  } catch (error) {
    return { connected: false, error: error.message }
  }
}

// ==================== FETCH ALL DATA ====================
export async function fetchAllData() {
  if (!supabase) return null
  try {
    const [baten, inspanningen, stakeholders, risicos, issues] = await Promise.all([
      fetchBaten(),
      fetchInspanningen(),
      fetchStakeholders(),
      fetchRisicos(),
      fetchIssues()
    ])
    return { baten, inspanningen, stakeholders, risicos, issues }
  } catch (error) {
    console.error('Error fetching all data:', error)
    return null
  }
}
