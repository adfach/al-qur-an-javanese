import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}j ${minutes}m ${secs}d`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}d`;
  }
  return `${secs}d`;
}

export function toArabicNumber(num: number): string {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => arabicNumbers[parseInt(d)]).join('');
}

export function downloadTextFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function shareToSocialMedia(
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'threads' | 'instagram',
  text: string,
  url?: string
) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = url ? encodeURIComponent(url) : '';

  const shareUrls: Record<string, string> = {
    whatsapp: `https://wa.me/?text=${encodedText}${encodedUrl ? `%20${encodedUrl}` : ''}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}${encodedUrl ? `&url=${encodedUrl}` : ''}`,
    threads: `https://threads.net/intent/post?text=${encodedText}`,
    instagram: `https://www.instagram.com/`,
  };

  window.open(shareUrls[platform], '_blank', 'width=600,height=400');
}
