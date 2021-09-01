import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GuardProvider } from '@components/common/guard.provider';
import 'antd/dist/antd.css';
import '../public/stylesheets/bootstrap.min.css';
import '../public/stylesheets/main.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
      </Head>

      <GuardProvider>
        <Component {...pageProps} />
      </GuardProvider>
    </>
  );
};

export default MyApp;
