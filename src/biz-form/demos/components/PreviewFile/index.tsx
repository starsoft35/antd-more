import * as React from "react";
import { Modal, ModalProps } from 'antd';
import { getFileType } from '../../utils/utils';
import FileViewer from "../FileViewer";

interface PreviewFileProps extends ModalProps {
  visible?: boolean;
  onCancel?: () => void;
  file: File;
}

const Demo: React.FC<PreviewFileProps> = ({ file, visible, ...restProps }) => {
  const previewUrl = React.useMemo(() => file && visible ? URL.createObjectURL(file) : '', [file, visible]);
  const fileType = React.useMemo(() => getFileType(file), [file]);

  const revokeObjectURL = React.useCallback(() => {
    try {
      previewUrl && URL.revokeObjectURL(previewUrl);
    } catch (err) {
      console.error(err);
    }
  }, [previewUrl]);

  React.useEffect(() => {
    if (!visible) {
      revokeObjectURL();
    }
    return () => {
      revokeObjectURL();
    }
  }, [revokeObjectURL, visible]);

  return (
    <Modal
      visible={visible}
      title={file?.name}
      centered
      width={fileType === 'pdf' ? 850 : undefined}
      destroyOnClose
      {...restProps}
      style={{ maxWidth: '80%', ...restProps.style }}
    >
      <FileViewer filePath={previewUrl} fileType={fileType} fileName={file?.name} />
    </Modal>
  );
}

export default Demo;
