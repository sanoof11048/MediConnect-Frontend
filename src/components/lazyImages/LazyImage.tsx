import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  skeletonHeight?: number;
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  skeletonHeight = 300,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ height: skeletonHeight }}
    >
      {!isLoaded && (
        <div className="skeleton-shimmer" style={{ height: skeletonHeight }} />
      )}
      <LazyLoadImage
        src={src}
        alt={alt}
        afterLoad={() => setIsLoaded(true)}
        effect="blur"
        className={`${className} ${!isLoaded ? 'invisible' : 'visible'} w-full h-full object-cover`}
        height={skeletonHeight}
      />
    </div>
  );
};

export default LazyImage;
