<template>
  <button class="theme-toggle" @click="toggleTheme" :title="buttonTitle">
    <font-awesome-icon
      :icon="['fas', currentTheme === 'dark' ? 'sun' : 'moon']"
    />
  </button>
</template>

<script>
import { setTheme, getStoredTheme } from "~/utils/theme";

export default {
  name: "ThemeToggle",
  data() {
    return {
      currentTheme: "light",
    };
  },
  computed: {
    buttonTitle() {
      return this.currentTheme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";
    },
  },
  mounted() {
    this.currentTheme = getStoredTheme();
    setTheme(this.currentTheme);

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", this.handleSystemThemeChange);
  },
  beforeDestroy() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", this.handleSystemThemeChange);
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
      setTheme(this.currentTheme);
    },
    handleSystemThemeChange(e) {
      if (!localStorage.getItem("theme")) {
        this.currentTheme = e.matches ? "dark" : "light";
        setTheme(this.currentTheme);
      }
    },
  },
};
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: scale(1.1);
}
</style>
