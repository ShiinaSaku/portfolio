<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { siteProfile, socialLinks } from "~/data/site";
</script>

<template>
  <footer class="pb-8 pt-4 sm:pt-6">
    <UContainer>
      <!-- Gradient divider -->
      <div
        class="mb-6 h-px w-full bg-linear-to-r from-transparent via-amber-400/40 to-transparent dark:via-amber-500/30"
      />

      <div
        class="flex flex-col items-center gap-5 rounded-xl border border-white/60 bg-white/60 px-6 py-5 shadow-sm shadow-black/5 backdrop-blur-xl dark:border-white/8 dark:bg-zinc-900/60 sm:flex-row sm:justify-between sm:gap-4"
      >
        <!-- Left: identity + tagline -->
        <div class="text-center sm:text-left">
          <p class="font-semibold text-highlighted">
            {{ siteProfile.name }}
          </p>
          <p class="mt-0.5 text-xs text-muted">
            {{ siteProfile.shortBio }}
          </p>
        </div>

        <!-- Center: copyright (hidden on very small) -->
        <p class="hidden text-xs text-muted lg:block">
          &copy; {{ new Date().getFullYear() }} — Built with Nuxt &amp; &#9829;
        </p>

        <!-- Right: social links -->
        <div class="flex items-center gap-1">
          <Button
            v-for="item in socialLinks"
            :key="item.label"
            as-child
            variant="ghost"
            size="sm"
            class="gap-1.5 text-muted transition-colors hover:text-highlighted"
          >
            <a
              :href="item.to?.toString()"
              :target="
                item.to?.toString().startsWith('http') ? '_blank' : undefined
              "
              rel="noreferrer"
            >
              <UIcon :name="item.icon" class="size-4" />
              <span class="hidden sm:inline">{{ item.label }}</span>
            </a>
          </Button>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
