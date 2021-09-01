
import React from 'react';
import cs from 'classnames';
import MainLayout from '@components/MainLayout';

import s from './styles.module.scss';

const HomePage = () => {


  return (
    <div className="container-fluid no_padding">
      <MainLayout title="main-page">
        <div className={cs('container', s.main_page)}>
          <div className="row">
            <div className="col-2">
              SidebarLeft
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
