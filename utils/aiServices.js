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

export const aiModels = [
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'Fast and accurate responses with real-time information'
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    description: 'Powered by GPT-4 with internet access'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s GPT-4 model'
  }
] 