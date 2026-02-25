import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const imageSchema = z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string().optional()
})

const authorSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  to: z.string().optional(),
  avatar: imageSchema.optional()
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' }),
        minRead: z.number(),
        tags: z.array(z.string()).default([]),
        author: authorSchema
      })
    })
  }
})
