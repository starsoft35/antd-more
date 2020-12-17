/**
 * title: 上传文档
 */
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemUpload } = BizForm;

// 提交时转换值
function transformUploadValue(values) {
  return values ? values.filter(item => item.value).map(item => item.value) : values;
}

const Demo: React.FC<{}> = () => {
  const [form] = BizForm.useForm();

  const handleUpload = React.useCallback((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log(file);
        if (Math.random() > 0.5) {
          resolve({ value: Math.random() + '' });
        } else {
          reject();
        }
      }, 5000);
    });
  }, []);

  return (
    <BizForm
      name="form-item-upload-2"
      form={form}
      onFinish={(values) => {
        console.log(values);
      }}
      labelCol={{
        flex: '0 0 100px'
      }}
    >
      <ItemUpload
        name="doc"
        label="doc文档"
        onUpload={handleUpload}
        max={1}
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        fileTypeMessage="不支持文件类型"
        transform={transformUploadValue}
      />
      <ItemUpload
        name="xls"
        label="xls文档"
        onUpload={handleUpload}
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        fileTypeMessage="不支持文件类型"
        transform={transformUploadValue}
      />
    </BizForm>
  );
}

export default Demo;
