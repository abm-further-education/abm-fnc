'use client';
import React, { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

function MenuTab({
  setSelectedMenu,
}: {
  setSelectedMenu: React.Dispatch<
    React.SetStateAction<'Package 1' | 'Package 2' | 'Package 3'>
  >;
}) {
  const [index, setIndex] = useState(0);
  const packages: Array<'Package 1' | 'Package 2' | 'Package 3'> = [
    'Package 1',
    'Package 2',
    'Package 3',
  ];
  return (
    <>
      {packages.map((pkg, idx) => (
        <Fragment key={pkg}>
          <div
            key={pkg}
            onClick={() => {
              setIndex(idx);
              setSelectedMenu(pkg);
            }}
            className={cn('py-6 rounded-[4px] relative cursor-pointer')}
          >
            <>
              <div
                className={cn(
                  'w-80 md:w-160 text-center transition-all',
                  idx === index ? 'text-primary' : 'text-neutral-400'
                )}
              >
                {pkg}
              </div>
              {idx === index ? (
                <motion.div
                  layout
                  className="absolute bottom-[-1.5px] left-0 dark:bg-lightBlack bg-primary w-85 md:w-170 h-2 rounded-[4px] z-20 mix-blend-screen"
                  layoutId="underline"
                />
              ) : null}
            </>
          </div>
        </Fragment>
      ))}
    </>
  );
}

export default MenuTab;
