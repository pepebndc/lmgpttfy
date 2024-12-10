<template>
  <div class="generator-container">
    <div class="form-group language-selector">
      <label for="language">{{
        translations[selectedLanguage].input.language
      }}</label>
      <select id="language" v-model="selectedLanguage" class="form-select">
        <option v-for="lang in languages" :key="lang.id" :value="lang.id">
          {{ lang.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
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

    <div class="form-group">
      <label for="ai-model">{{
        translations[selectedLanguage].input.model
      }}</label>
      <select id="ai-model" v-model="selectedModel" class="form-select">
        <option v-for="model in aiModels" :key="model.id" :value="model.id">
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

    <button
      class="generate-button"
      @click="generateAndCopy"
      :disabled="!searchText.trim()"
    >
      {{ buttonText }}
    </button>

    <div v-if="generatedUrl" class="result-section">
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
    </div>
  </div>
</template>

<script>
import { encodeParams } from "~/utils/urlParams";
import { aiModels, getModelDescription } from "~/utils/aiServices";
import { supportedLanguages, getDefaultLanguage } from "~/utils/languages";
import translations from "~/utils/translations";

export default {
  name: "GeneratorPage",
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-height: 800px) {
  .generator-container {
    justify-content: flex-start;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  color: #1e293b;
  transition: all 0.2s ease;
}

.text-area {
  resize: vertical;
  min-height: 150px;
  line-height: 1.5;
  font-size: 1.1rem;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.generate-button {
  width: 100%;
  padding: 1rem;
  background-color: #2563eb;
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
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.generate-button:disabled {
  background-color: #64748b;
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
  padding-top: 1.5rem;
  border-top: 2px solid #e2e8f0;
}

.result-section p {
  color: #64748b;
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
  color: #64748b;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .generator-container {
    padding: 1rem;
    min-height: auto;
  }

  .url-display {
    flex-direction: column;
  }

  .copy-button {
    width: 100%;
    padding: 1rem;
  }
}

.language-selector {
  margin-bottom: 2rem;
  max-width: 200px;
}
</style>
