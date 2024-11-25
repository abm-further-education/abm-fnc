import React from 'react';
import Image from 'next/image';
import { montserrat, tinos } from '@/app/layout';
import Button from './Button';

type Props = {
  imgPath: string;
  title: string;
  content: string;
  dimmed?: React.ReactNode;
};

function Banner({ imgPath, title, content, dimmed }: Props) {
  return (
    <div className="w-full h-700 relative">
      {dimmed && dimmed}
      <Image src={imgPath} alt="banner_image" fill objectFit="center" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1 className={`${tinos.className} text-primary text-4xl pb-50`}>
          {title}
        </h1>
        <p className={`${montserrat.className} text-white pb-90`}>{content}</p>
        <Button>
          <span>Contact Us</span>
        </Button>
      </div>
    </div>
  );
}

export default Banner;
