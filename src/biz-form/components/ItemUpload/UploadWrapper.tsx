import * as React from 'react';
import { Upload, message } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { UploadFile, UploadChangeParam, RcFile } from 'antd/es/upload/interface';
import classNames from 'classnames';
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

const prefixCls = 'antd-more-upload';

export interface UploadWrapperProps extends UploadProps {
  fileTypeMessage?: string; // 文件类型错误提示
  fileSizeMessage?: string; // 文件超过最大尺寸提示
  maxCountMessage?: string; // 上传文件超过限制数量时提示
  onUpload?: (file: UploadFile) => Promise<object | undefined>; // 单个文件上传
  maxSize?: number; // 单个文件最大尺寸，用于校验
  maxCount?: number; // 最多上传文件数量
  beforeTransformValue?: (value: any[]) => UploadFile[] | Promise<UploadFile[]>; // 初始值转换
  onGetPreviewUrl?: (file: UploadFile) => Promise<string>; // 点击预览获取大图URL
  only?: boolean; // 仅支持一个，适用于头像
  dragger?: boolean; // 支持拖拽

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
  only = false,
  dragger = false,
  icon,
  title,

  multiple = false,
  onChange,
  fileList,
  accept,
  className,
  ...restProps
}) => {
  const actionRef = React.useRef<'normal' | 'error' | 'upload'>('normal');
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
        !only &&
        maxCount &&
        Array.isArray(fileListRef.current) &&
        fileListRef.current.length >= maxCount
      ) {
        message.error(maxCountMessage || `最多上传${maxCount}个文件`);
        actionRef.current = 'error';
        return false;
      }

      // 检查是否支持文件类型
      const isSupportFileType = checkFileType(file, accept);
      if (!isSupportFileType) {
        message.error(fileTypeMessage || `只支持上传 ${accept} 文件`);
        actionRef.current = 'error';
        return false;
      }

      // 检查是否超过文件大小
      const isLessThanFileSize = checkFileSize(file, maxSize);
      if (!isLessThanFileSize) {
        const maxFileSizeStr = bytesToSize(maxSize);
        message.error(
          fileSizeMessage?.replace(/%s/g, maxFileSizeStr) || `必须小于 ${maxFileSizeStr}！`,
        );
        actionRef.current = 'error';
        return false;
      }

      actionRef.current = 'upload';
      return false;
    },
    [fileList, maxCount, fileSizeMessage, fileTypeMessage, maxCountMessage, maxSize, accept, only],
  );

  // 处理上传
  const handleUpload = React.useCallback(
    (file: UploadFile) => {
      const { uid } = file;

      // 支持逐个上传文件
      const uploadRet = onUpload(file);
      if (isPromiseLike(uploadRet)) {
        setUploading(true);
        uploadRet
          .then((res) => {
            fileListRef.current = fileListRef.current.map((item) => {
              if (item.uid === uid) {
                return {
                  ...item,
                  status: 'done',
                  percent: 100,
                  ...res,
                };
              }
              return item;
            });
            setUploading(false);

            onChange({
              file,
              fileList: fileListRef.current,
            });
          })
          .catch((err) => {
            fileListRef.current = fileListRef.current.map((item) => {
              if (item.uid === uid) {
                return {
                  ...item,
                  status: 'error',
                  thumbUrl: '',
                  percent: 0,
                  response: err?.message || '上传错误',
                };
              }
              return item;
            });
            setUploading(false);

            onChange({
              file,
              fileList: fileListRef.current,
            });
          });
      } else {
        fileListRef.current = fileListRef.current.map((fileItem) => {
          if (fileItem.uid === uid) {
            return {
              ...fileItem,
              percent: 100,
              status: 'done',
            };
          }
          return fileItem;
        });
        onChange({
          file,
          fileList: fileListRef.current,
        });
      }
    },
    [onChange],
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

      if (actionRef.current === 'error') {
        actionRef.current = 'normal';
        onChange({
          file,
          fileList: fileListRef.current,
        });
        return;
      }

      if (only && currentFileList.length > 0) {
        // 单个头像上传
        fileListRef.current = currentFileList.slice(-1);
      } else if (multiple && actionRef.current === 'upload') {
        // 多选文件
        // 添加 UploadFile
        fileListRef.current = [
          ...fileListRef.current,
          currentFileList.find((item) => item.uid === file.uid),
        ];
      } else {
        fileListRef.current = currentFileList;
      }

      if (actionRef.current === 'upload') {
        actionRef.current = 'normal';

        if (typeof onUpload === 'function') {
          const { uid } = file;
          fileListRef.current = fileListRef.current.map((fileItem) => {
            if (fileItem.uid === uid) {
              return {
                ...fileItem,
                status: 'uploading',
                percent: 99.9,
              };
            }
            return fileItem;
          });
          handleUpload(file);
        }
      }

      onChange({
        file,
        fileList: fileListRef.current,
      });
    },
    [fileList, only],
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
          // eslint-disable-next-line
          file.preview = await onGetPreviewUrl(file);
        } else if (file.originFileObj) {
          // eslint-disable-next-line
          file.preview = await getBase64(file.originFileObj as File);
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
    [enabledShowPreview],
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
            fileList: fileListRef.current,
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
        fileList: fileListRef.current,
      });
      setTimeout(() => {
        setTransforming(false);
      }, 0);
    }
  }, [fileList]);

  React.useEffect(() => {
    if (transforming) {
      initTransform();
    }
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
        disabled={transforming}
        className={classNames(prefixCls, className)}
        multiple={multiple}
        {...restProps}
      />
      {enabledShowPreview && <Preview {...previewProps} onCancel={handlePreviewCancel} />}
    </UploadContext.Provider>
  );
};

export default UploadWrapper;
