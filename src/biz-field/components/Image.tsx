import * as React from 'react';
import { Image } from 'antd';
import { ImageProps } from 'antd/es/image';

const prefixCls = 'antd-more-field-image';

export interface FiledImageProps extends ImageProps {
  value: string | string[];
}

const FiledImage: React.FC<FiledImageProps> = ({ value, ...restProps }) => {
  const values = React.useMemo(() => (Array.isArray(value) ? value : [value]), []);

  return (
    <div className={prefixCls}>
      <Image.PreviewGroup>
        {values.map((item, index) => (
          <Image src={item} width={100} key={index.toString()} {...restProps} />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default FiledImage;
