// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
   '@nuxt/eslint',
   '@nuxt/image',
   '@nuxt/ui',
   '@nuxt/content',
   '@vueuse/nuxt',
   'nuxt-og-image',
   'motion-v/nuxt',
   '@nuxtjs/sitemap',
   'shadcn-nuxt'
  ],

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },

  site: { 
 url: 'https://shiina.xyz', 
 name: 'Saku Shiina' 
 }, 

  devtools: {
    enabled: true
  },
  app: {
    baseURL: '/'
  },

  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://shiina.xyz'
    }
  },

  compatibilityDate: '2026-02-01',

  nitro: {
    prerender: {
      routes: [
        '/',
        '/blog',
        '/friends'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})