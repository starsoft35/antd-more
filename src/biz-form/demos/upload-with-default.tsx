/**
 * title: 实时上传文件含默认值
 * desc: |
 *      将默认值转换成 `UploadFile[]` 数据格式再传入，数据通过异步获取的情况下可用 `ready` 标识位。当然你也可以再外部添加一个 `Spin` 组件用于显示加载状态。
 */
import * as React from 'react';
import { BizForm } from 'antd-more';
import { UploadFile } from 'antd/es/upload/interface';

const { ItemUpload } = BizForm;

// 通过fssId获取图片地址
function getStaticServerPath(fssId: string): Promise<{ data: string; }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
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
function uploadImage(file: File): Promise<{ fssId: string; }> {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // formData.append("file", file);
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({
          fssId: `${Math.random()}`
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
const beforeTransformUploadValues = async (fssIds: string[]) => {
  const ret = [];
  for (let i = 0; i < fssIds.length; i += 1) {
    try {
      const serverPathObj = await getStaticServerPath(fssIds[i]); // eslint-disable-line
      const url = serverPathObj.data;
      ret.push({
        uid: -i,
        name: url.substring(url.lastIndexOf('/') + 1),
        url,
        value: fssIds[i] // 用于在提交时获取真实的value
      });
    } catch (err) {
      ret.push({
        uid: -i,
        status: 'error',
        response: '加载失败',
        value: fssIds[i] // 用于在提交时获取真实的value
      });
    }
  }
  return ret;
};

const Demo: React.FC = () => {
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
  const handleUpload = React.useCallback((file: UploadFile) => {
    return uploadImage(file.originFileObj as File).then(res => {
      return { value: res.fssId }
    });
  }, []);

  React.useEffect(() => {
    transformInitialValues();
  }, []);

  return (
    <BizForm
      name="upload-with-default"
      form={form}
      onFinish={(values) => {
        console.log(values);
      }}
      ready={ready}
      initialValues={initialValues}
      labelWidth={98}
    >
      <ItemUpload
        name="images"
        label="图片"
        type="image"
        onUpload={handleUpload}
        maxCount={9}
        disabled={!ready}
        required
      />
    </BizForm>
  );
}

export default Demo;
