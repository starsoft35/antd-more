import * as React from 'react';
import type { CarouselProps } from 'antd';
import { Carousel, Row, Col } from 'antd';
import type { BannerItem } from './Banner';
import { prefixClass } from './config';
import './Side.less';

const prefixCls = `${prefixClass}-side`;

const colSpan = {
  xs: 24,
  sm: 12
};

export interface SideProps {
  banner?: BannerItem[];
  carouselProps?: CarouselProps;
  content?: React.ReactNode;
}

const Side: React.FC<SideProps> = ({ banner = [], carouselProps, content }) => {
  return (
    <div className={prefixCls}>
      <Row gutter={[24, 24]} align="middle">
        <Col className={`${prefixCls}-banner`} {...colSpan}>
          <Carousel autoplay {...carouselProps}>
            {banner.map((itemBanner, index) => {
              const isReactElement = React.isValidElement(itemBanner);

              let src = '';
              let title = '';
              let link, onClick;

              if (!isReactElement) {
                if (typeof itemBanner === 'string') {
                  src = itemBanner;
                } else {
                  src = itemBanner.src;
                  link = itemBanner.link;
                  title = itemBanner.title;
                  onClick = itemBanner.onClick;
                }
              }

              const key = isReactElement ? itemBanner.key : src + index;

              return (
                <div className={`${prefixCls}-item`} key={key}>
                  {isReactElement ? (
                    itemBanner
                  ) : link || onClick ? (
                    <a href={link} title={title} onClick={onClick}>
                      <img src={src} alt={title} />
                    </a>
                  ) : (
                    <img src={src} alt={title} />
                  )}
                </div>
              );
            })}
          </Carousel>
        </Col>
        <Col className={`${prefixCls}-content`} {...colSpan}>
          {content}
        </Col>
      </Row>
    </div>
  );
};

export default Side;
