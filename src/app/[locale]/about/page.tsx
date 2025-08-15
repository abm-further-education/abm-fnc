import Banner from '@/components/common/Banner';
import FadeIn from '@/components/common/FadeIn';
import PaymentContainer from '@/components/common/PaymentContainer';
import ImageTextSection from '@/components/view/ImageTextSection';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'ABM Further Education - About',
  description: 'Welcome to ABM Functions and Catering',
};

function page() {
  return (
    <div className="mb-40 md:mb-80">
      <Banner
        slides={[
          {
            imgPath: '/about/about_banner.png',
            title: 'About Us',
          },
        ]}
      />
      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/image_03.jpg"
          title="Welcome to ABM Functions and Catering"
          content="Are you planning a special event or gathering? Look no further! ABM Functions and Catering is here to make your event a memorable one. As an affiliate of ABM Further Education, we take pride in providing exceptional service while also nurturing the talents and skills of our students."
        />
      </FadeIn>

      <FadeIn>
        <ImageTextSection
          order="right"
          imgPath="/image_04.jpg"
          title="A Fusion of Excellence and Learning"
          content="When you choose ABM Functions and Catering for your event, you get more than just a catering service. Our team of talented students, guided by experienced professionals, will create a perfect blend of excellent food, flawless service, and a delightful ambiance."
        />
      </FadeIn>

      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/image_01.jpg"
          title="Unleash Your Imagination"
          content="Your event should reflect your unique vision and style. At ABM Functions and Catering, we believe in turning your dreams into reality. Whether you’re hosting a wedding reception, a corporate gala, or an intimate birthday party, our team will work closely with you to understand your preferences and execute them flawlessly."
        />
      </FadeIn>
      <PaymentContainer />
    </div>
  );
}

export default page;
