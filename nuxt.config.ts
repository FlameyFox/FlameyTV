// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  plugins: [{ src: '~/plugins/vercel.js', mode: 'client' }],
  runtimeConfig: {
    tmdbAPI: process.env.TMDB_API,
  },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito&display=swap',
        },
      ],
    },
  },
})
