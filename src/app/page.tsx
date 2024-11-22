import { serverClient } from '@/trpc-client/server-client';
import Image from 'next/image';

const Page = async () => {
  const user = await serverClient.getUser();

  console.log(user);

  return (
    <div>
      <div className="bg-neutral-900/20 w-full h-700 absolute z-10" />
      <div className="w-full h-700 relative">
        <Image
          src="/home/banner_1.png"
          alt="banner_image"
          fill
          objectFit="center"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-primary text-2xl pb-50">
            ABM Functions and Catering
          </h1>
          <p className="text-white pb-90">
            Where Passion Meets Culinary Perfection An Unforgettable Experience
          </p>
          <button className="border border-primary text-primary px-16 py-10">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
