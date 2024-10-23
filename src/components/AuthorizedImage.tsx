import { fetchAuthorizeImage } from '@/lib/utils'
import { ImgHTMLAttributes, useEffect, useState } from 'react'

type Props = {
  fileName: string
} & ImgHTMLAttributes<HTMLImageElement>

const AuthorizedImage = ({ fileName, ...props }: Props) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    let objectUrl: string | null = null

    const fetchImage = async () => {
      objectUrl = await fetchAuthorizeImage(fileName)
      setImageUrl(objectUrl)
    }

    fetchImage()

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl) // Cleanup the object URL
      }
    }
  }, [fileName])

  return <img src={imageUrl} {...props} />
}

export default AuthorizedImage
