'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

function Nav() {
  return (
    <header className="fixed top-0 z-20 flex items-center justify-center gap-30 text-white py-16 w-full">
      <Link href="/catering" className="">
        Catering
      </Link>
      <Link href="/venue" className="">
        Venue
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
      <Link href="/about" className="">
        About
      </Link>
      <Link href="/contact" className="">
        Contact
      </Link>
    </header>
  );
}

export default Nav;
