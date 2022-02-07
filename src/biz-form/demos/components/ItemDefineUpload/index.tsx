import * as React from 'react';
import type { BizFormItemUploadProps } from 'antd-more';
import { BizFormItemUpload } from 'antd-more';

const ItemDefineUpload: React.FC<BizFormItemUploadProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const imgUrl = 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg';

  return (
    <>
      <BizFormItemUpload
        renderField={(dom) => {
          const InnerComp = (internalProps) => (
            <div style={{ display: 'flex' }}>
              <div style={{ width: 160 }}>
                {React.cloneElement(dom, {
                  ...dom?.props,
                  ...internalProps
                })}
              </div>
              <a style={{ marginLeft: 10, lineHeight: '32px' }} onClick={() => setVisible(true)}>
                查看示例图
              </a>
            </div>
          );
          return <InnerComp />;
        }}
        {...props}
      />
      <BizFormItemUpload.Preview
        visible={visible}
        title="示例图"
        imgUrl={imgUrl}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export default ItemDefineUpload;
