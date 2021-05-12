import * as React from 'react';
import { UploadProps } from 'antd/lib/upload';
import BizFormItem, { BizFormItemProps } from '../Item';
import { UploadWrapperProps } from './UploadWrapper';
import UploadButton from './UploadButton';
import UploadImage from './UploadImage';
import UploadAvatar from './UploadAvatar';
import UploadDragger from './UploadDragger';
import getLabel from '../../_util/getLabel';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export interface FormItemUploadProps
  extends BizFormItemProps,
    Pick<
      UploadWrapperProps,
      | 'accept'
      | 'onUpload'
      | 'fileTypeMessage'
      | 'fileSizeMessage'
      | 'maxCountMessage'
      | 'maxSize'
      | 'maxCount'
      | 'onGetPreviewUrl'
    > {
  type?: 'default' | 'image' | 'avatar' | 'dragger';
  uploadProps?: UploadProps;
  disabled?: boolean;
  multiple?: boolean;

  /**
   * @deprecated Please use `maxCount`
   */
  max?: number;
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

const FormItemUpload: React.FC<FormItemUploadProps> = ({
  uploadProps,
  accept,
  onUpload,
  onGetPreviewUrl,
  fileTypeMessage,
  fileSizeMessage,
  maxCountMessage,
  maxSize,
  max,
  maxCount,
  type = 'default',
  disabled = false,
  multiple = false,
  icon,
  title,

  required,
  transform,
  ...restProps
}) => {
  const Comp = React.useMemo(() => {
    if (type === 'image') {
      return UploadImage;
    }
    if (type === 'avatar') {
      return UploadAvatar;
    }
    if (type === 'dragger') {
      return UploadDragger;
    }
    return UploadButton;
  }, [type]);

  return (
    <BizFormItem
      required={required}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      transform={transform}
      rules={[
        {
          validator(rules, value) {
            let errMsg = '';
            const realValue = value && typeof transform === 'function' ? transform(value) : value;

            if (!realValue || (Array.isArray(realValue) && realValue.length <= 0)) {
              errMsg = required ? `请上传${getLabel(restProps)}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          },
        },
      ]}
      {...restProps}
    >
      <Comp
        accept={accept}
        onUpload={onUpload}
        onGetPreviewUrl={onGetPreviewUrl}
        fileTypeMessage={fileTypeMessage}
        fileSizeMessage={fileSizeMessage}
        maxSize={maxSize}
        maxCount={maxCount || max}
        disabled={disabled}
        multiple={multiple}
        icon={icon}
        title={title}
        {...uploadProps}
      />
    </BizFormItem>
  );
};

export default FormItemUpload;
