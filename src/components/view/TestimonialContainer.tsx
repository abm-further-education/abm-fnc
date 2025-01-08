'use client';
import React from 'react';
import Image from 'next/image';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Testimonial from './Testimonial';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { cn } from '@/utils/utils';

function TestimonialContainer({ className }: { className?: string }) {
  return (
    <div className={cn(className, `h-300 md:h-500`)}>
      <div className="absolute h-300 w-full">
        <div className="w-full h-300 md:h-500 relative object-cover md:object-center">
          <Image src="/home/testimonial_bg.png" alt="banner_image" fill />
        </div>
      </div>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        className="md:h-500 h-300"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        navigation
      >
        <SwiperSlide>
          <Testimonial
            content="What I love about ABM is how easily they teach us to learn even the difficult things. The training is intense but straightforward to follow."
            author="Felicia"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Testimonial
            content="I adore the energy and positive vibes at ABM. Even after a tiring day at work, I feel fully happy and energised being there. The teachers, especially Krissy, are fantastic."
            author="Kwansu Kim"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Testimonial
            content="I love how professional ABM trainers are, and the ABM Kitchen is amazing."
            author="Fabio Jose Pacheco Mercado"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Testimonial
            content="I am thoroughly enjoying my cooking experience at ABM Kitchen. I even had the opportunity to cook with my trainer at an ABM event which was a valuable experience."
            author="Sunghyun cho"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default TestimonialContainer;
