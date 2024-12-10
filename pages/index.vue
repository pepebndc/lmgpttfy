<template>
  <div class="generator-container">
    <!-- Top ad -->
    <GoogleAd ad-slot="YOUR-AD-SLOT-1" position="center" />

    <div class="two-column-layout">
      <!-- Settings Column -->
      <div class="settings-column">
        <div class="settings-group">
          <div class="form-group">
            <label for="language">{{
              translations[selectedLanguage].input.language
            }}</label>
            <select
              id="language"
              v-model="selectedLanguage"
              class="form-select"
            >
              <option v-for="lang in languages" :key="lang.id" :value="lang.id">
                {{ lang.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="ai-model">{{
              translations[selectedLanguage].input.model
            }}</label>
            <select id="ai-model" v-model="selectedModel" class="form-select">
              <option
                v-for="model in aiModels"
                :key="model.id"
                :value="model.id"
              >
                {{ model.name }}
              </option>
            </select>
            <span class="model-description" v-if="selectedModel">
              {{ getModelDescription(selectedModel, selectedLanguage) }}
            </span>
          </div>

          <div class="form-group">
            <label for="ai-mood">{{
              translations[selectedLanguage].input.mood
            }}</label>
            <select id="ai-mood" v-model="selectedMood" class="form-select">
              <option
                v-for="(name, mood) in translations[selectedLanguage].moods"
                :key="mood"
                :value="mood"
              >
                {{ name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Vertical Divider -->
      <div class="vertical-divider"></div>

      <!-- Input Column -->
      <div class="input-column">
        <div class="input-content">
          <div class="form-group main-input">
            <label for="search-text">{{
              translations[selectedLanguage].input.question
            }}</label>
            <textarea
              id="search-text"
              v-model="searchText"
              :placeholder="translations[selectedLanguage].input.placeholder"
              class="form-input text-area"
              rows="4"
            ></textarea>
          </div>

          <button
            class="generate-button"
            @click="generateAndCopy"
            :disabled="!searchText.trim()"
          >
            {{ buttonText }}
          </button>

          <div class="result-section" :class="{ 'is-visible': generatedUrl }">
            <p>{{ translations[selectedLanguage].input.shareableLink }}</p>
            <div class="url-display">
              <input
                type="text"
                readonly
                :value="generatedUrl"
                ref="urlInput"
                class="form-input"
              />
            </div>
            <ShareButtons
              :url="generatedUrl"
              :currentLanguage="selectedLanguage"
              class="share-buttons-container"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Ad before history -->
    <GoogleAd ad-slot="YOUR-AD-SLOT-2" position="center" />

    <History
      v-if="showHistory"
      :currentLanguage="selectedLanguage"
      class="history-section"
    />

    <!-- Bottom ad -->
    <GoogleAd ad-slot="YOUR-AD-SLOT-3" position="center" />
  </div>
</template>

<script>
import { encodeParams } from "~/utils/urlParams";
import { aiModels, getModelDescription } from "~/utils/aiServices";
import { supportedLanguages, getDefaultLanguage } from "~/utils/languages";
import translations from "~/utils/translations";
import ShareButtons from "~/components/ShareButtons.vue";
import { saveToHistory } from "~/utils/history";
import History from "~/components/History.vue";
import GoogleAd from "~/components/GoogleAd.vue";

export default {
  name: "GeneratorPage",
  components: {
    ShareButtons,
    History,
    GoogleAd,
  },
  data() {
    return {
      searchText: "",
      selectedModel: "perplexity",
      selectedMood: "professional",
      selectedLanguage: "en",
      generatedUrl: "",
      aiModels,
      languages: supportedLanguages,
      translations,
      justCopied: false,
      copyTimeout: null,
      showHistory: true,
    };
  },
  computed: {
    buttonText() {
      if (!this.generatedUrl) {
        return this.translations[this.selectedLanguage].input
          .generateAndCopyButton;
      }
      return this.justCopied
        ? this.translations[this.selectedLanguage].input.copied
        : this.translations[this.selectedLanguage].input.generateAndCopyButton;
    },
  },
  mounted() {
    this.selectedLanguage = getDefaultLanguage();
  },
  methods: {
    getModelDescription(modelId, language) {
      return getModelDescription(modelId, language);
    },
    generateAndCopy() {
      this.generateUrl();
      // Wait for next tick to ensure URL is generated
      this.$nextTick(() => {
        this.copyUrl();
      });
    },
    generateUrl() {
      if (!this.searchText.trim()) return;

      const encoded = encodeParams({
        text: this.searchText,
        model: this.selectedModel,
        mood: this.selectedMood,
        lang: this.selectedLanguage,
      });
      this.generatedUrl = `${window.location.origin}/a/${encoded}`;

      // Save to history
      saveToHistory({
        text: this.searchText,
        model: this.selectedModel,
        mood: this.selectedMood,
        url: this.generatedUrl,
      });
    },
    copyUrl() {
      if (!this.generatedUrl) return;

      this.$refs.urlInput.select();
      document.execCommand("copy");

      this.justCopied = true;

      // Clear existing timeout if any
      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }

      // Reset copied state after 2 seconds
      this.copyTimeout = setTimeout(() => {
        this.justCopied = false;
      }, 2000);
    },
  },
  beforeDestroy() {
    // Clean up timeout if component is destroyed
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  },
};
</script>

<style scoped>
.generator-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 160px);
}

.two-column-layout {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  height: 100%;
}

.settings-column {
  width: 320px;
  flex-shrink: 0;
  position: sticky;
  top: 1rem;
}

.settings-group {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px var(--shadow);
}

.vertical-divider {
  width: 1px;
  align-self: stretch;
  background-color: #e5e7eb;
  margin: 0 1rem;
}

.input-column {
  flex: 1;
  min-width: 0;
  max-width: 900px;
  margin: 0 auto;
}

.input-content {
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.main-input {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: var(--text);
  font-size: 1rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--surface);
  color: var(--text);
  transition: all 0.2s ease;
}

.text-area {
  resize: vertical;
  min-height: 150px;
  max-height: 400px;
  line-height: 1.5;
  font-size: 1.1rem;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--shadow);
}

.generate-button {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.generate-button:hover:not(:disabled) {
  background-color: var(--primaryDark);
  transform: translateY(-1px);
}

.generate-button:disabled {
  background-color: var(--secondary);
  cursor: not-allowed;
}

.generate-button::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.generate-button:active::after {
  opacity: 0.1;
}

.result-section {
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease;
}

.result-section.is-visible {
  opacity: 1;
  height: auto;
  padding-top: 1.5rem;
  border-top: 2px solid var(--border);
  margin-top: 1rem;
}

.result-section p {
  color: var(--textLight);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.url-display {
  display: flex;
  gap: 1rem;
}

.copy-button {
  padding: 0 1.5rem;
  background-color: #0ea5e9;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.copy-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.model-description {
  display: block;
  font-size: 0.875rem;
  color: var(--textLight);
  margin-top: 0.5rem;
}

.share-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.share-buttons-container {
  width: 100%;
}

@media (max-width: 1400px) {
  .generator-container {
    max-width: 1200px;
  }

  .input-column {
    max-width: 700px;
  }
}

@media (max-width: 1024px) {
  .two-column-layout {
    flex-direction: column;
  }

  .settings-column {
    width: 100%;
    position: static;
  }

  .vertical-divider {
    display: none;
  }

  .input-column {
    max-width: 100%;
  }

  .settings-group {
    margin-bottom: 2rem;
  }
}

@media (max-width: 640px) {
  .generator-container {
    padding: 1rem;
  }

  .input-content {
    min-height: 300px;
  }
}
</style>
