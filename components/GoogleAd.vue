<template>
  <div class="ad-container" :class="position">
    <ins
      class="adsbygoogle"
      :style="{ display: 'block' }"
      :data-ad-client="'YOUR-CLIENT-ID'"
      :data-ad-slot="adSlot"
      :data-ad-format="format"
      :data-full-width-responsive="responsive"
    ></ins>
  </div>
</template>

<script>
export default {
  name: "GoogleAd",
  props: {
    adSlot: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      default: "auto",
    },
    position: {
      type: String,
      default: "center", // 'left', 'right', 'center'
    },
    responsive: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error loading ad:", error);
    }
  },
};
</script>

<style scoped>
.ad-container {
  padding: 1rem;
  margin: 1rem 0;
  min-height: 100px;
  background: var(--surface);
  border-radius: 8px;
  box-shadow: 0 1px 3px var(--shadow);
}

.ad-container.left {
  margin-right: auto;
}

.ad-container.right {
  margin-left: auto;
}

.ad-container.center {
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .ad-container {
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
}
</style>
