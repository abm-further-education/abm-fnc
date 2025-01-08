import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { montserrat } from '@/app/layout';
import { cn } from '@/utils/utils';
import { AlignJustify, X } from 'lucide-react';

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    const handleBodyScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    handleBodyScroll();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={cn(
        montserrat.className,
        `fixed top-0 z-[999] md:hidden flex items-center justify-between text-white p-16 w-full`
      )}
    >
      <Link href="/" className="">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="mx-20"
        />
      </Link>
      <AlignJustify onClick={toggleMenu} />

      <div
        className={`fixed top-0 z-40 right-0 h-full w-full p-40  shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="mt-2 absolute top-30 right-30 p-2 text-white focus:outline-none"
          >
            <X />
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-20 text-2xl">
            <li>
              <a href="#" className="block p-3 hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 hover:underline">
                Contact
              </a>
            </li>
          </ul>
          <div className="absolute bottom-40 left-40">
            <Image src="/logo.png" alt="Logo" width={120} height={120} />
          </div>
        </nav>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-neutral-900/70 backdrop-blur-sm z-0 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />
    </div>
  );
}

export default MobileNav;
