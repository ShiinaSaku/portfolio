<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const route = useRoute();
const requestUrl = useRequestURL();
const siteUrl = "https://shiina.xyz";

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true,
  });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings("blog", route.path, {
    fields: ["title", "description", "date"],
  }),
);

const articleUrl = computed(() =>
  new URL(route.path, requestUrl.origin).toString(),
);

useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.title,
  description: post.value.description,
  ogDescription: post.value.description,
  ogUrl: articleUrl.value,
  ogType: "article",
  ogImage: post.value.image || `${siteUrl}/__og-image__/image${route.path}.png`,
  twitterCard: "summary_large_image",
  twitterTitle: post.value.title,
  twitterDescription: post.value.description,
  twitterImage:
    post.value.image || `${siteUrl}/__og-image__/image${route.path}.png`,
  robots: "index, follow",
});

defineOgImage({
  component: "Default",
  title: post.value.title,
  description: post.value.description,
  role: "Article",
  siteName: "shiina.xyz",
});

useHead({
  link: [{ rel: "canonical", href: articleUrl.value }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.value.title,
        description: post.value.description,
        datePublished: new Date(post.value.date).toISOString(),
        url: articleUrl.value,
        image: post.value.image
          ? `${siteUrl}${post.value.image}`
          : `${siteUrl}/__og-image__/image${route.path}.png`,
        keywords: (post.value.tags || []).join(", "),
        author: {
          "@type": "Person",
          name: "Saku Shiina",
          url: siteUrl,
        },
        publisher: {
          "@type": "Person",
          name: "Saku Shiina",
          url: siteUrl,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl.value,
        },
      }),
    },
  ],
});

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <article v-if="post" class="pb-12">
    <!-- ─── Post header card ─── -->
    <Card class="overflow-hidden p-0">
      <!-- Sky accent bar with gradient -->
      <div
        class="h-1 w-full bg-linear-to-r from-sky-400 via-sky-500 to-amber-400"
      />

      <div class="p-6 sm:p-8">
        <!-- Back link -->
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-1.5 rounded-full text-sm text-muted transition-colors hover:text-highlighted"
        >
          <UIcon name="i-lucide-arrow-left" class="size-4" />
          Back to blog
        </NuxtLink>

        <!-- Category pill -->
        <div class="mt-5 flex items-center gap-3">
          <div
            class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10"
          >
            <UIcon name="i-lucide-file-text" class="size-4 text-secondary" />
          </div>
          <p class="text-xs font-bold uppercase tracking-widest text-secondary">
            Article
          </p>
        </div>

        <!-- Title -->
        <h1
          class="mt-4 text-3xl font-bold leading-tight text-highlighted sm:text-5xl"
        >
          {{ post.title }}
        </h1>

        <!-- Description -->
        <p
          class="mt-4 max-w-3xl text-base leading-relaxed text-toned sm:text-lg"
        >
          {{ post.description }}
        </p>

        <!-- Meta row -->
        <div
          class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted"
        >
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-calendar" class="size-3.5" />
            {{ formatDate(post.date) }}
          </span>
          <span v-if="post.minRead" class="flex items-center gap-1.5">
            <span class="size-1 rounded-full bg-muted-foreground/40" />
            <UIcon name="i-lucide-clock" class="size-3.5" />
            {{ post.minRead }} min read
          </span>
        </div>

        <!-- Tags -->
        <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
          <Badge
            v-for="tag in post.tags"
            :key="tag"
            variant="secondary"
            class="text-xs"
          >
            {{ tag }}
          </Badge>
        </div>
      </div>
    </Card>

    <!-- ─── Content + sidebar ─── -->
    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_240px]">
      <!-- Article body -->
      <Card class="p-5 sm:p-8">
        <ContentRenderer
          v-if="post.body"
          :value="post"
          class="prose prose-neutral dark:prose-invert max-w-none"
        />
      </Card>

      <!-- Sidebar -->
      <aside class="space-y-4 lg:sticky lg:top-28 lg:h-fit">
        <!-- Share card -->
        <Card class="p-4">
          <p class="text-xs font-bold uppercase tracking-widest text-muted">
            Share
          </p>
          <div class="mt-3 flex flex-col gap-1">
            <Button
              as-child
              variant="ghost"
              size="sm"
              class="w-full justify-start gap-2"
            >
              <a :href="articleUrl" target="_blank" rel="noreferrer">
                <UIcon name="i-lucide-link" class="size-4" />
                Open permalink
              </a>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              class="w-full justify-start gap-2"
              @click="copyToClipboard(articleUrl, 'Article link copied')"
            >
              <UIcon name="i-lucide-copy" class="size-4" />
              Copy link
            </Button>
          </div>
        </Card>

        <!-- Prev / Next -->
        <UContentSurround v-if="surround" :surround="surround" />
      </aside>
    </div>
  </article>
</template>
