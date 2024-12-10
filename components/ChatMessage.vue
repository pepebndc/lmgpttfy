<template>
  <div
    class="chat-message"
    :class="{ 'is-ai': isAI }"
    v-show="isVisible"
    :style="animationStyle"
  >
    <div class="message-avatar">
      {{ isAI ? "🤖" : "👤" }}
    </div>
    <div class="message-content">
      <div class="message-header">
        <span class="sender-name">{{ isAI ? aiName : "You" }}</span>
        <span class="message-time">{{ formattedTime }}</span>
      </div>
      <vue-typed-js
        :strings="[text]"
        :typeSpeed="40"
        :startDelay="isAI ? 500 : 100"
        :showCursor="true"
        cursorChar="_"
        @onComplete="handleTypingComplete"
      >
        <span class="message-text typing"></span>
      </vue-typed-js>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: {
    text: {
      type: String,
      required: true,
    },
    isAI: {
      type: Boolean,
      default: false,
    },
    aiName: {
      type: String,
      default: "AI Assistant",
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      isVisible: false,
      animationStyle: {
        opacity: 0,
        transform: "translateY(20px)",
      },
      typingComplete: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = true;
      this.animationStyle = {
        opacity: 1,
        transform: "translateY(0)",
      };
    }, 100);
  },
  methods: {
    handleTypingComplete() {
      this.typingComplete = true;
      this.$emit("typingComplete");
      // Hide cursor after typing is complete
      const cursor = this.$el.querySelector(".typed-cursor");
      if (cursor) {
        cursor.style.display = "none";
      }
    },
  },
  computed: {
    formattedTime() {
      return this.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.chat-message {
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
  align-items: flex-start;
  flex-direction: row;
  transition: all 0.3s ease-out;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  background-color: white;
  color: #1e293b;
  padding: 1rem;
  border-radius: 16px;
  max-width: 80%;
  border-top-left-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.chat-message:not(.is-ai) {
  flex-direction: row-reverse;
}

.chat-message:not(.is-ai) .message-content {
  background-color: #2563eb;
  color: white;
  border-radius: 16px;
  border-top-right-radius: 4px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.sender-name {
  font-weight: 600;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.8;
}

.chat-message:not(.is-ai) .message-header,
.chat-message:not(.is-ai) .sender-name,
.chat-message:not(.is-ai) .message-time {
  color: white;
}

.message-text {
  line-height: 1.5;
  white-space: pre-wrap;
}

.typing {
  display: inline-block;
}

.typed-cursor {
  opacity: 1;
  animation: typedjsBlink 0.7s infinite;
}

@keyframes typedjsBlink {
  50% {
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .message-content {
    max-width: 85%;
  }

  .message-avatar {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
}
</style>
