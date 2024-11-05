import React from 'react';
import Footer from './footer';
import Header from './header';

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;
