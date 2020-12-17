import * as React from 'react';
import { UploadProps } from 'antd/es/upload';
import BizFormItem, { BizFormItemProps } from '../Item';
import { UploadWrapperProps } from './UploadWrapper';
import UploadButton from './UploadButton';
import UploadImage from './UploadImage';
import UploadAvatar from './UploadAvatar';

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
      'accept' | 'onUpload' | 'fileTypeMessage' | 'fileSizeMessage' | 'maxSize' | 'max'
    > {
  type?: 'default' | 'image' | 'avatar';
  uploadProps?: UploadProps;
  disabled?: boolean;
}

const FormItemUpload: React.FC<FormItemUploadProps> = ({
  uploadProps,
  accept,
  onUpload,
  fileTypeMessage,
  fileSizeMessage,
  maxSize,
  max,
  type = 'default',
  disabled = false,

  label,
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
    return UploadButton;
  }, [type]);

  return (
    <BizFormItem
      label={label}
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
              errMsg = required ? `请上传${label}` : '';
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
        fileTypeMessage={fileTypeMessage}
        fileSizeMessage={fileSizeMessage}
        maxSize={maxSize}
        max={max}
        disabled={disabled}
        {...uploadProps}
      />
    </BizFormItem>
  );
};

export default FormItemUpload;
