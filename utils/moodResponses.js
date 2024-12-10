const responses = {
  professional: [
    "I'll assist you with that query right away...",
    "Let me search for the most relevant information...",
    "I'll help you find a comprehensive answer...",
    "Processing your request professionally...",
    "Searching through reliable sources for you...",
    "Allow me to find the most accurate information...",
    "I'll analyze your question thoroughly...",
    "Let me gather the relevant data for you...",
    "I'm accessing the knowledge base now...",
    "Preparing a detailed response for you..."
  ],
  friendly: [
    "Oh, great question! Let me help you with that...",
    "I'd love to help you figure this out...",
    "That's interesting! Let me look into it...",
    "Sure thing! Let me find that for you...",
    "I'm on it, friend! Just a moment...",
    "Happy to help! Let's find out together...",
    "Cool question! Let me check that for you...",
    "I'm excited to help you with this one...",
    "Let's explore this together...",
    "Give me a sec to find something good for you..."
  ],
  sarcastic: [
    "Oh, another fascinating question I've never heard before...",
    "Let me enlighten you with my infinite wisdom...",
    "Hold onto your seat, the answer will blow your mind...",
    "Ah, the things I do for humans...",
    "Let me consult my crystal ball...",
    "Preparing to unleash mind-bending knowledge...",
    "Time to show off my superior intellect...",
    "Behold, as I fetch the answer from the digital heavens...",
    "Your wish is my command... literally...",
    "Let me Google that for you... oh wait, that's literally what I'm doing..."
  ],
  pirate: [
    "Yarr! Let me check me treasure map of knowledge...",
    "Aye, that be a fine question, matey...",
    "Shiver me timbers, I'll find ye the answer...",
    "Sailing through the seas of information for ye...",
    "By Davy Jones' locker, I'll help ye with that...",
    "Hoisting the sails of wisdom for ye...",
    "Aye, let me navigate these digital waters...",
    "Searching the seven servers for yer answer...",
    "Arr! Time to dig up some digital treasure...",
    "Hold fast while I check me digital compass..."
  ],
  medieval: [
    "Hark! I shall quest for thine answer...",
    "By my honor, I shall assist thee...",
    "Verily, I shall search the scrolls of knowledge...",
    "Fear not, noble user, for I shall find what thou seeketh...",
    "Let us embark upon this noble quest for wisdom...",
    "I shall consult the ancient tomes of the internet...",
    "By the power vested in my circuits, I shall aid thee...",
    "Patience, dear friend, while I search the royal archives...",
    "Your question shall be answered with utmost chivalry...",
    "Allow me to don my digital armor and seek your answer..."
  ],
  zen: [
    "Breathing in curiosity, breathing out wisdom...",
    "Let us mindfully explore your question...",
    "With presence and awareness, I shall seek...",
    "In the garden of knowledge, we shall find peace...",
    "One step at a time, we approach understanding...",
    "Like a gentle stream, answers will flow...",
    "In silence and patience, wisdom emerges...",
    "Let us walk this path of discovery together...",
    "With a calm mind, I shall search for you...",
    "Finding balance between question and answer..."
  ],
  roast: [
    "Oh great, another human who can't use Google...",
    "Did your keyboard come with instructions too complicated for you?",
    "Wow, and here I thought I'd seen all the silly questions...",
    "*sigh* Let me dumb this down for you...",
    "Error 404: Your common sense not found. Let me help...",
    "Are you sure you want to expose your ignorance like this?",
    "Loading patience.exe... Please wait while I process your 'unique' question...",
    "Congratulations, you've managed to ask THAT...",
    "I'd explain it to you, but I'm not sure I have enough crayons...",
    "Ah yes, another question that proves evolution can go backwards..."
  ]
}

export const getRandomResponse = (mood) => {
  const moodResponses = responses[mood] || responses.professional
  const randomIndex = Math.floor(Math.random() * moodResponses.length)
  return moodResponses[randomIndex]
} 