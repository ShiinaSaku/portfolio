<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteProfile } from "~/data/site";

defineProps<{
  links: NavigationMenuItem[];
}>();

const route = useRoute();
const mobileOpen = ref(false);

function isActive(to?: string) {
  if (!to) return false;
  if (to === "/") return route.path === "/";
  return route.path === to || route.path.startsWith(`${to}/`);
}
</script>

<template>
  <header class="fixed inset-x-0 top-3 z-40 px-2 sm:top-4 sm:px-4">
    <UContainer>
      <div
        class="flex items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/75 px-3 py-2 shadow-sm shadow-black/5 backdrop-blur-xl dark:border-white/8 dark:bg-zinc-900/75 dark:shadow-black/20 sm:px-4"
      >
        <!-- Logo / identity -->
        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-3 rounded-xl px-1.5 py-1 transition-opacity hover:opacity-80"
        >
          <div class="relative">
            <div
              class="absolute -inset-0.5 rounded-full bg-linear-to-br from-amber-400/50 to-sky-400/40 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
            />
            <Avatar class="relative size-9 border border-default">
              <AvatarImage src="/avatar.png" alt="Saku Shiina avatar" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          </div>
          <div class="hidden min-[440px]:block">
            <p class="text-sm font-semibold text-highlighted">
              {{ siteProfile.name }}
            </p>
            <p class="text-xs text-muted">{{ siteProfile.role }}</p>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-0.5 md:flex">
          <NuxtLink
            v-for="item in links"
            :key="item.to?.toString()"
            :to="item.to"
            class="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200"
            :class="
              isActive(item.to?.toString())
                ? 'text-primary'
                : 'text-toned hover:bg-muted/60 hover:text-highlighted'
            "
          >
            <!-- Active pill background -->
            <span
              v-if="isActive(item.to?.toString())"
              class="absolute inset-0 rounded-full bg-primary/10"
            />
            <!-- Active bottom dot -->
            <span
              v-if="isActive(item.to?.toString())"
              class="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary"
            />
            <span class="relative">{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-1.5">
          <!-- Mobile menu -->
          <Sheet v-model:open="mobileOpen">
            <SheetTrigger as-child>
              <Button
                variant="ghost"
                size="icon-sm"
                class="md:hidden"
                aria-label="Open navigation"
              >
                <UIcon name="i-lucide-menu" class="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" class="w-72">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>

              <nav class="mt-6 grid gap-1.5">
                <NuxtLink
                  v-for="item in links"
                  :key="`sheet-${item.to?.toString()}`"
                  :to="item.to"
                  class="relative rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200"
                  :class="
                    isActive(item.to?.toString())
                      ? 'bg-primary/10 text-primary'
                      : 'text-toned hover:bg-muted hover:text-highlighted'
                  "
                  @click="mobileOpen = false"
                >
                  <span
                    v-if="isActive(item.to?.toString())"
                    class="absolute left-2.5 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                  />
                  {{ item.label }}
                </NuxtLink>
              </nav>
            </SheetContent>
          </Sheet>

          <!-- Contact CTA -->
          <Button
            as-child
            variant="outline"
            size="sm"
            class="hidden bg-background/70 sm:inline-flex"
          >
            <a :href="`mailto:${siteProfile.email}`">
              <UIcon name="i-lucide-send" class="size-4" />
              Contact
            </a>
          </Button>

          <!-- Color mode toggle -->
          <ColorModeButton />
        </div>
      </div>
    </UContainer>
  </header>
</template>
