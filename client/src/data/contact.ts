// Contact info — environment-variable-overridable
// Usage: VITE_CONTACT_EMAIL=... npm run build
export const CONTACT = {
  email: (import.meta.env as Record<string, string>).VITE_CONTACT_EMAIL ?? "mathew.rohit.thomson@gmail.com",
  phone: (import.meta.env as Record<string, string>).VITE_CONTACT_PHONE ?? "+1 (412) 214-2233",
  location: "Virginia, USA",
  github: "https://github.com/mrohitth",
  linkedin: "https://www.linkedin.com/in/mrohitth/",
  twitter: "https://twitter.com/mrohitth",
  instagram: "https://instagram.com/mrohitth",
} as const;

export type ContactKey = keyof typeof CONTACT;