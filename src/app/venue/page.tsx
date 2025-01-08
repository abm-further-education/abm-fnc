import Banner from '@/components/common/Banner';
import FadeIn from '@/components/common/FadeIn';
import ImageTextSection from '@/components/view/ImageTextSection';
import TestimonialContainer from '@/components/view/TestimonialContainer';
import React from 'react';

function page() {
  return (
    <div>
      <Banner
        imgPath="/venue/venue_banner.png"
        title="Venues"
        content="Where Passion Meets Culinary Perfection
An Unforgettable Experience"
        isNeedContactBtn
      />
      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/catering/catering_01.png"
          title="Iconic Function Venues"
          content="ABM Functions and Catering redefines event experiences by intertwining culinary excellence, student development, and client satisfaction, ensuring that every event becomes an extraordinary journey of flavors, skills, and memories."
        />
      </FadeIn>
      <FadeIn>
        <ImageTextSection
          order="right"
          imgPath="/catering/catering_01.png"
          title="Delivering exceptional event experiences"
          content="ABM Functions and Catering specialises in providing a delectable array of culinary experiences for a variety of events. Our skilled chefs craft menus that blend creativity and taste, catering to diverse palates and dietary preferences. From elegant canapés to hearty buffet spreads, our catering services add a touch of culinary magic to your events."
        />
      </FadeIn>
      <FadeIn>
        <TestimonialContainer className="mt-30 md:mt-80" />
      </FadeIn>
    </div>
  );
}

export default page;
