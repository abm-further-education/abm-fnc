import { tinos } from '@/app/[locale]/layout';
import { cn } from '@/utils/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function Button({ children, id, className, type = 'button', onClick }: Props) {
  return (
    <button
      id={id}
      onClick={onClick}
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
