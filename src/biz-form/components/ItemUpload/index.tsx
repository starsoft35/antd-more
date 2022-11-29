import * as React from 'react';
import type { UploadProps } from '../antd.interface';
import type { BizFormItemProps } from '../Item';
import BizFormItem from '../Item';
import ListFieldContext from '../../ListFieldContext';
import FieldContext from '../../FieldContext';
import type { UploadWrapperProps } from './UploadWrapper';
import UploadButton from './UploadButton';
import UploadImage from './UploadImage';
import UploadAvatar from './UploadAvatar';
import UploadDragger from './UploadDragger';
import getLabel from '../../_util/getLabel';
import Preview from './Preview';
import getNamePaths from '../../_util/getNamePaths';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export interface BizFormItemUploadProps
  extends BizFormItemProps,
  Pick<
    UploadWrapperProps,
    | 'accept'
    | 'onUpload'
    | 'fileTypeMessage'
    | 'fileSizeMessage'
    | 'maxSize'
    | 'maxCount'
    | 'onGetPreviewUrl'
  > {
  type?: 'default' | 'image' | 'avatar' | 'dragger';
  uploadProps?: UploadProps;
  disabled?: boolean;
  multiple?: boolean;
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

const BizFormItemUpload: React.FC<BizFormItemUploadProps> & {
  Preview: typeof Preview;
} = ({
  name,
  uploadProps,
  accept,
  onUpload,
  onGetPreviewUrl,
  fileTypeMessage,
  fileSizeMessage,
  maxSize,
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
    const { parentListName } = React.useContext(ListFieldContext);
    const { form } = React.useContext(FieldContext);

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

    const validateTrigger =
      (uploadProps?.action || onUpload) && !restProps.validateTrigger
        ? false
        : restProps.validateTrigger || 'onChange';

    // 触发表单校验
    const triggeValidate = React.useCallback(() => {
      const namePath =
        Array.isArray(parentListName) && parentListName.length > 0
          ? getNamePaths(name, parentListName)
          : name;
      form.validateFields([namePath]);
    }, [form, name, parentListName]);

    return (
      <BizFormItem
        required={required}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        transform={transform}
        name={name}
        validateTrigger={validateTrigger}
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
            }
          }
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
          maxCount={maxCount}
          disabled={disabled}
          multiple={multiple}
          icon={icon}
          title={title}
          internalTriggeValidate={!validateTrigger ? triggeValidate : undefined}
          {...uploadProps}
        />
      </BizFormItem>
    );
  };

BizFormItemUpload.Preview = Preview;

export default BizFormItemUpload;
