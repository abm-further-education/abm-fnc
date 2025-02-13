'use client';
import React from 'react';
import Image from 'next/image';
import { montserrat, tinos } from '@/app/[locale]/layout';
import Button from './Button';
import { cn } from '@/utils/utils';

import { useParams, useRouter } from 'next/navigation';
import FadeInBottomToTop from './FadeInBottomToTop';
import { useTranslations } from 'next-intl';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';

type Props = {
  slides: { imgPath: string; title: string; content?: string }[];
  dimmed?: React.ReactNode;
  isNeedContactBtn?: boolean;
};

function Banner({ slides, dimmed, isNeedContactBtn }: Props) {
  const params = useParams();
  const router = useRouter();

  const t = useTranslations('contact');

  return (
    <div className="w-full h-screen md:h-700 relative">
      <Swiper
        navigation
        modules={[Navigation, Autoplay, Pagination, Scrollbar]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-full"
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {dimmed && dimmed}
            <Image
              src={slide.imgPath}
              alt="banner_image"
              fill
              className="md:object-center object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <h1
                className={cn(
                  `${tinos.className} text-primary text-4xl text-center drop-shadow-lg`,
                  isNeedContactBtn ? 'pb-50' : 'pb-0'
                )}
              >
                {slide.title}
              </h1>
              <FadeInBottomToTop>
                <div className="flex flex-col items-center">
                  <p
                    className={`${montserrat.className} text-white pb-90 text-center px-20 md:px-0`}
                  >
                    {slide.content}
                  </p>
                  {isNeedContactBtn && (
                    <Button
                      onClick={() => router.push(`/${params.locale}/contact`)}
                    >
                      <span>{t('title')}</span>
                    </Button>
                  )}
                </div>
              </FadeInBottomToTop>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
