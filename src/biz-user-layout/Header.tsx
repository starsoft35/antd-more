import * as React from 'react';
import classnames from 'classnames';
import { prefixClass } from './config';
import './Header.less';

const prefixCls = `${prefixClass}-header`;

export interface HeaderProps {
  headerRightContent?: React.ReactNode;
  logo?: string;
  title?: React.ReactNode;
  onClickLogo?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ logo, title, headerRightContent, onClickLogo }) => {
  return (
    <header
      className={classnames(prefixCls, {
        [`${prefixCls}-clickable`]: !!onClickLogo,
        [`${prefixCls}-enableHideTitle`]: !!headerRightContent
      })}
    >
      <div className={`${prefixCls}-main`} onClick={onClickLogo}>
        <div className={`${prefixCls}-logo`}>
          <img src={logo} alt="" />
        </div>
        <div className={`${prefixCls}-title`}>{title}</div>
      </div>
      {headerRightContent && <div className={`${prefixCls}-right`}>{headerRightContent}</div>}
    </header>
  );
};

export default Header;
