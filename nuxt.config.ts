// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  plugins: [{ src: '~/plugins/vercel.js', mode: 'client' }],
  runtimeConfig: {
    tmdbAPI: process.env.TMDB_API,
  },
  modules: ['@nuxtjs/tailwindcss'],
})
