import React from 'react';

interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return <div>{children}</div>;
}

export default layout;
