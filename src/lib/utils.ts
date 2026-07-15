import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
