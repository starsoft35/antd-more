import * as React from 'react';
import { Upload, message } from 'antd';
import classNames from 'classnames';
import type { UploadProps, UploadFile, UploadChangeParam, RcFile } from '../antd.interface';
import {
  getBase64,
  bytesToSize,
  checkFileSize,
  checkFileType,
  isPromiseLike,
  getFileName
} from './uploadUtil';
import Preview from './Preview';
import UploadContext from './UploadContext';

import './index.less';

const prefixCls = 'antd-more-form-upload';

export interface UploadWrapperProps extends UploadProps {
  fileTypeMessage?: string | false; // 文件类型错误提示
  fileSizeMessage?: string | false; // 文件超过最大尺寸提示
  maxCountMessage?: string | false; // 上传文件超过限制数量时提示
  onUpload?: (file: File) => Promise<object | undefined>; // 自定义文件上传
  maxSize?: number; // 单个文件最大尺寸，用于校验
  maxCount?: number; // 最多上传文件数量
  onGetPreviewUrl?: (file: File) => Promise<string>; // 点击预览获取大图URL
  dragger?: boolean; // 支持拖拽
  internalTriggeValidate?: () => void; // 外部透传的校验表单，用于异步上传 或 删除后触发

  // icon和title配置仅在 Dragger 和 Button 中生效
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

const UploadWrapper: React.FC<UploadWrapperProps> = ({
  onUpload,
  fileTypeMessage = '只支持上传 %s 文件',
  fileSizeMessage = '必须小于 %s！',
  maxCountMessage = '最多上传%s个文件',
  maxSize = 1024 * 1024 * 2,
  maxCount,
  onGetPreviewUrl,
  dragger = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  icon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,

  multiple = false,
  onChange,
  accept,
  className,
  disabled,
  action,
  internalTriggeValidate,
  ...restProps
}) => {
  const fileBeforeUploadActionRef = React.useRef<
    Record<string | number, 'normal' | 'error' | 'upload'>
  >({});
  // const fileListRef = React.useRef(fileList);
  const [previewProps, setPreviewProps] = React.useState({
    visible: false,
    title: '',
    imgUrl: ''
  });
  const [uploading, setUploading] = React.useState(false);

  // 上传前验证
  const handleBeforeUpload = React.useCallback(
    (file: RcFile, fileList: RcFile[]) => {
      if (fileBeforeUploadActionRef.current[file.uid]) {
        fileBeforeUploadActionRef.current[file.uid] = 'normal';
      }

      const mergeFileList = [...(restProps.fileList || []), ...fileList];

      // 检查是否支持文件类型
      const isSupportFileType = checkFileType(file, accept);
      if (!isSupportFileType) {
        if (fileTypeMessage !== false) {
          message.error(fileTypeMessage.replace(/%s/g, accept));
        }
        fileBeforeUploadActionRef.current[file.uid] = 'error';
        return false;
      }

      // 检查是否超过文件大小
      const isLessThanFileSize = checkFileSize(file, maxSize);
      if (!isLessThanFileSize) {
        const maxFileSizeStr = bytesToSize(maxSize);
        if (fileSizeMessage !== false) {
          message.error(fileSizeMessage.replace(/%s/g, maxFileSizeStr));
        }
        fileBeforeUploadActionRef.current[file.uid] = 'error';
        return false;
      }

      // 验证上传文件数量
      if (
        maxCount !== 1 &&
        maxCount &&
        mergeFileList.length > maxCount &&
        mergeFileList.findIndex((item) => item.uid === file.uid) >= maxCount
      ) {
        if (maxCountMessage !== false) {
          message.error(maxCountMessage.replace(/%s/g, maxCount + ''));
        }
        fileBeforeUploadActionRef.current[file.uid] = 'error';
        return false;
      }

      fileBeforeUploadActionRef.current[file.uid] = 'upload';

      return !!action;
    },
    [
      maxCount,
      accept,
      maxSize,
      action,
      maxCountMessage,
      fileTypeMessage,
      fileSizeMessage,
      restProps?.fileList
    ]
  );

  const handleValidate = React.useCallback(
    (file: UploadFile, force = false) => {
      if ((file?.status && file.status !== 'uploading') || force) {
        internalTriggeValidate?.();
      }
    },
    [internalTriggeValidate]
  );

  // 处理上传
  const handleUpload = React.useCallback(
    (file: UploadFile, fileList: UploadFile[]) => {
      const { uid } = file;

      // 支持逐个上传文件
      const uploadRet = onUpload((file.originFileObj || file) as File);
      if (isPromiseLike(uploadRet)) {
        setUploading(true);
        uploadRet
          .then((res) => {
            const cloneFileList = fileList
              .filter((item) => item.status !== 'removed')
              .map((item) => {
                if (item.uid === uid) {
                  item.status = 'done';
                  item.percent = 100;
                  const resKeys = typeof res === 'object' ? Object.keys(res) : [];
                  if (resKeys.length > 0) {
                    resKeys.forEach((resKey) => {
                      item[resKey] = res[resKey];
                    });
                  }
                }
                return item;
              });
            setUploading(false);

            onChange({
              file,
              fileList: cloneFileList
            });
            handleValidate(file, true);
          })
          .catch((err) => {
            const cloneFileList = fileList
              .filter((item) => item.status !== 'removed')
              .map((item) => {
                if (item.uid === uid) {
                  item.status = 'error';
                  item.percent = 100;
                  item.response = err?.message || '上传错误';
                }
                return item;
              });
            setUploading(false);

            onChange({
              file,
              fileList: cloneFileList
            });
            handleValidate(file, true);
          });
      } else {
        const cloneFileList = fileList.map((fileItem) => {
          if (fileItem.uid === uid) {
            fileItem.percent = 100;
            fileItem.status = 'done';
          }
          return fileItem;
        });
        onChange({
          file,
          fileList: cloneFileList
        });
        handleValidate(file, true);
      }
    },
    [handleValidate, onChange, onUpload]
  );

  // 处理修改
  const handleChange = React.useCallback(
    ({ file, fileList }: UploadChangeParam) => {
      let cloneFileList = fileList.filter(
        (item) => fileBeforeUploadActionRef.current[item.uid] !== 'error'
      );

      if (fileBeforeUploadActionRef.current[file.uid] === 'upload') {
        fileBeforeUploadActionRef.current[file.uid] = 'normal';

        if (
          !action &&
          typeof onUpload === 'function' &&
          cloneFileList.find((item) => item.uid === file.uid)
        ) {
          cloneFileList = cloneFileList.map((fileItem) => {
            if (fileItem.uid === file.uid) {
              fileItem.status = 'uploading';
              fileItem.percent = 99.9;
            }
            return fileItem;
          });
          handleUpload(file, cloneFileList);
        }
      }

      onChange({
        file,
        fileList: cloneFileList
      });
      handleValidate(file);
    },
    [onChange, handleValidate, action, onUpload, handleUpload]
  );

  // 是否支持预览
  const enabledShowPreview = React.useMemo(() => {
    if (
      restProps?.showUploadList &&
      typeof restProps.showUploadList === 'object' &&
      restProps.showUploadList.showPreviewIcon === false
    ) {
      return false;
    }
    return true;
  }, [restProps?.showUploadList]);

  // 显示预览
  const handlePreview = React.useCallback(
    async (file: UploadFile) => {
      if (!enabledShowPreview) {
        return;
      }
      if (!file.url && !file.preview) {
        if (onGetPreviewUrl) {
          file.preview = await onGetPreviewUrl((file as any).originFileObj || file);
        } else if (file.originFileObj || file) {
          file.preview = await getBase64(file);
        } else if (file.thumbUrl) {
          file.preview = file.thumbUrl;
        } else {
          message.error('当前文件不支持预览！');
          return;
        }
      }

      setPreviewProps({
        visible: true,
        imgUrl: file.url || file.preview,
        title: file.name || getFileName(file.url)
      });
    },
    [enabledShowPreview, onGetPreviewUrl]
  );

  // 关闭预览
  const handlePreviewCancel = React.useCallback(() => {
    setPreviewProps({
      ...previewProps,
      visible: false
    });
  }, [previewProps]);

  const Comp = React.useMemo(() => (dragger ? Upload.Dragger : Upload), [dragger]);

  return (
    <UploadContext.Provider value={{ uploading }}>
      <Comp
        accept={accept}
        beforeUpload={handleBeforeUpload}
        progress={{
          status: 'active',
          showInfo: false
        }}
        onChange={handleChange}
        onPreview={handlePreview}
        disabled={disabled}
        className={classNames(prefixCls, className)}
        multiple={multiple}
        action={action}
        maxCount={maxCount}
        {...restProps}
      />
      {enabledShowPreview && <Preview {...previewProps} onCancel={handlePreviewCancel} />}
    </UploadContext.Provider>
  );
};

export default UploadWrapper;
