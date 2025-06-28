import React from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title = 'Electron AI' }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout; 