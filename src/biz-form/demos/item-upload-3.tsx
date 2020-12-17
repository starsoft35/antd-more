/**
 * title: 上传头像/封面
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
      name="form-item-upload-3"
      form={form}
      onFinish={(values) => {
        console.log(values);
      }}
      labelCol={{
        flex: '0 0 100px'
      }}
    >
      <ItemUpload
        name="avatar"
        label="头像"
        type="avatar"
        // onUpload={handleUpload}
        // transform={transformUploadValue}
      />
      <ItemUpload
        name="avatar2"
        label="头像2"
        type="image"
        max={1}
        // onUpload={handleUpload}
        // transform={transformUploadValue}
      />
    </BizForm>
  );
}

export default Demo;
