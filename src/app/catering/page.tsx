import Banner from '@/components/common/Banner';
import FadeIn from '@/components/common/FadeIn';
import Menu from '@/components/view/Catering/Menu';
import Contact from '@/components/view/Contact';
import Gallery from '@/components/view/Gallery';
import ImageTextSection from '@/components/view/ImageTextSection';
import TestimonialContainer from '@/components/view/TestimonialContainer';
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
          <div className="bg-neutral-900/30 w-full h-700 absolute z-10" />
        }
        isNeedContactBtn
      />
      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/catering/catering_01.png"
          title="Fresh bespoke menu offerings"
          content="Beyond its gastronomic prowess, ABM FNC has always
been synonymous with luxury. The restaurant's ambiance,
adorned with lavish décor and impeccable attention to detail,
creates an atmosphere of grandeur that transports guests to
a world of sophistication and refinement."
        />
      </FadeIn>
      <FadeIn>
        <ImageTextSection
          order="right"
          imgPath="/catering/catering_02.png"
          title="Catering Services"
          content="ABM Functions and Catering specialises in providing a delectable array of culinary experiences for a variety of events. Our skilled chefs craft menus that blend creativity and taste, catering to diverse palates and dietary preferences. From elegant canapés to hearty buffet spreads, our catering services add a touch of culinary magic to your events."
        />
      </FadeIn>
      <FadeIn>
        <TestimonialContainer className="mt-80" />
      </FadeIn>
      <FadeIn>
        <Menu />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
      <FadeIn>
        <Gallery />
      </FadeIn>
    </div>
  );
}

export default page;
