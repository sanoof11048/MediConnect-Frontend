import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';


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
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      className={className}
      placeholderSrc=""
      height={skeletonHeight}
      style={{ }}
    />
  );
};

export default LazyImage;
