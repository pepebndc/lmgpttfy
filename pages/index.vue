<template>
  <div class="generator-container">
    <div class="form-group">
      <label for="search-text">What would you ask?</label>
      <textarea
        id="search-text"
        v-model="searchText"
        placeholder="Enter your question..."
        class="form-input text-area"
        rows="4"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="ai-model">AI Model</label>
      <select id="ai-model" v-model="selectedModel" class="form-select">
        <option v-for="model in aiModels" :key="model.id" :value="model.id">
          {{ model.name }}
        </option>
      </select>
      <span class="model-description" v-if="selectedModelInfo">
        {{ selectedModelInfo.description }}
      </span>
    </div>

    <div class="form-group">
      <label for="ai-mood">AI Mood</label>
      <select id="ai-mood" v-model="selectedMood" class="form-select">
        <option value="professional">Professional</option>
        <option value="friendly">Friendly</option>
        <option value="sarcastic">Sarcastic</option>
        <option value="pirate">Pirate</option>
        <option value="medieval">Medieval</option>
        <option value="zen">Zen</option>
        <option value="roast">Roast Mode 🔥</option>
      </select>
    </div>

    <button
      class="generate-button"
      @click="generateUrl"
      :disabled="!searchText.trim()"
    >
      Generate Link
    </button>

    <div v-if="generatedUrl" class="result-section">
      <p>Your shareable link:</p>
      <div class="url-display">
        <input
          type="text"
          readonly
          :value="generatedUrl"
          ref="urlInput"
          class="form-input"
        />
        <button class="copy-button" @click="copyUrl">Copy</button>
      </div>
    </div>
  </div>
</template>

<script>
import { encodeParams } from "~/utils/urlParams";
import { aiModels } from "~/utils/aiServices";

export default {
  name: "GeneratorPage",
  data() {
    return {
      searchText: "",
      selectedModel: "perplexity", // Default to Perplexity
      selectedMood: "professional",
      generatedUrl: "",
      aiModels,
    };
  },
  computed: {
    selectedModelInfo() {
      return this.aiModels.find((model) => model.id === this.selectedModel);
    },
  },
  methods: {
    generateUrl() {
      if (!this.searchText.trim()) return;

      const encoded = encodeParams({
        text: this.searchText,
        model: this.selectedModel,
        mood: this.selectedMood,
      });
      this.generatedUrl = `${window.location.origin}/a/${encoded}`;
    },
    copyUrl() {
      this.$refs.urlInput.select();
      document.execCommand("copy");
      // TODO: Add a toast or notification to show it was copied
    },
  },
};
</script>

<style scoped>
.generator-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
}

.generate-button:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.generate-button:disabled {
  background-color: #64748b;
  cursor: not-allowed;
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
    padding: 1.5rem;
    height: auto;
    padding-bottom: 2rem;
  }

  .url-display {
    flex-direction: column;
  }

  .copy-button {
    width: 100%;
    padding: 1rem;
  }
}
</style>
