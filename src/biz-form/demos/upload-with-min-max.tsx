/**
 * title: 上传文件含大中小图
 * desc: |
 *      将默认值转换成 `UploadFile[]` 数据格式再传入，数据通过异步获取的情况下可用 `ready` 标识位。当然你也可以再外部添加一个 `Spin` 组件用于显示加载状态。
 */
import * as React from 'react';
import { BizForm } from 'antd-more';
import { UploadFile } from 'antd/es/upload/interface';

const { ItemUpload } = BizForm;

// 通过fssId获取图片地址
function getStaticServerPath(fssId: string): Promise<{ bigImg: string; thumbImg: string; }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({
          bigImg: `https://zos.alipayobjects.com/rmsportal/${fssId}.png`,
          thumbImg: `https://www.caijinfeng.com/assets/images/logo-doly@3x.png`,
        });
      } else {
        reject();
      }
    }, 2000);
  })
}

// 上传图片
function uploadImage(file: File): Promise<{ thumbImgId: string; bigImgId: string; }> {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // formData.append("file", file);
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({
          thumbImgId: `${Math.random()}`,
          bigImgId: `${Math.random()}`
        });
      } else {
        reject();
      }
    }, 2000);
  })
}

// 默认初始值 fssId
const defaultFssId = [
  {
    thumbImgId: "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ",
    bigImgId: "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ"
  },
  {
    thumbImgId: "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ",
    bigImgId: "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ"
  },
  {
    thumbImgId: "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ",
    bigImgId: "jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ"
  }
];

// 将值转换为 UploadFile 对象
const beforeTransformUploadValues = async (fssIds: Record<string, any>[]) => {
  const ret = [];
  for (let i = 0; i < fssIds.length; i += 1) {
    const fileProp = {
      uid: -i,
      thumbImgId: fssIds[i].thumbImgId, // 用于在提交时获取真实的value
      bigImgId: fssIds[i].bigImgId,
    };
    try {
      const { bigImg, thumbImg } = await getStaticServerPath(fssIds[i].thumbImgId); // eslint-disable-line
      ret.push({
        url: bigImg,
        thumbUrl: thumbImg,
        name: bigImg.substring(bigImg.lastIndexOf('/') + 1),
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
      return { thumbImgId: res.thumbImgId, bigImgId: res.thumbImgId }
    });
  }, []);

  React.useEffect(() => {
    transformInitialValues();
  }, []);

  return (
    <BizForm
      name="upload-with-min-max"
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
        // onGetPreviewUrl={async () => 'https://www.caijinfeng.com/assets/images/logo-doly@3x.png'}
        maxCount={9}
        disabled={!ready}
        required
      // uploadProps={{
      //   onPreview: ()=>{

      //   }
      // }}
      />
    </BizForm>
  );
}

export default Demo;
