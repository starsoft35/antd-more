import React, { useCallback, useMemo } from "react";
import classnames from 'classnames';
import type { PopoverProps, UploadProps } from "antd";
import { Image, message, Popover, Tooltip, Upload } from "antd";
import { blobToDataURL } from "util-helpers";
import { CloseCircleOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import ImageIdCardPersonal from './images/idcard-personal.jpg';
import ImageIdCardNational from './images/idcard-national.jpg';
import ImageBusinessLicense from './images/business-license.jpg';
import ImagePassport from './images/passport.jpg';
import ImageAuthorization from './images/authorization.jpg';
import ImageExampleIdCardPersonal from './images/example-idcard-personal.jpg';
import ImageExampleIdCardNational from './images/example-idcard-national.jpg';
import ImageExamplePassport from './images/example-passport.jpg';
import ImageExampleBusinessLicense from './images/example-business-license.jpg';
import ImageExampleAuthorization from './images/example-authorization.jpg';
import ImageExampleBusinessRegistry from './images/example-business-registry.jpg';
import IconPDF from './images/icon-pdf.png';
import styles from './index.less';
import { isPDFFile } from "./utils";

const InternalConfig = {
  idCardFront: {
    icon: <img src={ImageIdCardPersonal} alt='' />,
    title: '身份证人像面',
    popoverProps: {
      title: '身份证人像面示例图',
      content: <img src={ImageExampleIdCardPersonal} alt='' style={{ width: 260, height: 160 }} />
    }
  },
  idCardBack: {
    icon: <img src={ImageIdCardNational} alt='' />,
    title: '身份证国徽面',
    popoverProps: {
      title: '身份证国徽面示例图',
      content: <img src={ImageExampleIdCardNational} alt='' style={{ width: 260, height: 160 }} />
    }
  },
  businessLicense: {
    icon: <img src={ImageBusinessLicense} alt='' />,
    title: '营业执照',
    popoverProps: {
      title: '营业执照示例图',
      content: <img src={ImageExampleBusinessLicense} alt='' style={{ width: 300, height: 428 }} />
    }
  },
  businessRegistry: {
    icon: <img src={ImageBusinessLicense} alt='' />,
    title: '商业登记证BR',
    popoverProps: {
      title: '商业登记证BR示例图',
      content: <img src={ImageExampleBusinessRegistry} alt='' style={{ width: 300, height: 395 }} />
    }
  },
  passport: {
    icon: <img src={ImagePassport} alt='' />,
    title: '护照',
    popoverProps: {
      title: '护照示例图',
      content: <img src={ImageExamplePassport} alt='' style={{ width: 260, height: 178 }} />
    }
  },
  authorization: {
    icon: <img src={ImageAuthorization} alt='' />,
    title: '授权书',
    popoverProps: {
      title: '授权书示例图',
      content: <img src={ImageExampleAuthorization} alt='' style={{ width: 300, height: 421 }} />
    }
  }
} as const;

const supportedFileType = ['image/jpg', 'image/jpeg', 'image/bmp', 'image/png', 'application/pdf'];

export interface UploadCertificateProps extends UploadProps {
  idType?: 'idCardFront' | 'idCardBack' | 'businessLicense' | 'businessRegistry' | 'passport' | 'authorization'; // 证件类型
  icon?: React.ReactNode;
  title?: React.ReactNode;
  showPopover?: boolean;
  popoverProps?: PopoverProps;
  onUpload?: (file: File) => Promise<any>;
}

const UploadCertificate: React.FC<UploadCertificateProps> = ({
  idType = 'idCardFront',
  icon: outIcon,
  title: outTitle,
  showPopover = true,
  popoverProps,
  disabled,
  onUpload,
  ...restProps
}) => {
  // console.log(restProps?.fileList);
  const config = useMemo(() => InternalConfig[idType], [idType]);
  const icon = useMemo(() => outIcon || config.icon, [config.icon, outIcon]);
  const title = useMemo(() => outTitle || config.title, [config.title, outTitle]);

  const uploadBoxDom = useMemo(() => {
    return (
      <div className={styles.uploadBox}>
        {icon}
        <div className={styles.text}>{title}</div>
      </div>
    )
  }, [icon, title]);

  const hasFile = useMemo(() => restProps?.fileList && restProps.fileList?.length > 0, [restProps?.fileList]);

  const handleBeforeUpload = useCallback((file: RcFile) => {
    // console.log(file);
    const isSupportedFileType = supportedFileType.includes(file.type);
    if (!isSupportedFileType) {
      message.error('只支持上传 PDF, JPG, JPEG, PNG, BMP 文件');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('文件不能超过 20MB');
    }

    return isSupportedFileType && isLt20M;
  }, []);

  return (
    <Upload
      listType="picture-card"
      itemRender={(originNode, file, fileList, actions) => {
        if (file.status === 'done' || file.status === 'success') {
          return (
            <div className={styles.thumb}>
              {
                !disabled && (
                  <Tooltip title='点击删除'>
                    <CloseCircleOutlined className={styles.closeIcon} onClick={actions.remove} />
                  </Tooltip>
                )
              }
              <div className={styles.inner}>
                <Image
                  src={file.thumbUrl || file.url}
                  preview={!isPDFFile(file)}
                />
                <div className={styles.title}>{title}</div>
              </div>
            </div>
          )
        }
        if (file.status === 'error') {
          return (
            <div className={styles.thumb}>
              {
                !disabled && (
                  <Tooltip title='点击删除'>
                    <CloseCircleOutlined className={styles.closeIcon} onClick={actions.remove} />
                  </Tooltip>
                )
              }
              {originNode}
              {/* <div className={styles.title}>{title}</div> */}
            </div>
          )
        }
        return originNode;
      }}
      previewFile={async (file) => {
        // console.log(file);
        if (isPDFFile(file)) {
          return IconPDF;
        }
        return blobToDataURL(file);
      }}
      showUploadList={{
        showRemoveIcon: false,
        showPreviewIcon: false
      }}
      disabled={disabled}
      beforeUpload={handleBeforeUpload}
      accept='application/pdf,.pdf,image/*'
      customRequest={(obj) => {
        // console.log('customRequest: ', obj);
        // const formData = new FormData();
        // formData.append('file', obj.file);
        // formData.append('fileType', FileType.BusinessLicense);
        obj.onProgress?.({ percent: 99 });
        onUpload?.(obj.file as File).then(obj.onSuccess).catch(obj.onError);
      }}
      {...restProps}
    >
      {
        !hasFile && (
          showPopover ? (
            <Popover
              placement='rightTop'
              {...(config?.popoverProps || {})}
              {...popoverProps}
              overlayClassName={classnames(styles.popoverTip, popoverProps?.className)}
            >
              {uploadBoxDom}
            </Popover>
          ) : uploadBoxDom
        )
      }
    </Upload >
  );
}

export default UploadCertificate;

