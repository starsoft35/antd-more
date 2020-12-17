/**
 * title: 上传含默认值
 * desc: |
 *      将默认值处理成 `UploadFile[]` 数据格式再传入，数据通过异步获取的情况下可用 `ready` 标识位。 
 * 
 *      使用 `value` 区分每个文件的 `fssId` ，提交时再获取该值。
 * 
 *      每次有新上传的文件，就会调用 `onUpload` 方法。
 */
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemUpload } = BizForm;

// 通过fssId获取图片地址
function getStaticServerPath(fssId): Promise<{ data: string; }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({
          data: `https://zos.alipayobjects.com/rmsportal/${fssId}.png`
        });
      } else {
        reject();
      }
    }, 2000);
  })
}

// 上传图片
function uploadImage(file): Promise<{ fssId: string; }> {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // formData.append("file", file);
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({
          fssId: Math.random() + ''
        });
      } else {
        reject();
      }
    }, 2000);
  })
}

// 默认初始值 fssId
const defaultFssId = ["jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ", "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ", "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ"];

// 将值转换为 UploadFile 对象
const beforeTransformUploadValues = async (fssIds) => {
  let ret = [];
  for (let i = 0; i < fssIds.length; i++) {
    let fileProp = {
      uid: -i,
      value: fssIds[i], // 用于在提交时获取真实的value
    };
    try {
      const serverPathObj = await getStaticServerPath(fssIds[i]);
      const url = serverPathObj.data;
      ret.push({
        url,
        name: url.substring(url.lastIndexOf('/') + 1),
        ...fileProp
      });
    } catch (err) {
      ret.push({
        status: 'error',
        response: '加载失败',
        ...fileProp
      });
    }
  }
  return ret;
};

const Demo: React.FC<{}> = () => {
  const [ready, setReady] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({});
  const [form] = BizForm.useForm();

  // 初次转换值
  const transformInitialValues = React.useCallback(async () => {
    setInitialValues({
      ...initialValues,
      images: await beforeTransformUploadValues(defaultFssId)
    });
    setReady(true);
  }, []);

  // 上传图片
  const handleUpload = React.useCallback((file) => {
    return uploadImage(file).then(res => {
      return { value: res.fssId }
    });
  }, []);

  React.useEffect(() => {
    transformInitialValues();
  }, []);

  return (
    <BizForm
      name="form-item-upload-1"
      form={form}
      onFinish={(values) => {
        console.log(values);
      }}
      ready={ready}
      initialValues={initialValues}
      labelCol={{
        flex: '0 0 100px'
      }}
    >
      <ItemUpload
        name="images"
        label="图片"
        type="image"
        onUpload={handleUpload}
        max={9}
        disabled={!ready}
        required
      />
    </BizForm>
  );
}

export default Demo;
