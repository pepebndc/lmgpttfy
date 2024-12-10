<template>
  <div class="app-container">
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <h1 class="app-title">Let Me GPT That For You</h1>
          <div class="theme-toggle-wrapper">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
    <main class="app-content">
      <Nuxt />
    </main>
    <footer class="app-footer">
      <div class="container">
        <p class="footer-text">Made with 🤖 by humans</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ThemeToggle from "~/components/ThemeToggle.vue";

export default {
  name: "DefaultLayout",
  components: {
    ThemeToggle,
  },
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: var(--headerGradient);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px var(--shadow);
  position: relative;
}

.header-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
}

.app-title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.theme-toggle-wrapper {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.app-content {
  flex: 1;
  padding: 1rem 0;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
}

.app-footer {
  background: var(--headerGradient);
  padding: 0.75rem 0;
  margin-top: auto;
}

.footer-text {
  color: white;
  text-align: center;
  font-weight: 500;
}

@media (max-width: 640px) {
  .app-title {
    font-size: 1.25rem;
  }

  .header-content {
    padding: 0 2.5rem;
  }
}
</style>
