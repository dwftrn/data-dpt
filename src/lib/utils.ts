import { getToken } from '@/api'
import { BASE_URL } from '@/api/endpoints'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchAuthorizeImage(fileName: string): Promise<string> {
  const imageUrlEndpoint = BASE_URL + '/download/' + fileName

  try {
    const response = await fetch(imageUrlEndpoint, {
      headers: { Authorization: getToken() }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error loading image:', error)
    return ''
  }
}
