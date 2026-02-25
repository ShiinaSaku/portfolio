<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { friends } from "~/data/friends";
import { principles, siteProfile, socialLinks, stack } from "~/data/site";

const featuredFriends = computed(() => friends.slice(0, 6));

const { data: posts } = await useAsyncData("home-posts", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all(),
);

const siteUrl = "https://shiina.xyz";

useSeoMeta({
  title: "Home",
  ogTitle: `${siteProfile.name} — ${siteProfile.role}`,
  description:
    "Personal website of Saku Shiina, web developer focused on speed, quality, and durable product engineering.",
  ogDescription:
    "Personal website of Saku Shiina, web developer focused on speed, quality, and durable product engineering.",
  ogUrl: siteUrl,
  ogType: "website",
  ogImage: `${siteUrl}/api/og?title=${encodeURIComponent(siteProfile.name)}&description=${encodeURIComponent(siteProfile.headline)}`,
  twitterCard: "summary_large_image",
  twitterTitle: `${siteProfile.name} — ${siteProfile.role}`,
  twitterDescription: siteProfile.bio,
  robots: "index, follow",
});

defineOgImage({
  component: "Default",
  title: siteProfile.name,
  description: siteProfile.headline,
  role: siteProfile.role,
  siteName: "shiina.xyz",
});

useHead({
  link: [{ rel: "canonical", href: siteUrl }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteProfile.name,
        url: siteUrl,
        sameAs: [siteProfile.github, siteProfile.telegram],
        jobTitle: siteProfile.role,
        description: siteProfile.bio,
        knowsAbout: stack,
        image: `${siteUrl}/avatar.png`,
        email: siteProfile.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteProfile.location,
        },
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteProfile.name,
        url: siteUrl,
        description: siteProfile.bio,
        author: {
          "@type": "Person",
          name: siteProfile.name,
        },
      }),
    },
  ],
});

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function friendDestination(username: string | null, website?: string) {
  if (website) return website;
  return username ? `https://t.me/${username}` : siteProfile.telegram;
}

const principleIconClasses = [
  "principle-icon-amber",
  "principle-icon-sky",
  "principle-icon-violet",
];
</script>

<template>
  <div class="space-y-16 pb-12 sm:space-y-20">
    <!-- ═══════════════════════════════════
         HERO
    ═══════════════════════════════════ -->
    <section
      class="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-12"
    >
      <!-- Left: Main intro -->
      <Motion
        :initial="{ opacity: 0, y: 32 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        <div class="space-y-7 pt-1">
          <!-- Animated availability badge -->
          <div
            class="inline-flex items-center gap-2.5 rounded-full border border-amber-300/60 bg-amber-50/80 px-4 py-2 dark:border-amber-500/25 dark:bg-amber-900/20"
          >
            <span class="relative flex size-2.5">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"
              />
              <span
                class="relative inline-flex size-2.5 rounded-full bg-amber-500"
              />
            </span>
            <span
              class="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400"
            >
              {{ siteProfile.role }}
            </span>
          </div>

          <!-- Name + Japanese -->
          <div>
            <h1
              class="text-6xl font-bold leading-[1.04] tracking-tight sm:text-7xl xl:text-[5.25rem]"
            >
              <span class="text-gradient-name">{{ siteProfile.name }}</span>
            </h1>
            <p class="mt-2.5 text-sm tracking-[0.2em] text-muted" lang="ja">
              {{ siteProfile.japaneseName }}
            </p>
          </div>

          <!-- Headline + bio -->
          <div class="space-y-3">
            <p
              class="max-w-lg text-xl font-semibold leading-snug text-toned sm:text-2xl"
            >
              {{ siteProfile.headline }}
            </p>
            <p class="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {{ siteProfile.bio }}
            </p>
          </div>

          <!-- CTA buttons -->
          <div class="flex flex-wrap items-center gap-3">
            <Button as-child class="gap-2 px-5 shadow-lg shadow-amber-500/20">
              <a :href="`mailto:${siteProfile.email}`">
                <UIcon name="i-lucide-send" class="size-4" />
                Work with me
              </a>
            </Button>
            <Button as-child variant="outline" class="px-5">
              <NuxtLink to="/blog">Read writing</NuxtLink>
            </Button>
            <Button as-child variant="ghost">
              <NuxtLink to="/friends">Meet friends</NuxtLink>
            </Button>
          </div>

          <!-- Social links, visually separated -->
          <div
            class="flex flex-wrap items-center gap-1.5 border-t border-default pt-5"
          >
            <Button
              v-for="item in socialLinks"
              :key="item.label"
              as-child
              variant="ghost"
              size="sm"
            >
              <a
                :href="item.to.toString()"
                target="_blank"
                rel="noreferrer"
                class="gap-2 text-muted hover:text-highlighted"
              >
                <UIcon :name="item.icon" class="size-4" />
                {{ item.label }}
              </a>
            </Button>
          </div>
        </div>
      </Motion>

      <!-- Right: Profile card -->
      <Motion
        :initial="{ opacity: 0, scale: 0.94, y: 20 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :transition="{ duration: 0.65, delay: 0.15 }"
      >
        <Card class="overflow-hidden p-6 sm:p-8">
          <!-- Avatar with ambient glow -->
          <div class="avatar-glow-wrap mx-auto w-fit">
            <div class="avatar-ambient-glow" />
            <NuxtImg
              src="/avatar.png"
              width="220"
              height="220"
              alt="Saku Shiina avatar"
              class="relative z-10 size-32 rounded-xl border border-default/50 object-cover shadow-xl sm:size-36"
            />
            <!-- Online status dot -->
            <span
              class="absolute -bottom-1 -right-1 z-20 flex size-5 items-center justify-center rounded-full border-2 border-background bg-emerald-400 shadow"
            >
              <span class="size-2 animate-pulse rounded-full bg-emerald-200" />
            </span>
          </div>

          <!-- Stats grid -->
          <div class="mt-6 grid gap-2.5 sm:grid-cols-2">
            <div class="stat-card">
              <p
                class="text-xs font-semibold uppercase tracking-wide text-muted"
              >
                Focus
              </p>
              <p class="mt-1 text-sm font-semibold text-highlighted">
                Fast UX + solid architecture
              </p>
            </div>
            <div class="stat-card">
              <p
                class="text-xs font-semibold uppercase tracking-wide text-muted"
              >
                Location
              </p>
              <p class="mt-1 text-sm font-semibold text-highlighted">
                {{ siteProfile.location }}
              </p>
            </div>
            <div class="stat-card sm:col-span-2">
              <p
                class="text-xs font-semibold uppercase tracking-wide text-muted"
              >
                Current note
              </p>
              <p
                class="mt-1 text-sm font-semibold leading-relaxed text-highlighted"
              >
                Designing calm product interfaces with stronger technical
                foundations.
              </p>
            </div>
          </div>
        </Card>
      </Motion>
    </section>

    <!-- ═══════════════════════════════════
         PRINCIPLES + STACK
    ═══════════════════════════════════ -->
    <section class="grid gap-6 lg:grid-cols-2">
      <!-- Engineering principles -->
      <Card class="p-6 sm:p-8">
        <div class="flex items-center gap-3">
          <div
            class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
          >
            <UIcon name="i-lucide-compass" class="size-4 text-primary" />
          </div>
          <p class="text-xs font-bold uppercase tracking-widest text-primary">
            Engineering principles
          </p>
        </div>

        <div class="mt-6 flex flex-col gap-3">
          <div
            v-for="(item, index) in principles"
            :key="item.title"
            class="principle-card stagger-in"
            :style="{ animationDelay: `${index * 110}ms` }"
          >
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-lg"
              :class="principleIconClasses[index]"
            >
              <UIcon :name="item.icon" class="size-5" />
            </div>
            <div>
              <p class="font-semibold text-highlighted">{{ item.title }}</p>
              <p class="mt-1 text-sm leading-relaxed text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Stack & craft -->
      <Card class="p-6 sm:p-8">
        <div class="flex items-center gap-3">
          <div
            class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10"
          >
            <UIcon name="i-lucide-layers" class="size-4 text-secondary" />
          </div>
          <p class="text-xs font-bold uppercase tracking-widest text-secondary">
            Stack & craft
          </p>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">
          <Badge
            v-for="tech in stack"
            :key="tech"
            variant="secondary"
            class="cursor-default rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            {{ tech }}
          </Badge>
        </div>

        <div class="mt-6 rounded-lg border border-dashed border-default p-4">
          <p class="text-sm leading-relaxed text-muted">
            Optimizing for
            <span class="font-semibold text-primary">maintainability</span>
            and
            <span class="font-semibold text-secondary">team velocity</span>, not
            just shipping speed.
          </p>
        </div>
      </Card>
    </section>

    <!-- ═══════════════════════════════════
         FRIENDS SPOTLIGHT
    ═══════════════════════════════════ -->
    <Card class="p-6 sm:p-8">
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <div class="flex items-center gap-3">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
            >
              <UIcon name="i-lucide-users" class="size-4 text-primary" />
            </div>
            <p class="text-xs font-bold uppercase tracking-widest text-primary">
              Friends spotlight
            </p>
          </div>
          <h2 class="mt-3 text-3xl font-bold text-highlighted sm:text-4xl">
            People I learn from
          </h2>
          <p class="mt-2 max-w-xl text-muted">
            Designers and developers whose craft and perspective keep me sharp.
          </p>
        </div>

        <Button as-child variant="ghost" class="self-start">
          <NuxtLink to="/friends">
            View all
            <UIcon name="i-lucide-arrow-right" class="ml-1 size-4" />
          </NuxtLink>
        </Button>
      </div>

      <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="friend in featuredFriends"
          :key="friend.id"
          :href="friendDestination(friend.username, friend.website)"
          target="_blank"
          rel="noreferrer"
          class="friend-card group"
        >
          <div class="flex items-center gap-3">
            <Avatar
              class="size-11 rounded-lg ring-2 ring-transparent transition-all duration-200 group-hover:ring-primary/30"
            >
              <AvatarImage
                :src="friend.avatar"
                :alt="`${friend.name} avatar`"
              />
              <AvatarFallback>{{ friend.name.slice(0, 1) }}</AvatarFallback>
            </Avatar>
            <div class="min-w-0">
              <p class="truncate font-semibold text-highlighted">
                {{ friend.name }}
              </p>
              <p class="truncate text-xs text-muted">
                {{
                  friend.username ? `@${friend.username}` : "Community friend"
                }}
              </p>
            </div>
          </div>
          <p class="mt-2.5 line-clamp-1 text-sm text-toned">
            {{ friend.title }}
          </p>
          <div
            class="mt-3 flex translate-y-1 items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <span>Visit</span>
            <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
          </div>
        </a>
      </div>
    </Card>

    <!-- ═══════════════════════════════════
         LATEST WRITING
    ═══════════════════════════════════ -->
    <Card class="p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10"
            >
              <UIcon name="i-lucide-pen-line" class="size-4 text-secondary" />
            </div>
            <p
              class="text-xs font-bold uppercase tracking-widest text-secondary"
            >
              Writing
            </p>
          </div>
          <h2 class="mt-3 text-3xl font-bold text-highlighted sm:text-4xl">
            Latest notes
          </h2>
        </div>

        <Button as-child variant="ghost" class="shrink-0">
          <NuxtLink to="/blog">
            All posts
            <UIcon name="i-lucide-arrow-right" class="ml-1 size-4" />
          </NuxtLink>
        </Button>
      </div>

      <div class="mt-8 grid gap-4">
        <NuxtLink
          v-for="post in posts || []"
          :key="post.path"
          :to="post.path"
          class="blog-card group"
        >
          <div
            class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted"
          >
            <span>{{ formatDate(post.date) }}</span>
            <span v-if="post.minRead"
              >&middot; {{ post.minRead }} min read</span
            >
          </div>
          <h3
            class="mt-2 text-xl font-semibold text-highlighted transition-colors duration-200 group-hover:text-secondary sm:text-2xl"
          >
            {{ post.title }}
          </h3>
          <p class="mt-1.5 text-sm leading-relaxed text-toned">
            {{ post.description }}
          </p>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <Badge
              v-for="tag in post.tags || []"
              :key="`${post.path}-${tag}`"
              variant="secondary"
              class="text-xs"
            >
              {{ tag }}
            </Badge>
          </div>
        </NuxtLink>
      </div>
    </Card>
  </div>
</template>
