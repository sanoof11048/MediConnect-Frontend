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
  skeletonHeight = 100,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative bg-transparent ">
      {!isLoaded && (
        <div
          className="bg-gray-200 animate-pulse absolute inset-0 rounded-2xl"
          style={{ height: skeletonHeight }}
        />
      )}
      <LazyLoadImage
        src={src}
        alt={alt}
        afterLoad={() => setIsLoaded(true)}
        effect="blur"
        className={`${className} ${!isLoaded ? 'invisible' : 'visible'} object-cover block `}
      />
    </div>
  );
};

export default LazyImage;
