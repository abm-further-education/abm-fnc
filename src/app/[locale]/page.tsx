import { montserrat, tinos } from './layout';
import ImageTextSection from '@/components/view/ImageTextSection';
import FadeIn from '@/components/common/FadeIn';
import { cn } from '@/utils/utils';
import Button from '@/components/common/Button';
import Gallery from '@/components/view/Gallery';
import { Metadata } from 'next';
import Testimonial from '@/components/view/TestimonialContainer';
import Contact from '@/components/view/Contact';
import Banner from '@/components/common/Banner';
import Image from 'next/image';
import { SectionCard } from '@/components/view/SectionCard';
import { useTranslations } from 'next-intl';
import PaymentContainer from '@/components/common/PaymentContainer';

export const metadata: Metadata = {
  title: 'ABM Further Education',
  description:
    'ABM Further Education provides accredited business, hospitality, and management courses to help students succeed in various industries.',
};

const Page = () => {
  const t = useTranslations('HomePage');
  const cateringT = useTranslations('catering');

  return (
    <div>
      <Banner
        imgPath="/home/banner_1.png"
        title="ABM Functions and Catering"
        content={t('bannerContent')}
        dimmed={
          <div className="bg-neutral-900/20 w-full h-screen md:h-700 absolute z-10" />
        }
        isNeedContactBtn
      />
      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/home/catering_1.jpg"
          title="Catering Services"
          content={cateringT('service')}
        />
      </FadeIn>
      <FadeIn>
        <ImageTextSection
          order="right"
          imgPath="/home/catering_2.jpg"
          title="ABM Kitchen Hosted Functions"
          content="Our unique offering includes hosting events within the state-of-the-art ABM Kitchen facilities. Clients can choose to organise interactive cooking workshops, food tasting sessions, or intimate chef's table dinners, all set in the professional environment of our kitchen. This immersive experience offers an inside look at culinary artistry."
        />
      </FadeIn>
      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/home/student_led.jpg"
          title="Student-Led Services"
          content="One of our distinctive features is the involvement of ABM Further Education students in various capacities. Under the guidance of industry experts, students actively participate in the planning, preparation, and execution of events. From menu design to decor setup, students gain hands-on experience, fostering their growth as future professionals."
        />
      </FadeIn>

      <FadeIn>
        <section className="relative">
          <div className="w-full h-200 mb-20 md:mb-0 md:h-400 relative mt-120">
            <Image
              src="/home/unlocking_bg.png"
              alt={`unlocking_image`}
              fill
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <h1 className={`${tinos.className} text-primary text-3xl pb-50`}>
                Unlocking Excellence
              </h1>
              <p className={`${montserrat.className} text-white md:pb-70`}>
                Our key features
              </p>
            </div>
          </div>
          <div className="md:absolute gap-y-16 md:gap-y-0 md:bottom-[-180px] md:left-1/2 md:-translate-x-1/2 flex-col flex md:flex-row justify-between items-center mx-auto w-full max-w-1000">
            <SectionCard
              imgPath="/icons/restaurants.png"
              title={`Affordable\nLuxury`}
              content="Exceptional events should be accessible to all."
            />
            <SectionCard
              imgPath="/icons/badge.png"
              title={`Guided\nby Professionals`}
              content="Our expert chefs ensure flawless execution and top quality."
            />
            <SectionCard
              imgPath="/icons/service.png"
              title={`Innovation\nand Customisation`}
              content="Clients gain fresh ideas from students' innovative contributions."
            />
          </div>
        </section>
      </FadeIn>
      <FadeIn>
        <ImageTextSection
          order="left"
          imgPath="/home/our_menu.png"
          title="Our Menu"
          className="md:mt-290"
          haveButton={<Button className="mt-40">View Menu</Button>}
          content={`Are you planning a special event or gathering?\nLook no further!\n\nABM Functions and Catering is here to make your event a memorable one. As an affiliate of ABM Further Education, we take pride in providing exceptional service while also nurturing the talents and skills of our students.`}
        />
      </FadeIn>
      <FadeIn>
        <section className="mt-120">
          <h2
            className={cn(
              tinos.className,
              'text-primary text-2xl text-center mb-30'
            )}
          >
            Gallery
          </h2>
          <Gallery />
        </section>
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
      <Testimonial />
      <PaymentContainer />
    </div>
  );
};

export default Page;
