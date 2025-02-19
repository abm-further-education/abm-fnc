'use client';
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handlePrev = () => {
    setImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setSelectedImage(images[(imageIndex - 1 + images.length) % images.length]);
  };

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[(imageIndex + 1) % images.length]);
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
        className="flex gap-6 h-max overflow-hidden"
        columnClassName="space-y-6"
      >
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden shadow-md">
            <Image
              width={300}
              height={300}
              src={src}
              alt={`Image ${index}`}
              className="cursor-pointer object-cover w-full hover:scale-105 transition-transform duration-300"
              onClick={() => handleImageClick(src)}
            />
          </div>
        ))}
      </Masonry>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-75">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-12 right-12 text-white rounded-full"
          >
            <X />
          </button>
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen"
            />
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-50 transform -translate-y-1/2 p-2 text-white rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-50 transform -translate-y-1/2 p-2 text-white rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;

const images = [
  '/home/dreamyway_01.jpg',
  '/home/food_7.jpeg',
  '/home/dreamyway_02.jpg',
  '/home/food_8.jpeg',
  '/home/dreamyway_03.jpg',
  '/home/food_9.jpeg',
  '/home/food_10.jpeg',
  '/home/dreamyway_04.jpg',
  '/home/food_4.png',
  '/home/dreamyway_05.jpg',
  '/home/food_11.jpeg',
  '/home/food_12.jpeg',
  '/home/food_3.png',
  '/home/food_6.jpg',
  '/home/food_13.png',
];
