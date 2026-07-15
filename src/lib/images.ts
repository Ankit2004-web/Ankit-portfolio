/** Base path for all portfolio images served from public/image */
export const IMAGES_PATH = '/image'

export function getImageUrl(filename: string): string {
  return `${IMAGES_PATH}/${encodeURIComponent(filename)}`
}
