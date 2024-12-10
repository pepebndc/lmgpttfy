const modelDescriptions = {
  en: {
    perplexity: 'Fast and accurate responses with real-time information',
    copilot: 'Powered by GPT-4 with internet access',
    chatgpt: 'OpenAI\'s GPT-4 model'
  },
  es: {
    perplexity: 'Respuestas rápidas y precisas con información en tiempo real',
    copilot: 'Impulsado por GPT-4 con acceso a internet',
    chatgpt: 'Modelo GPT-4 de OpenAI'
  },
  fr: {
    perplexity: 'Réponses rapides et précises avec informations en temps réel',
    copilot: 'Propulsé par GPT-4 avec accès internet',
    chatgpt: 'Modèle GPT-4 d\'OpenAI'
  },
  de: {
    perplexity: 'Schnelle und präzise Antworten mit Echtzeit-Informationen',
    copilot: 'Unterstützt von GPT-4 mit Internetzugang',
    chatgpt: 'OpenAIs GPT-4 Modell'
  }
}

export const getAIServiceUrl = (text, model) => {
  const encodedText = encodeURIComponent(text)
    .replace(/%20/g, '+')
  
  const serviceUrls = {
    'perplexity': `https://www.perplexity.ai/search/new?q=${encodedText}`,
    'copilot': `https://www.bing.com/search?showconv=1&sendquery=1&q=${encodedText}`,
    'chatgpt': `https://chatgpt.com/?model=gpt-4&q=${encodedText}`
  }

  return serviceUrls[model] || serviceUrls['perplexity']
}

export const getModelDescription = (modelId, language = 'en') => {
  return modelDescriptions[language]?.[modelId] || modelDescriptions.en[modelId]
}

export const aiModels = [
  {
    id: 'perplexity',
    name: 'Perplexity AI'
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT'
  }
] 