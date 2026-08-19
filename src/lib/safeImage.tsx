// components/SafeImage.tsx
'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { Link_Prefix } from '@/lib/links';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = '/placeholders/no-image.webp',
  alt,
  ...props
}: SafeImageProps) {
  const normalizeSrc = (path?: string | null) => {
    if (!path || !path.trim()) return fallbackSrc;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${Link_Prefix}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const [imgSrc, setImgSrc] = useState<string>(() => normalizeSrc(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(normalizeSrc(src));
    setHasError(false);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Visual asset'}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}