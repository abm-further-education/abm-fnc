'use client';
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Lightbox } from 'react-modal-image';

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const breakpointColumns = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="p-5 w-full">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-6 h-1000 overflow-hidden"
        columnClassName="space-y-6"
      >
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden shadow-md">
            <img
              src={src}
              alt={`Image ${index}`}
              className="cursor-pointer object-cover w-full hover:scale-105 transition-transform duration-300"
              onClick={() => handleImageClick(src)}
            />
          </div>
        ))}
        {open && (
          <Lightbox
            small={selectedImage}
            large={selectedImage}
            alt="Example Image"
            hideDownload={true}
            hideZoom={true}
            onClose={() => setOpen(false)}
          />
        )}
      </Masonry>
    </div>
  );
};

export default Gallery;

const images = [
  '/home/our_menu.png',
  '/home/catering_1.jpg',
  '/home/catering_2.jpg',
  '/home/food_1.png',
  '/home/food_2.png',
  '/home/food_3.png',
  '/home/food_4.png',
  '/home/food_5.jpg',
];
