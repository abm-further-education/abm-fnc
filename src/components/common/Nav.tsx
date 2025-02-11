'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { montserrat } from '@/app/[locale]/layout';
import { cn } from '@/utils/utils';
import { useParams } from 'next/navigation';
import MobileNav from './MobileNav';

import LanguageSwitcher from './LanguageSwitcher';

function Nav() {
  const params = useParams();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          isScrolled
            ? 'translate-y-0 bg-darkBg shadow-md'
            : '-translate-y-full bg-transparent',
          'fixed top-0 w-full h-80 transition-all z-[800] duration-500'
        )}
      />
      <header
        className={cn(
          montserrat.className,
          `hidden fixed top-0 z-[900] md:flex items-center justify-center gap-30 text-white py-16 w-full`
        )}
      >
        <Link
          href={`/${params.locale}/catering`}
          className="w-120 cursor-pointer hover:font-semibold transition-all"
        >
          Catering
        </Link>
        <Link
          href={`/${params.locale}/function`}
          className="w-120 cursor-pointer hover:font-semibold transition-all"
        >
          Function
        </Link>
        <Link href="/" className="">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="mx-20"
          />
        </Link>
        <Link
          href={`/${params.locale}/about`}
          className="w-120 cursor-pointer hover:font-semibold transition-all"
        >
          About
        </Link>
        <Link
          href={`/${params.locale}/contact`}
          className="w-120 cursor-pointer hover:font-semibold transition-all"
        >
          Contact
        </Link>
        <LanguageSwitcher />
      </header>
      <MobileNav />
    </>
  );
}

export default Nav;
