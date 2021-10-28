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
  getFileName,
} from './uploadUtil';
import Preview from './Preview';
import UploadContext from './UploadContext';

import './index.less';

const prefixCls = 'antd-more-form-upload';

export interface UploadWrapperProps extends UploadProps {
  fileTypeMessage?: string; // 文件类型错误提示
  fileSizeMessage?: string; // 文件超过最大尺寸提示
  maxCountMessage?: string; // 上传文件超过限制数量时提示
  onUpload?: (file: File) => Promise<object | undefined>; // 自定义文件上传
  maxSize?: number; // 单个文件最大尺寸，用于校验
  maxCount?: number; // 最多上传文件数量
  beforeTransformValue?: (value: any[]) => UploadFile[] | Promise<UploadFile[]>; // 初始值转换
  onGetPreviewUrl?: (file: File) => Promise<string>; // 点击预览获取大图URL
  dragger?: boolean; // 支持拖拽
  internalTriggeValidate?: () => void; // 外部透传的校验表单，用于异步上传 或 删除后触发

  // icon和title配置仅在 Dragger 和 Button 中生效
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

const UploadWrapper: React.FC<UploadWrapperProps> = ({
  onUpload,
  fileTypeMessage,
  fileSizeMessage,
  maxCountMessage,
  maxSize = 1024 * 1024 * 2,
  maxCount,
  beforeTransformValue,
  onGetPreviewUrl,
  dragger = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  icon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,

  multiple = false,
  onChange,
  fileList,
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
  const fileListRef = React.useRef(fileList);
  const [previewProps, setPreviewProps] = React.useState({
    visible: false,
    title: '',
    imgUrl: '',
  });
  const [transforming, setTransforming] = React.useState(
    () => typeof beforeTransformValue === 'function',
  );
  const [uploading, setUploading] = React.useState(false);

  // 上传前验证
  const handleBeforeUpload = React.useCallback(
    (file: RcFile) => {
      // 验证上传文件数量
      if (
        maxCount !== 1 &&
        maxCount &&
        Array.isArray(fileListRef.current) &&
        fileListRef.current.length >= maxCount
      ) {
        message.error(
          maxCountMessage?.replace(/%s/g, maxCount + '') || `最多上传${maxCount}个文件`,
        );
        fileBeforeUploadActionRef.current[file.uid] = 'error';
        return false;
      }

      // 检查是否支持文件类型
      const isSupportFileType = checkFileType(file, accept);
      if (!isSupportFileType) {
        message.error(fileTypeMessage?.replace(/%s/g, accept) || `只支持上传 ${accept} 文件`);
        fileBeforeUploadActionRef.current[file.uid] = 'error';
        return false;
      }

      // 检查是否超过文件大小
      const isLessThanFileSize = checkFileSize(file, maxSize);
      if (!isLessThanFileSize) {
        const maxFileSizeStr = bytesToSize(maxSize);
        message.error(
          fileSizeMessage?.replace(/%s/g, maxFileSizeStr) || `必须小于 ${maxFileSizeStr}！`,
        );
        fileBeforeUploadActionRef.current[file.uid] = 'error';
        return false;
      }
      fileBeforeUploadActionRef.current[file.uid] = 'upload';

      return !!action;
    },
    [maxCount, accept, maxSize, action, maxCountMessage, fileTypeMessage, fileSizeMessage],
  );

  const handleValidate = React.useCallback(
    (file: UploadFile, force = false) => {
      if ((file?.status && file.status !== 'uploading') || force) {
        internalTriggeValidate?.();
      }
    },
    [internalTriggeValidate],
  );

  // 处理上传
  const handleUpload = React.useCallback(
    (file: UploadFile) => {
      const { uid } = file;

      // 支持逐个上传文件
      const uploadRet = onUpload((file.originFileObj || file) as File);
      if (isPromiseLike(uploadRet)) {
        setUploading(true);
        uploadRet
          .then((res) => {
            fileListRef.current = fileListRef.current.map((item) => {
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
              fileList: [...fileListRef.current],
            });
            handleValidate(file, true);
          })
          .catch((err) => {
            fileListRef.current = fileListRef.current.map((item) => {
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
              fileList: [...fileListRef.current],
            });
            handleValidate(file, true);
          });
      } else {
        fileListRef.current = fileListRef.current.map((fileItem) => {
          if (fileItem.uid === uid) {
            fileItem.percent = 100;
            fileItem.status = 'done';
          }
          return fileItem;
        });
        onChange({
          file,
          fileList: [...fileListRef.current],
        });
        handleValidate(file, true);
      }
    },
    [handleValidate, onChange, onUpload],
  );

  // 处理修改
  const handleChange = React.useCallback(
    ({ file, fileList: currentFileList }: UploadChangeParam) => {
      // 处理异步初始值情况
      if (typeof fileListRef.current === 'undefined') {
        if (Array.isArray(fileList) && fileList.length > 0) {
          fileListRef.current = [...fileList];
        } else {
          fileListRef.current = [];
        }
      }

      if (fileBeforeUploadActionRef.current[file.uid] === 'error') {
        fileBeforeUploadActionRef.current[file.uid] = 'normal';
        onChange({
          file,
          fileList: [...fileListRef.current],
        });

        handleValidate(file);
        return;
      }

      if (maxCount === 1 && currentFileList.length > 0) {
        // 单个头像上传
        fileListRef.current = currentFileList.slice(-1);
      } else if (multiple && fileBeforeUploadActionRef.current[file.uid] === 'upload') {
        // 多选文件
        // 添加 UploadFile
        fileListRef.current = [
          ...fileListRef.current,
          currentFileList.find((item) => item.uid === file.uid),
        ];
      } else {
        fileListRef.current = currentFileList || [];
      }

      if (fileBeforeUploadActionRef.current[file.uid] === 'upload') {
        fileBeforeUploadActionRef.current[file.uid] = 'normal';

        if (!action && typeof onUpload === 'function') {
          const { uid } = file;
          fileListRef.current = fileListRef.current.map((fileItem) => {
            if (fileItem.uid === uid) {
              fileItem.status = 'uploading';
              fileItem.percent = 99.9;
            }
            return fileItem;
          });
          handleUpload(file);
        }
      }

      onChange({
        file,
        fileList: [...fileListRef.current],
      });
      handleValidate(file);
    },
    [maxCount, multiple, onChange, handleValidate, fileList, action, onUpload, handleUpload],
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
        } else if (file.thumbUrl) {
          file.preview = file.thumbUrl;
        } else if (file.originFileObj || file) {
          file.preview = await getBase64(file);
        } else {
          message.error('当前文件不支持预览！');
          return;
        }
      }

      setPreviewProps({
        visible: true,
        imgUrl: file.url || file.preview,
        title: file.name || getFileName(file.url),
      });
    },
    [enabledShowPreview, onGetPreviewUrl],
  );

  // 关闭预览
  const handlePreviewCancel = React.useCallback(() => {
    setPreviewProps({
      ...previewProps,
      visible: false,
    });
  }, [previewProps]);

  // 初始转换值
  const initTransform = React.useCallback(async () => {
    const transformRet = beforeTransformValue(fileList);

    if (isPromiseLike(transformRet)) {
      (transformRet as Promise<UploadFile[]>)
        .then((res) => {
          fileListRef.current = res;
          onChange({
            file: null,
            fileList: [...fileListRef.current],
          });
          setTimeout(() => {
            setTransforming(false);
          }, 0);
        })
        .catch(() => {
          message.error('初始文件加载失败');
        });
    } else {
      fileListRef.current = transformRet as UploadFile[];
      onChange({
        file: null,
        fileList: [...fileListRef.current],
      });
      setTimeout(() => {
        setTransforming(false);
      }, 0);
    }
  }, [beforeTransformValue, fileList, onChange]);

  React.useEffect(() => {
    if (transforming) {
      initTransform();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Comp = React.useMemo(() => (dragger ? Upload.Dragger : Upload), [dragger]);

  return (
    <UploadContext.Provider value={{ transforming, uploading }}>
      <Comp
        accept={accept}
        beforeUpload={handleBeforeUpload}
        fileList={transforming ? [] : fileList}
        progress={{
          status: 'active',
          showInfo: false,
        }}
        onChange={handleChange}
        onPreview={handlePreview}
        disabled={transforming || disabled}
        className={classNames(prefixCls, className)}
        multiple={multiple}
        action={action}
        {...restProps}
      />
      {enabledShowPreview && <Preview {...previewProps} onCancel={handlePreviewCancel} />}
    </UploadContext.Provider>
  );
};

export default UploadWrapper;
