import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';

import HeaderLayout from '@components/Header';

const { Footer, Content } = Layout;

interface AdminLayoutProps {
  hasFooter?: boolean;
  title: string;
}

const MainLayout: React.FC<AdminLayoutProps> = ({ children, hasFooter, title }) => {
  return (
    <>
      <Head>
        <title> LoveToKnow | {title}</title>
      </Head>
      <Layout>
        <Layout>
          <HeaderLayout />
          <Content>{children}</Content>
          {hasFooter && <Footer>Footer</Footer>}
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
