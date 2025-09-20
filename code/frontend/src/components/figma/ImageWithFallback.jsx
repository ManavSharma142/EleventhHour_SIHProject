import React, { useState } from 'react';

export function ImageWithFallback({
  src,
  fallback = 'https://via.placeholder.com/800x600?text=Flexora',
  alt,
  className = '',
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
}
