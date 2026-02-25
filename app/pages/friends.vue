<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { friends } from "~/data/friends";
import { siteProfile } from "~/data/site";

const search = ref("");
const mode = ref<"all" | "website" | "telegram">("all");

const filteredFriends = computed(() => {
  const q = search.value.trim().toLowerCase();

  return friends.filter((friend) => {
    const matchesSearch =
      q.length === 0 ||
      friend.name.toLowerCase().includes(q) ||
      friend.title.toLowerCase().includes(q) ||
      friend.username?.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (mode.value === "website") return Boolean(friend.website);
    if (mode.value === "telegram") return Boolean(friend.username);
    return true;
  });
});

const websiteCount = computed(
  () => friends.filter((friend) => Boolean(friend.website)).length,
);

function destination(friend: (typeof friends)[number]) {
  if (friend.website) return friend.website;
  return friend.username
    ? `https://t.me/${friend.username}`
    : siteProfile.telegram;
}

function destinationLabel(friend: (typeof friends)[number]) {
  return friend.website ? "Website" : "Telegram";
}

useSeoMeta({
  title: "Friends",
  description: "A curated list of kind and talented friends on the internet.",
  ogDescription: "A curated list of kind and talented friends on the internet.",
});
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- ─── Page header ─── -->
    <Card class="p-6 sm:p-8">
      <div class="flex items-center gap-3">
        <div
          class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
        >
          <UIcon name="i-lucide-heart" class="size-4 text-primary" />
        </div>
        <p class="text-xs font-bold uppercase tracking-widest text-primary">
          Friends
        </p>
      </div>

      <h1 class="mt-3 text-4xl font-bold text-highlighted sm:text-5xl">
        Amazing people I know
      </h1>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        A curated set of thoughtful builders, artists, and internet friends that
        constantly inspire my own work.
      </p>

      <!-- Stats badges -->
      <div class="mt-6 flex flex-wrap gap-2.5">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-amber-50/80 px-3.5 py-1.5 dark:border-amber-500/20 dark:bg-amber-900/20"
        >
          <UIcon
            name="i-lucide-users"
            class="size-3.5 text-amber-600 dark:text-amber-400"
          />
          <span
            class="text-xs font-semibold text-amber-700 dark:text-amber-400"
          >
            {{ friends.length }} friends total
          </span>
        </div>
        <div
          class="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-3.5 py-1.5 dark:border-sky-500/20 dark:bg-sky-900/20"
        >
          <UIcon
            name="i-lucide-globe"
            class="size-3.5 text-sky-600 dark:text-sky-400"
          />
          <span class="text-xs font-semibold text-sky-700 dark:text-sky-400">
            {{ websiteCount }} personal sites
          </span>
        </div>
      </div>
    </Card>

    <!-- ─── Filter / search bar ─── -->
    <Card class="p-5 sm:p-6">
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Search input -->
        <div class="relative w-full sm:max-w-sm">
          <UIcon
            name="i-lucide-search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            v-model="search"
            placeholder="Search by name, title, or username…"
            class="pl-9"
          />
        </div>

        <!-- Tab filter -->
        <Tabs v-model:model-value="mode">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="website">Websites</TabsTrigger>
            <TabsTrigger value="telegram">Telegram</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <!-- Results count -->
      <p class="mt-4 text-xs text-muted">
        Showing
        <span class="font-semibold text-highlighted">{{
          filteredFriends.length
        }}</span>
        of {{ friends.length }} friends
      </p>

      <!-- Friends grid -->
      <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <a
          v-for="friend in filteredFriends"
          :key="friend.id"
          :href="destination(friend)"
          target="_blank"
          rel="noreferrer"
          class="friend-card group"
        >
          <div class="flex items-center gap-3">
            <Avatar
              class="size-12 rounded-xl ring-2 ring-transparent transition-all duration-200 group-hover:ring-primary/30"
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
                {{ friend.username ? `@${friend.username}` : "No username" }}
              </p>
            </div>
          </div>

          <p class="mt-3 line-clamp-1 text-sm text-toned">
            {{ friend.title }}
          </p>

          <div
            class="mt-4 inline-flex translate-y-1 items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <span>{{ destinationLabel(friend) }}</span>
            <UIcon name="i-lucide-arrow-up-right" class="size-4" />
          </div>
        </a>
      </div>

      <!-- Empty state -->
      <div
        v-if="filteredFriends.length === 0"
        class="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-default px-6 py-14 text-center"
      >
        <div
          class="flex size-12 items-center justify-center rounded-full bg-muted/60"
        >
          <UIcon
            name="i-lucide-search-x"
            class="size-6 text-muted-foreground"
          />
        </div>
        <p class="mt-4 font-semibold text-highlighted">No friends found</p>
        <p class="mt-1 max-w-xs text-sm text-muted">
          No results matched your search. Try a different name or clear the
          filters.
        </p>
        <Button
          variant="outline"
          size="sm"
          class="mt-5"
          @click="
            search = '';
            mode = 'all';
          "
        >
          <UIcon name="i-lucide-x" class="mr-1.5 size-3.5" />
          Reset filters
        </Button>
      </div>
    </Card>
  </div>
</template>
