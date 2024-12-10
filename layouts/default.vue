<template>
  <div class="app-container">
    <header class="app-header">
      <div class="container header-content">
        <h1 class="app-title">Let Me GPT That For You</h1>
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
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(to right, #1e40af, #2563eb);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.app-title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-content {
  flex: 1;
  padding: 1rem 0;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
}

.app-footer {
  background: linear-gradient(to right, #1e40af, #2563eb);
  padding: 0.75rem 0;
  margin-top: auto;
}

.footer-text {
  color: white;
  text-align: center;
  font-weight: 500;
}
</style>
