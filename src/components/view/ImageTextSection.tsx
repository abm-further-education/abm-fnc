import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/utils';
import { tinos } from '@/app/layout';

type Props = {
  title: string;
  content: string;
  imgPath: string;
  order?: 'left' | 'right';
  className?: string;
  haveButton?: React.ReactNode;
};

function ImageTextSection({
  title,
  content,
  imgPath,
  order,
  className,
  haveButton,
}: Props) {
  return (
    <div
      className={cn(
        'flex-col md:flex-row flex items-center justify-center mt-120 gap-40 max-w-1000 mx-auto',
        className
      )}
    >
      <div
        className={cn(
          order === 'left' ? 'order-1' : 'order-2',
          'w-400 h-400 relative'
        )}
      >
        <Image
          src={imgPath}
          alt={`${title}_image`}
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div
        className={cn(order === 'right' ? 'order-1' : 'order-2', 'max-w-450')}
      >
        <h2 className={cn(tinos.className, 'text-xl text-primary')}>{title}</h2>
        <p className={cn('text-white text-sm mt-20 whitespace-pre-wrap')}>
          {content}
        </p>
        {haveButton && haveButton}
      </div>
    </div>
  );
}

export default ImageTextSection;
