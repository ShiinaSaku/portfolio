<script setup lang="ts">
import { Button } from '@/components/ui/button'

const colorMode = useColorMode()

const nextTheme = computed(() => colorMode.value === 'dark' ? 'light' : 'dark')

function toggleTheme() {
  colorMode.preference = nextTheme.value
}

function onClick(event: MouseEvent) {
  if (!document.startViewTransition) {
    toggleTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    toggleTheme()
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 520,
        easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <ClientOnly>
    <Button
      :aria-label="`Switch to ${nextTheme} mode`"
      variant="ghost"
      size="icon-sm"
      class="rounded-full"
      @click="onClick"
    >
      <UIcon
        :name="`i-lucide-${nextTheme === 'dark' ? 'moon' : 'sun'}`"
        class="size-4"
      />
    </Button>
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 1;
}
</style>
