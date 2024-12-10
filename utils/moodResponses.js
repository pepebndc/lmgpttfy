const responses = {
  en: {
    professional: [
      "I'll assist you with that query right away...",
      "Let me search for the most relevant information...",
      "I'll help you find a comprehensive answer...",
      "Processing your request professionally...",
      "Searching through reliable sources for you..."
    ],
    friendly: [
      "Oh, great question! Let me help you with that...",
      "I'd love to help you figure this out...",
      "That's interesting! Let me look into it...",
      "Sure thing! Let me find that for you...",
      "I'm on it, friend! Just a moment..."
    ],
    sarcastic: [
      "Oh, another fascinating question I've never heard before...",
      "Let me enlighten you with my infinite wisdom...",
      "Hold onto your seat, the answer will blow your mind...",
      "Ah, the things I do for humans...",
      "Let me consult my crystal ball..."
    ],
    pirate: [
      "Yarr! Let me check me treasure map of knowledge...",
      "Aye, that be a fine question, matey...",
      "Shiver me timbers, I'll find ye the answer...",
      "Sailing through the seas of information for ye...",
      "By Davy Jones' locker, I'll help ye with that..."
    ],
    medieval: [
      "Hark! I shall quest for thine answer...",
      "By my honor, I shall assist thee...",
      "Verily, I shall search the scrolls of knowledge...",
      "Fear not, noble user, for I shall find what thou seeketh...",
      "Let us embark upon this noble quest for wisdom..."
    ],
    zen: [
      "Breathing in curiosity, breathing out wisdom...",
      "Let us mindfully explore your question...",
      "With presence and awareness, I shall seek...",
      "In the garden of knowledge, we shall find peace...",
      "One step at a time, we approach understanding..."
    ],
    roast: [
      "Oh great, another human who can't use Google...",
      "Did your keyboard come with instructions too complicated for you?",
      "Wow, and here I thought I'd seen all the silly questions...",
      "*sigh* Let me dumb this down for you...",
      "Error 404: Your common sense not found. Let me help..."
    ]
  },
  es: {
    professional: [
      "Te ayudaré con esa consulta de inmediato...",
      "Déjame buscar la información más relevante...",
      "Te ayudaré a encontrar una respuesta completa...",
      "Procesando tu solicitud profesionalmente...",
      "Buscando en fuentes confiables para ti..."
    ],
    friendly: [
      "¡Oh, gran pregunta! Déjame ayudarte con eso...",
      "¡Me encantaría ayudarte a resolver esto!...",
      "¡Qué interesante! Vamos a investigarlo...",
      "¡Claro que sí! Déjame buscar eso para ti...",
      "¡Estoy en ello, amigo! Un momento..."
    ],
    sarcastic: [
      "Oh, otra pregunta fascinante que nunca había escuchado...",
      "Permíteme iluminarte con mi infinita sabiduría...",
      "Agárrate, la respuesta te va a volar la mente...",
      "Ah, las cosas que hago por los humanos...",
      "Déjame consultar mi bola de cristal..."
    ],
    pirate: [
      "¡Yarr! Déjame consultar mi mapa del tesoro del conocimiento...",
      "¡Aye, esa es una buena pregunta, marinero!...",
      "¡Por los siete mares, encontraré tu respuesta!...",
      "Navegando por los mares de la información para ti...",
      "¡Por el cofre de Davy Jones, te ayudaré con eso!..."
    ],
    medieval: [
      "¡Oíd! Emprenderé la búsqueda de vuestra respuesta...",
      "Por mi honor, os ayudaré...",
      "En verdad, consultaré los pergaminos del saber...",
      "No temáis, noble usuario, encontraré lo que buscáis...",
      "Emprendamos esta noble búsqueda de sabiduría..."
    ],
    zen: [
      "Inspirando curiosidad, exhalando sabiduría...",
      "Exploremos tu pregunta con atención plena...",
      "Con presencia y consciencia, buscaré...",
      "En el jardín del conocimiento, encontraremos paz...",
      "Paso a paso, nos acercamos al entendimiento..."
    ],
    roast: [
      "Vaya, otro humano que no sabe usar Google...",
      "¿Tu teclado vino con instrucciones demasiado complicadas?...",
      "Wow, y yo que pensaba que ya había visto todas las preguntas tontas...",
      "*suspiro* Déjame explicártelo como si tuvieras cinco años...",
      "Error 404: Tu sentido común no encontrado. Déjame ayudarte..."
    ]
  },
  fr: {
    professional: [
      "Je vais vous aider avec cette requête immédiatement...",
      "Laissez-moi chercher les informations les plus pertinentes...",
      "Je vais vous aider à trouver une réponse complète...",
      "Traitement de votre demande de manière professionnelle...",
      "Recherche dans des sources fiables pour vous..."
    ],
    friendly: [
      "Oh, excellente question ! Je vais vous aider avec ça...",
      "Je serais ravi(e) de vous aider à comprendre...",
      "C'est intéressant ! Regardons ça ensemble...",
      "Bien sûr ! Je vais chercher ça pour vous...",
      "Je m'en occupe, ami(e) ! Un instant..."
    ],
    sarcastic: [
      "Oh, encore une question fascinante que je n'ai jamais entendue...",
      "Laissez-moi vous illuminer de ma sagesse infinie...",
      "Accrochez-vous, la réponse va vous époustoufler...",
      "Ah, les choses que je fais pour les humains...",
      "Laissez-moi consulter ma boule de cristal..."
    ],
    pirate: [
      "Moussaillon ! Laissez-moi consulter ma carte au trésor du savoir...",
      "Aye, c'est une bonne question, matelot !...",
      "Par tous les requins, je trouverai votre réponse !...",
      "Naviguant sur les mers de l'information pour vous...",
      "Par le coffre de Davy Jones, je vais vous aider..."
    ],
    medieval: [
      "Oyez ! Je partirai en quête de votre réponse...",
      "Sur mon honneur, je vous aiderai...",
      "En vérité, je consulterai les parchemins du savoir...",
      "N'ayez crainte, noble utilisateur, je trouverai ce que vous cherchez...",
      "Embarquons dans cette noble quête de sagesse..."
    ],
    zen: [
      "Inspirant la curiosité, expirant la sagesse...",
      "Explorons votre question en pleine conscience...",
      "Avec présence et conscience, je chercherai...",
      "Dans le jardin de la connaissance, nous trouverons la paix...",
      "Pas à pas, nous approchons de la compréhension..."
    ],
    roast: [
      "Oh génial, encore un humain qui ne sait pas utiliser Google...",
      "Votre clavier est-il livré avec des instructions trop compliquées ?...",
      "Wow, et moi qui pensais avoir vu toutes les questions stupides...",
      "*soupir* Laissez-moi vous expliquer ça comme à un enfant...",
      "Erreur 404 : Votre bon sens est introuvable. Laissez-moi vous aider..."
    ]
  },
  de: {
    professional: [
      "Ich werde Ihnen sofort bei dieser Anfrage helfen...",
      "Lassen Sie mich nach den relevantesten Informationen suchen...",
      "Ich helfe Ihnen, eine umfassende Antwort zu finden...",
      "Bearbeite Ihre Anfrage professionell...",
      "Durchsuche zuverlässige Quellen für Sie..."
    ],
    friendly: [
      "Oh, tolle Frage! Lass mich dir dabei helfen...",
      "Ich würde dir gerne dabei helfen, das herauszufinden...",
      "Das ist interessant! Lass uns mal nachsehen...",
      "Klar doch! Ich suche das für dich...",
      "Ich bin dran, Freund! Einen Moment..."
    ],
    sarcastic: [
      "Oh, noch eine faszinierende Frage, die ich noch nie gehört habe...",
      "Lass mich dich mit meiner unendlichen Weisheit erleuchten...",
      "Halt dich fest, die Antwort wird dich umhauen...",
      "Ach, die Dinge, die ich für Menschen tue...",
      "Lass mich meine Kristallkugel befragen..."
    ],
    pirate: [
      "Arrr! Lass mich die Schatzkarte des Wissens checken...",
      "Aye, das ist 'ne gute Frage, Matrose!...",
      "Beim Klabautermann, ich find' die Antwort für dich!...",
      "Segle durch die Meere der Information für dich...",
      "Bei Davy Jones' Kiste, ich helf' dir dabei..."
    ],
    medieval: [
      "Hört! Ich werde mich auf die Suche nach Eurer Antwort begeben...",
      "Bei meiner Ehre, ich werde Euch beistehen...",
      "Wahrlich, ich werde die Schriftrollen des Wissens konsultieren...",
      "Fürchtet Euch nicht, edler Benutzer, ich werde finden, was Ihr sucht...",
      "Lasst uns diese edle Suche nach Weisheit beginnen..."
    ],
    zen: [
      "Neugier einatmen, Weisheit ausatmen...",
      "Lass uns deine Frage achtsam erkunden...",
      "Mit Präsenz und Bewusstsein werde ich suchen...",
      "Im Garten des Wissens werden wir Frieden finden...",
      "Schritt für Schritt nähern wir uns dem Verständnis..."
    ],
    roast: [
      "Oh toll, noch ein Mensch, der Google nicht benutzen kann...",
      "Kam deine Tastatur mit zu komplizierten Anweisungen?...",
      "Wow, und ich dachte, ich hätte schon alle dummen Fragen gesehen...",
      "*seufz* Lass es mich dir wie einem Kleinkind erklären...",
      "Fehler 404: Dein gesunder Menschenverstand wurde nicht gefunden. Lass mich dir helfen..."
    ]
  }
}

export const getRandomResponse = (mood, language = 'en') => {
  const languageResponses = responses[language] || responses.en
  const moodResponses = languageResponses[mood] || languageResponses.professional
  const randomIndex = Math.floor(Math.random() * moodResponses.length)
  return moodResponses[randomIndex]
} 