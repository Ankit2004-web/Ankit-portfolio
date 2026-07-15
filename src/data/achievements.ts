import { profile } from './profile'
import { getImageUrl } from '@/lib/images'

export const achievements = profile.achievements

export function getAchievementImageUrl(image: string): string {
  return getImageUrl(image)
}

export { certificationEntries, certifications, getCertificateUrl } from './certifications'
