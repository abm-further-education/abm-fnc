'use client';

import React from 'react';
import { Link as Linki18n } from '@/i18n/routing';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useParams } from 'next/navigation';

const multilingual = ['en', 'ko', 'jp', 'sp', 'fr', 'th', 'pt'];

export const languageFlags: { [key: string]: string } = {
  en: '🇺🇸',
  ko: '🇰🇷',
  jp: '🇯🇵',
  sp: '🇪🇸',
  fr: '🇫🇷',
  th: '🇹🇭',
  pt: '🇵🇹',
};

const LanguageSwitcher = () => {
  const params = useParams();

  return (
    <div>
      <Popover className="relative">
        <PopoverButton>
          {Array.isArray(params.locale)
            ? params.locale[0].toUpperCase()
            : params.locale?.toUpperCase()}
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="z-[999] flex flex-col bg-neutral-800 text-white p-16 gap-2 rounded-md"
        >
          {multilingual.map((lang) => (
            <Linki18n
              href="/"
              locale={lang}
              className="hover:text-primary"
              key={lang}
            >
              {languageFlags[lang]}
              <span className="ml-5">{lang.toUpperCase()}</span>
            </Linki18n>
          ))}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default LanguageSwitcher;
