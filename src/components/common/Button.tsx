import { tinos } from '@/app/layout';
import { cn } from '@/utils/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

function Button({ children, className, type = 'button' }: Props) {
  return (
    <button
      type={type}
      className={cn(
        tinos.className,
        className,
        'border border-primary text-primary px-16 py-10 hover:bg-darkBg transition-all'
      )}
    >
      {children}
    </button>
  );
}

export default Button;
