<template>
  <div class="history-container">
    <div class="history-header">
      <h3>{{ translations[currentLanguage].history.title }}</h3>
    </div>

    <div v-if="historyItems.length" class="history-table-container">
      <table class="history-table">
        <thead>
          <tr>
            <th>{{ translations[currentLanguage].history.date }}</th>
            <th>{{ translations[currentLanguage].history.text }}</th>
            <th>{{ translations[currentLanguage].history.model }}</th>
            <th>{{ translations[currentLanguage].history.mood }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.timestamp">
            <td>{{ formatDate(item.timestamp) }}</td>
            <td class="text-cell">
              <div class="text-content" :title="item.text">{{ item.text }}</div>
            </td>
            <td>{{ item.model }}</td>
            <td>{{ getMoodTranslation(item.mood) }}</td>
            <td class="copy-cell">
              <button
                class="copy-button"
                @click="copyUrl(item.url)"
                :title="translations[currentLanguage].history.copy"
              >
                <font-awesome-icon :icon="['fas', 'copy']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination">
        <button
          class="page-button"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
        <span class="page-info">
          {{ translations[currentLanguage].history.page }} {{ currentPage }}/{{
            totalPages
          }}
        </span>
        <button
          class="page-button"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
      </div>
    </div>

    <div v-else class="history-empty">
      {{ translations[currentLanguage].history.empty }}
    </div>
  </div>
</template>

<script>
import { getHistory, formatDate } from "~/utils/history";
import globalTranslations from "~/utils/translations";

export default {
  name: "History",
  components: {},
  props: {
    currentLanguage: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      historyItems: [],
      currentPage: 1,
      itemsPerPage: 10,
      translations: {
        en: {
          history: {
            title: "History",
            empty: "No history yet",
            text: "Question",
            model: "Model",
            mood: "Mood",
            date: "Date",
            copy: "Copy link",
            page: "Page",
          },
        },
        es: {
          history: {
            title: "Enlaces Recientes",
            empty: "Sin historial aún",
            text: "Pregunta",
            model: "Modelo",
            mood: "Tono",
            date: "Fecha",
            copy: "Copiar enlace",
            page: "Página",
          },
        },
        fr: {
          history: {
            title: "Liens Récents",
            empty: "Pas encore d'historique",
            text: "Question",
            model: "Modèle",
            mood: "État",
            date: "Date",
            copy: "Copier le lien",
            page: "Page",
          },
        },
        de: {
          history: {
            title: "Letzte Links",
            empty: "Noch keine Einträge",
            text: "Frage",
            model: "Modell",
            mood: "Stimmung",
            date: "Datum",
            copy: "Link kopieren",
            page: "Seite",
          },
        },
      },
    };
  },
  computed: {
    sortedItems() {
      return [...this.historyItems].sort((a, b) => b.timestamp - a.timestamp);
    },
    totalPages() {
      return Math.ceil(this.historyItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedItems.slice(start, end);
    },
  },
  mounted() {
    this.loadHistory();
    window.addEventListener("historyUpdated", this.loadHistory);
  },
  beforeDestroy() {
    window.removeEventListener("historyUpdated", this.loadHistory);
  },
  methods: {
    loadHistory() {
      this.historyItems = getHistory();
    },
    copyUrl(url) {
      navigator.clipboard.writeText(url);
    },
    formatDate(timestamp) {
      return formatDate(timestamp);
    },
    getMoodTranslation(mood) {
      return globalTranslations[this.currentLanguage]?.moods?.[mood] || mood;
    },
  },
  watch: {
    historyItems() {
      // Reset to first page when items change
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.history-container {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border);
}

.history-table-container {
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--surface);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.history-table th,
.history-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.history-table th {
  background: var(--primary);
  color: white;
  font-weight: 500;
}

.text-cell {
  max-width: 400px;
  min-width: 200px;
}

.text-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.25rem 0;
  cursor: help;
}

.copy-cell {
  width: 1%;
  white-space: nowrap;
  text-align: right;
}

.copy-button {
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  background-color: var(--primary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-button svg {
  font-size: 1rem;
}

.copy-button:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.page-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-button:disabled {
  background-color: var(--secondary);
  cursor: not-allowed;
}

.page-button:not(:disabled):hover {
  filter: brightness(1.1);
}

.page-info {
  color: var(--text);
  font-size: 0.9rem;
}

.history-empty {
  text-align: center;
  color: var(--textLight);
  padding: 2rem;
  background: var(--surface);
  border-radius: 8px;
}

@media (max-width: 768px) {
  .history-table th,
  .history-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }

  .text-cell {
    max-width: 150px;
    min-width: 120px;
  }
}
</style>
