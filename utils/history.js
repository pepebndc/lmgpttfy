const HISTORY_KEY = 'lmgpttfy_history'
const MAX_HISTORY_ITEMS = 1000

export const saveToHistory = (item) => {
  try {
    const history = getHistory()
    const newHistory = [
      {
        ...item,
        timestamp: Date.now()
      },
      ...history.filter(h => h.url !== item.url) // Avoid duplicates
    ].slice(0, MAX_HISTORY_ITEMS) // Keep only last 10 items

    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
    
    // Dispatch event to notify components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('historyUpdated'));
    }
    
    return true
  } catch (error) {
    console.error('Error saving to history:', error)
    return false
  }
}

export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Error getting history:', error)
    return []
  }
}

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY)
    return true
  } catch (error) {
    console.error('Error clearing history:', error)
    return false
  }
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export const removeHistoryItem = (item) => {
  try {
    const history = getHistory()
    const newHistory = history.filter(h => h.timestamp !== item.timestamp)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
    return true
  } catch (error) {
    console.error('Error removing history item:', error)
    return false
  }
} 