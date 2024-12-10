// Base64 encoding/decoding for URL-safe strings
export const encodeParams = ({ text, model, mood, lang }) => {
  const params = {
    t: text,
    m: model,
    d: mood,
    l: lang
  }
  return Buffer.from(JSON.stringify(params)).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export const decodeParams = (encoded) => {
  try {
    // Add back padding if needed
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(encoded.length + ((4 - (encoded.length % 4)) % 4), '=')
    
    const decoded = Buffer.from(base64, 'base64').toString()
    const { t: text, m: model, d: mood, l: lang } = JSON.parse(decoded)
    
    return { text, model, mood, lang }
  } catch (error) {
    console.error('Error decoding parameters:', error)
    return null
  }
} 