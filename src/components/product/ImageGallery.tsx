'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // If no images provided, use placeholder
  const imageList = images.length > 0 ? images : ['/products/placeholder.jpg'];

  return (
    <div className="flex flex-col">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Image
          src={imageList[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          className="object-cover object-center"
          priority
        />
        
        {/* Share button */}
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          aria-label="Share product"
          title="Share product"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: productName,
                url: window.location.href,
              });
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Images */}
      {imageList.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              aria-label={`View image ${index + 1} of ${productName}`}
              title={`View image ${index + 1}`}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-orange-500' : 'ring-1 ring-gray-200'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
