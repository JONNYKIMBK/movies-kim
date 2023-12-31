// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      key: process.env.key,
    },
  },
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
});
