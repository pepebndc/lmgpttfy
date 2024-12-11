// Custom base64-like encoding with a larger character set for more compression
const encodeMap = {
  // Numbers (0-9)
  0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9',
  // Lowercase (a-z)
  10: 'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f', 16: 'g', 17: 'h', 18: 'i', 19: 'j',
  20: 'k', 21: 'l', 22: 'm', 23: 'n', 24: 'o', 25: 'p', 26: 'q', 27: 'r', 28: 's', 29: 't',
  30: 'u', 31: 'v', 32: 'w', 33: 'x', 34: 'y', 35: 'z',
  // Uppercase (A-Z)
  36: 'A', 37: 'B', 38: 'C', 39: 'D', 40: 'E', 41: 'F', 42: 'G', 43: 'H', 44: 'I', 45: 'J',
  46: 'K', 47: 'L', 48: 'M', 49: 'N', 50: 'O', 51: 'P', 52: 'Q', 53: 'R', 54: 'S', 55: 'T',
  56: 'U', 57: 'V', 58: 'W', 59: 'X', 60: 'Y', 61: 'Z',
  // Special chars
  62: '-', 63: '_'
}

const decodeMap = Object.fromEntries(Object.entries(encodeMap).map(([k, v]) => [v, k]))

// Models: p=perplexity, c=copilot, g=chatgpt
const modelMap = { 
  perplexity: 'p', 
  copilot: 'c', 
  chatgpt: 'g' 
}
const reverseModelMap = { 
  p: 'perplexity', 
  c: 'copilot', 
  g: 'chatgpt' 
}

// Moods: p=professional, f=friendly, s=sarcastic, i=pirate, m=medieval, z=zen, r=roast
const moodMap = {
  professional: 'p',
  friendly: 'f',
  sarcastic: 's',
  pirate: 'i',
  medieval: 'm',
  zen: 'z',
  roast: 'r'
}
const reverseMoodMap = Object.fromEntries(
  Object.entries(moodMap).map(([k, v]) => [v, k])
)

export const encodeParams = ({ text, model, mood, lang }) => {
  // Get single character codes
  const modelCode = modelMap[model] || 'p'
  const moodCode = moodMap[mood] || 'p'
  const langCode = lang || 'en'
  
  // Create compact string
  const params = `${modelCode}${moodCode}${langCode}${text}`
  
  // Base64 encode
  return Buffer.from(params).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const decodeParams = (encoded) => {
  try {
    // Restore base64 padding
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(encoded.length + ((4 - (encoded.length % 4)) % 4), '=')
    
    // Decode base64
    const decoded = Buffer.from(base64, 'base64').toString()
    
    // Extract components
    const modelCode = decoded.charAt(0)
    const moodCode = decoded.charAt(1)
    const lang = decoded.slice(2, 4)
    const text = decoded.slice(4)
    
    return {
      text,
      model: reverseModelMap[modelCode] || 'perplexity',
      mood: reverseMoodMap[moodCode] || 'professional',
      lang: lang || 'en'
    }
  } catch (error) {
    console.error('Error decoding parameters:', error)
    return null
  }
} 