import Banner from '@/components/common/Banner';
import Contact from '@/components/view/Contact';
import React from 'react';

function page() {
  return (
    <div>
      <Banner
        slides={[
          {
            imgPath: '/contact/contact_banner.png',
            title: 'Contact Us',
          },
        ]}
      />
      <Contact />
    </div>
  );
}

export default page;
