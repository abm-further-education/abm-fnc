import React, { Fragment } from 'react';
import Nav from './Nav';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Fragment>
      <Nav />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
