export default function imageLoader({ src, width, quality }: {
  src: string
  width: number
  quality?: number
}) {
  // For static export, return the image as-is
  // In production, you might want to use a CDN or image optimization service
  return src
}