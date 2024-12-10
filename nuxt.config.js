export default {
  // Global page headers
  head: {
    title: 'Let Me GPT That For You',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Let Me GPT That For You - Share AI conversations in a fun way' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { 
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-CLIENT-ID',
        async: true,
        crossorigin: 'anonymous'
      }
    ]
  },

  // Build Configuration
  build: {
    babel: {
      presets: [
        ['@babel/preset-react'],
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }]
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    transpile: [
      'ufo',
      'vue-router/dist/vue-router.esm.js'
    ],
    extend(config) {
      config.resolve.mainFields = ['module', 'main']
      // Add support for mjs files
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      })
    }
  },

  plugins: [
    { src: '~/plugins/vue-typed-js.js', mode: 'client' },
    { src: '~/plugins/fontawesome.js' }
  ]
} 