'use client';
import Banner from '@/components/common/Banner';
import FadeIn from '@/components/common/FadeIn';
import StepProgress from '@/components/common/StepProgress';
import Contact from '@/components/view/Contact';
import ImageTextSection from '@/components/view/ImageTextSection';
import TestimonialContainer from '@/components/view/TestimonialContainer';
import FormSteps from '@/components/view/Function/FormSteps';
import React, { useState } from 'react';
import { tinos } from '../layout';
import Divider from '@/components/common/Divider';

function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [numbers, setNumbers] = useState('');
  const [budget] = useState('');

  return (
    <div>
      <Banner
        slides={[
          {
            imgPath: '/function/function_banner.png',
            title: 'Function',
            content:
              'Where Passion Meets Culinary Perfection An Unforgettable Experience',
          },
          {
            imgPath: '/home/banner_4.png',
            title: 'Function',
            content:
              'Where Passion Meets Culinary Perfection An Unforgettable Experience',
          },
        ]}
        isNeedContactBtn
      />
      <FadeIn>
        <StepProgress
          steps={['Event Type', 'Numbers', 'Budget', 'Contact']}
          eventType={eventType}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <FormSteps
          numbers={numbers}
          eventType={eventType}
          currentStep={currentStep}
          budget={budget}
          // setBudget={setBudget}
          setCurrentStep={setCurrentStep}
          setEventType={setEventType}
          setNumbers={setNumbers}
        />
      </FadeIn>

      <div>
        <h2
          className={`${tinos.className} text-center text-2xl md:text-3xl text-secondary`}
        >
          Venue hire
        </h2>
        <Divider />
        <p
          className={`${tinos.className} text-primary text-center text-xl mb-10`}
        >
          Venue Hire: $1,500 (up to 3 hours) $300 per additional hour
        </p>
        <p className="text-white/80 text-sm text-center">
          All orders must be placed at least 2 weeks in advance.
        </p>
      </div>
      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/image_01.jpg"
          title="Iconic Function"
          content="ABM Functions and Catering redefines event experiences by intertwining culinary excellence, student development, and client satisfaction, ensuring that every event becomes an extraordinary journey of flavors, skills, and memories."
        />
      </FadeIn>
      <FadeIn>
        <ImageTextSection
          order="right"
          imgPath="/image_02.jpg"
          title="Delivering exceptional event experiences"
          content="ABM Functions and Catering specialises in providing a delectable array of culinary experiences for a variety of events. Our skilled chefs craft menus that blend creativity and taste, catering to diverse palates and dietary preferences. From elegant canapés to hearty buffet spreads, our catering services add a touch of culinary magic to your events."
        />
      </FadeIn>
      <FadeIn>
        <TestimonialContainer className="mt-30 md:mt-80" />
      </FadeIn>
      <FadeIn>
        <Contact eventType={eventType} numbers={numbers} budget={budget} />
      </FadeIn>
    </div>
  );
}

export default Page;
