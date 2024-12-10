<template>
  <div class="share-buttons">
    <button
      v-for="(platform, index) in platforms"
      :key="index"
      @click="share(platform)"
      class="share-button"
      :class="platform.id"
    >
      <font-awesome-icon :icon="platform.icon" />
      <span>{{ translations[currentLanguage].share[platform.id] }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ShareButtons",
  props: {
    url: {
      type: String,
      required: true,
    },
    currentLanguage: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      platforms: [
        {
          id: "twitter",
          icon: ["fab", "twitter"],
          url: (text) => `https://twitter.com/intent/tweet?url=${text}`,
        },
        {
          id: "whatsapp",
          icon: ["fab", "whatsapp"],
          url: (text) => `https://wa.me/?text=${text}`,
        },
        {
          id: "telegram",
          icon: ["fab", "telegram"],
          url: (text) => `https://t.me/share/url?url=${text}`,
        },
      ],
      translations: {
        en: {
          share: {
            twitter: "Tweet",
            whatsapp: "WhatsApp",
            telegram: "Telegram",
          },
        },
        es: {
          share: {
            twitter: "Tuitear",
            whatsapp: "WhatsApp",
            telegram: "Telegram",
          },
        },
        fr: {
          share: {
            twitter: "Tweeter",
            whatsapp: "WhatsApp",
            telegram: "Telegram",
          },
        },
        de: {
          share: {
            twitter: "Twittern",
            whatsapp: "WhatsApp",
            telegram: "Telegram",
          },
        },
      },
    };
  },
  methods: {
    share(platform) {
      const shareUrl = platform.url(encodeURIComponent(this.url));
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    },
  },
};
</script>

<style scoped>
.share-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.share-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  background-color: var(--secondary);
}

.share-button svg {
  font-size: 1.2em;
}

.twitter {
  background-color: #1da1f2;
}

.whatsapp {
  background-color: #25d366;
}

.telegram {
  background-color: #0088cc;
}

.share-button:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}

@media (max-width: 640px) {
  .share-buttons {
    flex-direction: column;
  }

  .share-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
