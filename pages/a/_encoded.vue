<template>
  <div class="animation-container" v-if="params">
    <div class="chat-container">
      <div class="chat-header">
        <div class="model-info">
          <span class="model-name">{{ getAIName }}</span>
          <span class="mood-badge">{{ getMoodName }}</span>
        </div>
        <button
          class="export-button"
          @click="exportChat"
          title="Export conversation"
        >
          <font-awesome-icon :icon="['fas', 'download']" />
        </button>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <ChatMessage
          v-if="showUserMessage"
          :text="params.text"
          :timestamp="userMessageTime"
          @typingComplete="onUserMessageComplete"
          :language="params.lang"
        />
        <ChatMessage
          v-if="showAIResponse"
          :text="getAIResponse"
          :isAI="true"
          :aiName="getAIName"
          :timestamp="aiMessageTime"
          @typingComplete="onAIMessageComplete"
          :language="params.lang"
        />
        <div v-if="showLoader" class="loader"></div>
      </div>
    </div>
  </div>
  <div v-else class="error-container">
    <h2>
      {{
        translations[currentLang]?.error?.invalid || "Invalid URL Parameters"
      }}
    </h2>
    <p>
      {{
        translations[currentLang]?.error?.corrupted ||
        "The provided URL appears to be invalid or corrupted."
      }}
    </p>
    <nuxt-link to="/" class="home-link">
      {{ translations[currentLang]?.error?.goHome || "Go to Homepage" }}
    </nuxt-link>
  </div>
</template>

<script>
import { decodeParams } from "~/utils/urlParams";
import { getAIServiceUrl } from "~/utils/aiServices";
import { getRandomResponse } from "~/utils/moodResponses";
import globalTranslations from "~/utils/translations";
import ChatMessage from "~/components/ChatMessage.vue";

export default {
  name: "AnimationPage",
  components: {
    ChatMessage,
  },
  data() {
    return {
      params: null,
      showUserMessage: false,
      showAIResponse: false,
      showLoader: false,
      userMessageTime: new Date(),
      aiMessageTime: null,
      translations: globalTranslations,
    };
  },
  computed: {
    currentLang() {
      return this.params?.lang || "en";
    },
    getAIName() {
      const modelNames = {
        perplexity: "Perplexity AI",
        copilot: "Microsoft Copilot",
        chatgpt: "ChatGPT",
      };
      return modelNames[this.params?.model] || "AI Assistant";
    },
    getMoodName() {
      return (
        this.translations[this.currentLang]?.moods?.[this.params?.mood] ||
        this.translations.en.moods[this.params?.mood] ||
        this.params?.mood
      );
    },
    getAIResponse() {
      return getRandomResponse(
        this.params?.mood || "professional",
        this.currentLang
      );
    },
  },
  created() {
    const { encoded } = this.$route.params;
    this.params = decodeParams(encoded);
    if (this.params) {
      setTimeout(() => {
        this.showUserMessage = true;
      }, 500);
    }
  },
  methods: {
    onUserMessageComplete() {
      setTimeout(() => {
        this.aiMessageTime = new Date();
        this.showAIResponse = true;
      }, 1000);
    },
    onAIMessageComplete() {
      setTimeout(() => {
        this.showLoader = true;
        setTimeout(() => {
          const serviceUrl = getAIServiceUrl(
            this.params.text,
            this.params.model
          );
          window.location.href = serviceUrl;
        }, 1500);
      }, 500);
    },
    exportChat() {
      const content = [
        `Question: ${this.params.text}`,
        `AI Model: ${this.getAIName}`,
        `Mood: ${this.getMoodName}`,
        `Response: ${this.getAIResponse}`,
        `\nGenerated with Let Me GPT That For You\n${window.location.href}`,
      ].join("\n\n");

      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "conversation.txt";
      a.click();
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
.animation-container {
  width: 50%;
  margin: 0 auto;
  height: calc(100vh - 160px);
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  min-width: 600px;
}

.chat-header {
  padding: 1.25rem;
  background-color: #2563eb;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.model-info {
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.model-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.mood-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: #f8fafc;
}

.error-container {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.error-container h2 {
  color: #2563eb;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.error-container p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.home-link:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .animation-container {
    width: 70%;
    min-width: auto;
  }

  .chat-container {
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .animation-container {
    width: 100%;
    padding: 0;
  }

  .chat-container {
    margin: 0;
    height: 100%;
    border-radius: 0;
  }
}

.loader {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.loader:after {
  content: "";
  width: 30px;
  height: 30px;
  border: 4px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: loader-spin 1s linear infinite;
}

@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}

.export-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.export-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}
</style>
