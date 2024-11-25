import { tinos } from '@/app/layout';
import { cn } from '@/utils/utils';
import Image from 'next/image';

export const SectionCard = ({
  imgPath,
  title,
  content,
}: {
  imgPath: string;
  title: string;
  content: string;
}) => {
  return (
    <div className="w-300 h-300 bg-cardBg flex items-center justify-center flex-col shadow-xl">
      <Image src={imgPath} alt={`unlocking_image`} width={80} height={80} />
      <h3
        className={cn(
          tinos.className,
          'text-primary text-2xl mt-20 whitespace-pre-wrap text-center'
        )}
      >
        {title}
      </h3>
      <p className="text-white max-w-200 text-center mt-16 text-sm">
        {content}
      </p>
    </div>
  );
};
