import React from 'react';
import cs from 'classnames';
import s from './styles.module.scss';

const logoPath =
  'data:image/svg+xml;utf8,<?xml%20version="1.0"%20encoding="utf-8"?><svg%20version="1.1"%20xmlns="http://www.w3.org/2000/svg"%20viewBox="98%20272%20600%2068"><polygon%20points="277.6,330.2%20277.6,308%20307.7,308%20307.7,302.8%20277.6,302.8%20277.6,281.8%20311.2,281.8%20311.2,276.6%20271.8,276.6%20271.8,335.4%20312.3,335.4%20312.3,330.2"/><polygon%20points="103.9,276.6%2098.1,276.6%2098.1,335.4%20129.8,335.4%20129.8,330.2%20103.9,330.2"/><polygon%20points="232.5,329%20211.5,276.6%20205.3,276.6%20229.3,335.4%20235.3,335.4%20259.5,276.6%20253.3,276.6"/><polygon%20points="524.4,326.4%20487.9,276.6%20481.8,276.6%20481.8,335.4%20487.6,335.4%20487.6,285.6%20524,335.4%20530.1,335.4%20530.1,276.6%20524.4,276.6"/><polygon%20points="466.4,276.5%20459.3,276.5%20426.7,312.3%20426.7,276.5%20420.9,276.5%20420.9,335.4%20426.7,335.4%20426.7,319.7%20438.6,306.8%20460.9,335.4%20468.1,335.4%20442.8,302.2"/><polygon%20points="691.8,276.5%20675.2,329.2%20658.4,276.5%20652.5,276.5%20635.9,329.2%20619.1,276.5%20612.8,276.5%20632.7,335.4%20638.7,335.4%20655.4,283.8%20672,335.4%20678,335.4%20697.9,276.5"/><path%20d="M184.1,280.1c-4.7-2.7-9.8-4-15.4-4c-5.6,0-10.8,1.3-15.4,4c-4.7,2.7-8.4,6.3-11.1,10.8c-2.7,4.5-4.1,9.5-4.1,15c0,5.4,1.4,10.5,4.1,15.1c2.7,4.6,6.5,8.2,11.1,10.9c4.7,2.7,9.8,4,15.4,4c5.6,0,10.8-1.3,15.4-4c4.7-2.7,8.4-6.3,11.1-10.9c2.7-4.6,4.1-9.6,4.1-15.1c0-5.4-1.4-10.4-4.1-15C192.5,286.3,188.8,282.7,184.1,280.1z%20M190.2,318.3c-2.2,3.8-5.3,6.8-9,9c-3.8,2.2-7.9,3.3-12.3,3.3c-4.5,0-8.6-1.1-12.4-3.3c-3.8-2.2-6.8-5.2-9.1-9c-2.2-3.8-3.4-8-3.4-12.4c0-4.5,1.1-8.6,3.4-12.4c2.2-3.8,5.3-6.7,9.1-8.9c3.8-2.2,8-3.3,12.4-3.3c4.4,0,8.5,1.1,12.3,3.3c3.8,2.2,6.8,5.2,9,8.9c2.2,3.8,3.4,7.9,3.4,12.4C193.5,310.3,192.4,314.5,190.2,318.3z"/><path%20d="M591.7,280.1c-4.7-2.7-9.8-4-15.4-4c-5.6,0-10.8,1.3-15.4,4c-4.7,2.7-8.4,6.3-11.1,10.8c-2.7,4.5-4.1,9.5-4.1,15c0,5.4,1.4,10.5,4.1,15.1c2.7,4.6,6.5,8.2,11.1,10.9c4.7,2.7,9.8,4,15.4,4c5.6,0,10.8-1.3,15.4-4c4.7-2.7,8.4-6.3,11.1-10.9c2.7-4.6,4.1-9.6,4.1-15.1c0-5.4-1.4-10.4-4.1-15C600.1,286.3,596.4,282.7,591.7,280.1z%20M597.7,318.3c-2.2,3.8-5.3,6.8-9,9c-3.8,2.2-7.9,3.3-12.3,3.3c-4.5,0-8.6-1.1-12.4-3.3c-3.8-2.2-6.8-5.2-9.1-9c-2.2-3.8-3.4-8-3.4-12.4c0-4.5,1.1-8.6,3.4-12.4c2.2-3.8,5.3-6.7,9.1-8.9s8-3.3,12.4-3.3c4.4,0,8.5,1.1,12.3,3.3c3.8,2.2,6.8,5.2,9,8.9c2.2,3.8,3.4,7.9,3.4,12.4C601.1,310.3,599.9,314.5,597.7,318.3z"/><path%20d="M399.4,306c0-18.4-14.9-33.3-33.3-33.3c0,0,0,0,0,0c-18.4,0-33.3,14.9-33.3,33.3c0,18.4,14.9,33.3,33.3,33.3c0,0,0,0,0,0C384.5,339.3,399.4,324.4,399.4,306z%20M360.3,315.5c-1.3,3.7-4.2,5.4-7.6,5.4c-3.4,0-4.9-1.8-4.9-4.5c0-0.9,0.2-1.8,0.5-2.8l4.8-16h-4.4l0.6-1.7h4.4l1.7-6.2c2.7,0,4.9-0.2,7-0.7l-1.9,6.9h5.4l-0.5,1.7h-5.6l-5.7,18.8c-0.1,0.3-0.1,0.7-0.1,0.9c0,0.9,0.6,1.4,1.4,1.4c1.3,0,2.3-1.2,3.4-3.9l0.7-1.9h1.7L360.3,315.5z%20M371.7,320.9c-5,0-7.8-2.6-7.8-7.6c0-7,5.1-17.5,15.7-17.5c5,0,7.8,2.6,7.8,7.6C387.4,310.5,382.3,320.9,371.7,320.9z"/><path%20d="M379.2,296.8c-3.7,0-8.9,11.7-8.9,20.1c0,2.2,0.5,3.1,1.7,3.1c3.6,0,8.9-11.2,8.9-20C380.7,297.5,380.1,296.8,379.2,296.8z"/></svg>';
const HeaderLayout: React.FC = () => {
  return (
    <div className={s.header}>
      <div className={cs('container', 'height_inherit')}>
        <div className={s.header_nav}>
          <div className={s.header_nav__item}>
            <img src={logoPath} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;