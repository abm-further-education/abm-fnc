import Banner from '@/components/common/Banner';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'ABM Further Education - Catering',
  description:
    'ABM Further Education provides accredited business, hospitality, and management courses to help students succeed in various industries.',
};

function page() {
  return (
    <div>
      <Banner
        imgPath="/home/catering_banner.png"
        title="Event Catering"
        content="Where Passion Meets Culinary Perfection
An Unforgettable Experience"
        dimmed={
          <div className="bg-neutral-900/60 w-full h-700 absolute z-10" />
        }
      />
    </div>
  );
}

export default page;
