import { siteProfile, socialLinks } from "./data/site";

export default defineAppConfig({
  site: {
    ...siteProfile,
    url: "https://shiina.xyz",
    title: "Saku Shiina - Web Developer",
    description:
      "Web developer crafting high-performance experiences with Next.js, React, and Rust.",
  },
  footer: {
    credits: `© ${new Date().getFullYear()} ${siteProfile.name}. Built with Nuxt.`,
    links: socialLinks.map((link: (typeof socialLinks)[number]) => ({
      icon: link.icon,
      to: link.to,
      target: link.to?.toString().startsWith("http") ? "_blank" : "_self",
      label: link.label,
    })),
  },
  ui: {
    colors: {
      primary: "amber",
      secondary: "sky",
      neutral: "stone",
    },
    button: {
      slots: {
        base: "rounded-full font-medium",
      },
    },
  },
});
