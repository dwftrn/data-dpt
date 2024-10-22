export const compressImage = (file: File, maxSize: number, maxKb: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Canvas context is not available'))

        const ratio = Math.min(maxSize / img.width, maxSize / img.height)
        const width = img.width * ratio
        const height = img.height * ratio

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        let quality = 0.9
        let compressedDataUrl = canvas.toDataURL('image/jpg', quality)
        while (compressedDataUrl.length / 1024 > maxKb && quality > 0.1) {
          quality -= 0.05
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
        }

        fetch(compressedDataUrl)
          .then((res) => res.blob())
          .then((blob) => resolve(blob))
          .catch((err) => reject(err))
      }

      img.onerror = () => {
        reject(new Error('Image load error'))
      }
    }

    reader.onerror = () => {
      reject(new Error('File read error'))
    }

    reader.readAsDataURL(file)
  })
}
