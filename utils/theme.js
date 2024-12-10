export const themes = {
  light: {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#3b82f6',
    secondary: '#64748b',
    accent: '#0ea5e9',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b',
    border: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    headerGradient: 'linear-gradient(to right, #1e40af, #2563eb)',
  },
  dark: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    primaryLight: '#60a5fa',
    secondary: '#94a3b8',
    accent: '#38bdf8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textLight: '#cbd5e1',
    border: '#334155',
    shadow: 'rgba(0, 0, 0, 0.3)',
    headerGradient: 'linear-gradient(to right, #1e293b, #2563eb)',
  }
}

export const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const setTheme = (theme) => {
  const root = document.documentElement
  const selectedTheme = themes[theme] || themes.light

  Object.entries(selectedTheme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })

  // Store theme preference
  localStorage.setItem('theme', theme)
}

export const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem('theme') || getSystemTheme()
} 