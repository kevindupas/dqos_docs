'use client'

import Image, { type ImageProps } from 'next/image'
import { useCountry } from '@/contexts/CountryContext'
import { useState } from 'react'

interface CountryImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
}

export function CountryImage({ src, alt, ...props }: CountryImageProps) {
  const { getImagePath } = useCountry()
  const [imageSrc, setImageSrc] = useState(getImagePath(src))
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      // Si l'image spécifique au pays n'existe pas, utiliser l'image par défaut
      const defaultPath = src.startsWith('/images/')
        ? src.replace('/images/', '/images/default/')
        : src
      setImageSrc(defaultPath)
      setHasError(true)
    }
  }

  return <Image {...props} src={imageSrc} alt={alt} onError={handleError} />
}

// Composant pour les images dans le markdown (sans Next/Image)
export function CountryImg({
  src,
  alt,
  ...props
}: React.ComponentPropsWithoutRef<'img'> & { src: string }) {
  const { getImagePath } = useCountry()
  const [imageSrc, setImageSrc] = useState(getImagePath(src))
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      // Si l'image spécifique au pays n'existe pas, utiliser l'image par défaut
      const defaultPath = src.startsWith('/images/')
        ? src.replace('/images/', '/images/default/')
        : src
      setImageSrc(defaultPath)
      setHasError(true)
    }
  }

  return <img {...props} src={imageSrc} alt={alt} onError={handleError} />
}
