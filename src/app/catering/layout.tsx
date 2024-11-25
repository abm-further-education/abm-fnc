import Footer from '@/components/common/Footer';
import Nav from '@/components/common/Nav';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return <div>{children}</div>;
}

export default layout;
