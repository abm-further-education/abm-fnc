import { montserrat } from '@/app/layout';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="text-sm">
      <div className="px-60 bg-footerBg py-20">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between text-white">
          <div className="w-300">
            <span className="flex items-center gap-10 font-light">
              <MapPin className="text-secondary min-w-24" />
              Shop 22 61-79 Quay Street Haymarket NSW 2000
            </span>
          </div>
          <div className="w-300">
            <span className="flex items-center md:justify-center gap-10 font-light">
              <Phone className="text-secondary" />
              +61 (02) 9160 4507
            </span>
          </div>
          <div className="w-300">
            <span className="flex items-center md:justify-end gap-10 font-light">
              <Mail className="text-secondary" />
              info@abm.edu.au
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between py-20 flex-col md:flex-row">
          <ul className="w-300 text-secondary flex items-center justify-center gap-16">
            <li>Home</li>
            <li>Catering</li>
            <li>Venue</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <div>
            <Link href="/" className="">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="mx-20 md:mt-0 mt-20"
              />
            </Link>
          </div>
          <div className="flex w-300 items-end justify-center mt-20 md:mt-0 md:justify-end">
            <Link href="/" className="">
              <Image
                src="/icons/fa_facebook.svg"
                alt="Logo"
                width={15}
                height={15}
                className="mx-20"
              />
            </Link>
            <Link href="/" className="">
              <Image
                src="/icons/bi_instagram.svg"
                alt="Logo"
                width={20}
                height={20}
                className="mx-20"
              />
            </Link>
            <Link href="/" className="">
              <Image
                src="/icons/bi_youtube.svg"
                alt="Logo"
                width={20}
                height={20}
                className="mx-20"
              />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={cn(
          montserrat.className,
          'bg-darkBg text-white py-20 text-center px-16 md:px-0 text-xs md:text-sm'
        )}
      >
        © ABM Functions and Catering
        <br className="block md:hidden" />
        Powered by ABM Further Education
      </div>
    </footer>
  );
}

export default Footer;
