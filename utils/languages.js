export const supportedLanguages = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Español' },
  { id: 'fr', name: 'Français' },
  { id: 'de', name: 'Deutsch' }
]

export const getDefaultLanguage = () => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return 'en'
  }
  
  try {
    // Get browser language
    const browserLang = navigator.language.split('-')[0]
    // Check if it's supported, otherwise default to English
    return supportedLanguages.find(lang => lang.id === browserLang)?.id || 'en'
  } catch (error) {
    console.error('Error getting browser language:', error)
    return 'en'
  }
} 