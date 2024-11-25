import React from 'react';
import Image from 'next/image';

function Divider() {
  return (
    <div className="mx-auto flex justify-center items-center gap-10 my-16">
      <div className="w-100 h-2 bg-secondary" />
      <Image src="/icons/diamond.svg" alt="diamond" width={16} height={16} />
      <div className="w-100 h-2 bg-secondary" />
    </div>
  );
}

export default Divider;
