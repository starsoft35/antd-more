import * as React from 'react';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import { getFileType } from '../../utils/utils';
import FileViewer from '../FileViewer';

interface PreviewFileProps extends ModalProps {
  onCancel?: () => void;
  file: File;
}

const PreviewFile: React.FC<PreviewFileProps> = ({ file, open, ...restProps }) => {
  const previewUrl = React.useMemo(
    () => (file && open ? URL.createObjectURL(file) : ''),
    [file, open]
  );
  const fileType = React.useMemo(() => getFileType(file), [file]);

  const revokeObjectURL = React.useCallback(() => {
    try {
      previewUrl && URL.revokeObjectURL(previewUrl);
    } catch (err) {
      console.error(err);
    }
  }, [previewUrl]);

  React.useEffect(() => {
    if (!open) {
      revokeObjectURL();
    }
    return () => {
      revokeObjectURL();
    };
  }, [revokeObjectURL, open]);

  return (
    <Modal
      open={open}
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
};

export default PreviewFile;
