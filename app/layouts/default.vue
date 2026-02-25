<script setup lang="ts">
import { navLinks } from '~/data/site'
</script>

<template>
  <div class="site-shell">
    <AppHeader :links="navLinks" />

    <UMain class="pb-16 pt-24 sm:pt-28">
      <UContainer>
        <slot />
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
