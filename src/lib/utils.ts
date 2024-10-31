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

export function areArraysEqual<T extends Record<string, unknown>>(arr1: T[], arr2: T[]): boolean {
  // Check if arrays have the same length
  if (arr1.length !== arr2.length) {
    return false
  }

  // Sort arrays to ensure consistent comparison
  const sortedArr1 = [...arr1].sort((a, b) => (JSON.stringify(a) > JSON.stringify(b) ? 1 : -1))
  const sortedArr2 = [...arr2].sort((a, b) => (JSON.stringify(a) > JSON.stringify(b) ? 1 : -1))

  // Compare each object in the arrays
  return sortedArr1.every((obj, index) => {
    const obj2 = sortedArr2[index]
    return Object.keys(obj).every((key) => JSON.stringify(obj[key]) === JSON.stringify(obj2[key]))
  })
}
