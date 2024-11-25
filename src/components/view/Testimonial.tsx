import React from 'react';
import Image from 'next/image';

function Testimonial() {
  return (
    <div>
      <div className="w-full h-500 relative">
        <Image
          src="/home/testimonial_bg.png"
          alt="banner_image"
          fill
          objectFit="center"
        />
      </div>
    </div>
  );
}

export default Testimonial;
