<script setup lang="ts">
const colorMode = useColorMode()
const { site } = useAppConfig()

const themeColor = computed(() => colorMode.value === 'dark' ? '#09090B' : '#FFFBEB')

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: themeColor }
  ]
})

useSeoMeta({
  title: site.title,
  titleTemplate: `%s | ${site.name}`,
  ogSiteName: site.name,
  description: site.description,
  ogDescription: site.description,
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
  twitterImage: '/og-image.png'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
