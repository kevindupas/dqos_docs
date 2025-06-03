// src/components/CountryImage.tsx - Version avec debug
'use client'

import Image, { type ImageProps } from 'next/image'
import { useCountryLanguage } from '@/contexts/CountryLanguageContext'
import { useState } from 'react'

interface CountryImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
}

export function CountryImage({ src, alt, ...props }: CountryImageProps) {
  const { getImagePath } = useCountryLanguage()
  const [imageSrc, setImageSrc] = useState(getImagePath(src))
  const [hasError, setHasError] = useState(false)

  console.log('CountryImage:', { original: src, transformed: imageSrc })

  const handleError = () => {
    if (!hasError) {
      const defaultPath = src.startsWith('/images/')
        ? src.replace('/images/', '/images/default/')
        : src
      console.log('Image error, fallback to:', defaultPath)
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
  const { getImagePath } = useCountryLanguage()
  const [imageSrc, setImageSrc] = useState(getImagePath(src))
  const [hasError, setHasError] = useState(false)

  console.log('CountryImg:', { original: src, transformed: imageSrc })

  const handleError = () => {
    if (!hasError) {
      const defaultPath = src.startsWith('/images/')
        ? src.replace('/images/', '/images/default/')
        : src
      console.log('Image error, fallback to:', defaultPath)
      setImageSrc(defaultPath)
      setHasError(true)
    }
  }

  return <img {...props} src={imageSrc} alt={alt} onError={handleError} />
}
