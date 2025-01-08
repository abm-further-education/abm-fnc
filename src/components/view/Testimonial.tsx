import Image from 'next/image';
import React from 'react';

function Testimonial({ content, author }: { content: string; author: string }) {
  return (
    <div className="items-center justify-center flex flex-col h-full px-20 md:px-0">
      <p className="text-white text-sm text-center mb-20">{content}</p>
      <Image src="/icons/mock_user.png" alt="Logo" width={70} height={70} />
      <p className="text-primary mt-10">{author}</p>
      <p className="text-white">Customor</p>
    </div>
  );
}

export default Testimonial;
