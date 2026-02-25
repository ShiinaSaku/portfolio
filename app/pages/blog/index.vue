<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteProfile } from "~/data/site";

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").all(),
);

if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Blog posts not found",
    fatal: true,
  });
}

const featuredPost = computed(() => posts.value?.[0]);
const otherPosts = computed(() => (posts.value || []).slice(1));

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const siteUrl = "https://shiina.xyz";

useSeoMeta({
  title: "Blog",
  ogTitle: `Blog — ${siteProfile.name}`,
  description:
    "Practical notes on interface craft, engineering workflows, and product quality.",
  ogDescription: `Writing by ${siteProfile.name}`,
  ogUrl: `${siteUrl}/blog`,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: `Blog — ${siteProfile.name}`,
  twitterDescription:
    "Practical notes on interface craft, engineering workflows, and product quality.",
  robots: "index, follow",
});

defineOgImage({
  component: "Default",
  title: "Field notes on engineering craft",
  description:
    "Decisions, tradeoffs, and repeatable patterns from day-to-day product work.",
  role: "Blog",
  siteName: "shiina.xyz",
});

useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/blog` }],
});
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- ─── Page header ─── -->
    <Card class="p-6 sm:p-8">
      <div class="flex items-center gap-3">
        <div
          class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10"
        >
          <UIcon name="i-lucide-pen-line" class="size-4 text-secondary" />
        </div>
        <p class="text-xs font-bold uppercase tracking-widest text-secondary">
          Blog
        </p>
      </div>

      <h1 class="mt-3 text-4xl font-bold text-highlighted sm:text-5xl">
        Field notes on engineering craft
      </h1>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Decisions, tradeoffs, and repeatable patterns from day-to-day product
        work.
      </p>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-3.5 py-1.5 dark:border-sky-500/20 dark:bg-sky-900/20"
        >
          <UIcon
            name="i-lucide-file-text"
            class="size-3.5 text-sky-600 dark:text-sky-400"
          />
          <span class="text-xs font-semibold text-sky-700 dark:text-sky-400">
            {{ posts?.length ?? 0 }} articles
          </span>
        </div>

        <Button as-child variant="ghost" size="sm">
          <a :href="`mailto:${siteProfile.email}`">
            <UIcon name="i-lucide-mail" class="size-4" />
            Say hi
          </a>
        </Button>
      </div>
    </Card>

    <!-- ─── Featured (latest) post ─── -->
    <NuxtLink
      v-if="featuredPost"
      :to="featuredPost.path"
      class="group block overflow-hidden rounded-2xl border border-default bg-linear-to-br from-sky-50/60 via-background to-background transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-lg hover:shadow-sky-500/10 dark:from-sky-900/15 dark:to-background"
    >
      <!-- Accent bar -->
      <div
        class="h-1 w-full bg-linear-to-r from-sky-400 via-sky-500 to-amber-400"
      />

      <div class="p-6 sm:p-8">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-sky-200/70 bg-sky-50/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-600 dark:border-sky-500/20 dark:bg-sky-900/20 dark:text-sky-400"
          >
            <span class="relative flex size-1.5">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
              />
              <span
                class="relative inline-flex size-1.5 rounded-full bg-sky-500"
              />
            </span>
            Latest post
          </span>
        </div>

        <h2
          class="mt-4 text-2xl font-bold leading-snug text-highlighted transition-colors duration-200 group-hover:text-secondary sm:text-3xl"
        >
          {{ featuredPost.title }}
        </h2>
        <p class="mt-2.5 max-w-2xl text-base leading-relaxed text-toned">
          {{ featuredPost.description }}
        </p>

        <div
          class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted"
        >
          <span>{{ formatDate(featuredPost.date) }}</span>
          <span v-if="featuredPost.minRead" class="flex items-center gap-1">
            <span class="size-1 rounded-full bg-muted-foreground/50" />
            {{ featuredPost.minRead }} min read
          </span>
        </div>

        <div class="mt-4 flex flex-wrap gap-1.5">
          <Badge
            v-for="tag in featuredPost.tags || []"
            :key="tag"
            variant="secondary"
            class="text-xs"
          >
            {{ tag }}
          </Badge>
        </div>

        <div
          class="mt-5 flex translate-y-1 items-center gap-1.5 text-sm font-semibold text-secondary opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span>Read article</span>
          <UIcon name="i-lucide-arrow-right" class="size-4" />
        </div>
      </div>
    </NuxtLink>

    <!-- ─── Rest of posts ─── -->
    <Card v-if="otherPosts.length > 0" class="p-5 sm:p-6">
      <p class="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
        All articles
      </p>
      <div class="grid gap-3">
        <NuxtLink
          v-for="post in otherPosts"
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
            class="mt-2 text-xl font-semibold text-highlighted transition-colors duration-200 group-hover:text-secondary"
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

    <!-- ─── Empty state ─── -->
    <div
      v-if="!posts || posts.length === 0"
      class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default py-20 text-center"
    >
      <div
        class="flex size-14 items-center justify-center rounded-full bg-muted/60"
      >
        <UIcon name="i-lucide-file-x" class="size-7 text-muted-foreground" />
      </div>
      <p class="mt-4 font-semibold text-highlighted">No posts yet</p>
      <p class="mt-1 max-w-xs text-sm text-muted">
        Check back soon — writing is on the way.
      </p>
    </div>
  </div>
</template>
