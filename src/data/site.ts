import { profile } from './profile'

export const siteConfig = profile.site

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export const rotatingTitles = profile.rotatingTitles

export const socialLinks = [
  { label: 'GitHub', href: siteConfig.github, icon: 'github' as const },
  { label: 'LinkedIn', href: siteConfig.linkedin, icon: 'linkedin' as const },
  { label: 'Email', href: `mailto:${siteConfig.email}`, icon: 'mail' as const },
]
