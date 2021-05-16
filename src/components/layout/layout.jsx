import React from 'react';
import Header from './header/header.component';

import './layout.scss';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="main">{props.children}</main>
    </>
  );
};

export default Layout;
