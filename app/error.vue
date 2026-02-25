<script setup lang="ts">
import type { NuxtError } from '#app'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { navLinks } from '~/data/site'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'The page you requested could not be found.'
})
</script>

<template>
  <div class="site-shell">
    <AppHeader :links="navLinks" />

    <UMain class="pb-16 pt-28">
      <UContainer>
        <Card class="p-8 text-center sm:p-12">
          <p class="text-xs font-semibold uppercase tracking-wide text-primary">
            Not found
          </p>
          <h1 class="mt-3 text-5xl font-bold text-highlighted sm:text-6xl">
            {{ error.statusCode || 404 }}
          </h1>
          <p class="mt-4 text-toned">
            {{ error.statusMessage || 'This page drifted out of range.' }}
          </p>

          <div class="mt-7 flex flex-wrap items-center justify-center gap-2">
            <Button as-child>
              <NuxtLink to="/">
                <UIcon name="i-lucide-house" class="size-4" />
                Back home
              </NuxtLink>
            </Button>
            <Button
              as-child
              variant="outline"
            >
              <NuxtLink to="/blog">Read blog</NuxtLink>
            </Button>
            <Button
              as-child
              variant="ghost"
            >
              <NuxtLink to="/friends">Meet friends</NuxtLink>
            </Button>
          </div>
        </Card>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
