import type { NavigationMenuItem } from '@nuxt/ui'

export const siteProfile = {
  name: 'Saku Shiina',
  japaneseName: '椎名 さく',
  role: 'Web Developer',
  headline: 'Fast, elegant product experiences with durable engineering.',
  bio: 'I build calm interfaces and resilient systems across TypeScript, Next.js, React, Rust, Go, and Kotlin.',
  shortBio: 'Web developer focused on high-performance interfaces and maintainable systems.',
  email: 'sakushiina@proton.me',
  telegram: 'https://t.me/shiinadesu',
  github: 'https://github.com/shiinasaku',
  location: 'Remote, UTC+8'
}

export const socialLinks = [
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: siteProfile.github
  },
  {
    label: 'Telegram',
    icon: 'i-simple-icons-telegram',
    to: siteProfile.telegram
  },
  {
    label: 'Email',
    icon: 'i-lucide-mail',
    to: `mailto:${siteProfile.email}`
  }
] satisfies NavigationMenuItem[]

export const stack = [
  'TypeScript',
  'Nuxt',
  'Next.js',
  'React',
  'Rust',
  'Go',
  'Kotlin',
  'Design Systems',
  'Performance',
  'DX Tooling'
]

export const principles = [
  {
    title: 'Clarity Over Noise',
    description: 'Interfaces should feel calm at first glance, even for complex workflows.',
    icon: 'i-lucide-eye'
  },
  {
    title: 'Performance Is Product',
    description: 'Speed, responsiveness, and reliability are part of user experience, not afterthoughts.',
    icon: 'i-lucide-zap'
  },
  {
    title: 'Durable Craft',
    description: 'I prioritize architectures and naming that teams can maintain without heroic effort.',
    icon: 'i-lucide-hammer'
  }
]

export const navLinks = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Friends',
    to: '/friends'
  },
  {
    label: 'Blog',
    to: '/blog'
  }
] satisfies NavigationMenuItem[]
