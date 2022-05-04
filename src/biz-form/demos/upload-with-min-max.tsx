/**
 * title: 上传文件含大中小图
 * desc: |
 *      将默认值转换成 `UploadFile[]` 数据格式再传入，数据通过异步获取的情况下可用 `ready` 标识位。当然你也可以再外部添加一个 `Spin` 组件用于显示加载状态。
 */
import * as React from 'react';
import { BizForm, BizFormItemUpload } from 'antd-more';
import { waitTime } from 'util-helpers';

// 通过fssId获取图片地址
async function getStaticServerPath(fssId: string) {
  await waitTime(2000);
  if (Math.random() > 0.3) {
    return {
      bigImg: `https://zos.alipayobjects.com/rmsportal/${fssId}.png`,
      thumbImg: `https://www.caijinfeng.com/assets/images/logo-doly@3x.png`
    };
  }
  throw new Error('error');
}

// 上传图片
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadImage(file: File) {
  await waitTime(2000);
  if (Math.random() > 0.5) {
    return {
      thumbImgId: `${Math.random()}`,
      bigImgId: `${Math.random()}`
    };
  }
  throw new Error('error');
}

// 默认初始值 fssId
const defaultFssId = [
  {
    thumbImgId: 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ',
    bigImgId: 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ'
  },
  {
    thumbImgId: 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ',
    bigImgId: 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ'
  },
  {
    thumbImgId: 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ',
    bigImgId: 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ'
  }
];

// 将值转换为 UploadFile 对象
const beforeTransformUploadValues = async (fssIds: Record<string, any>[]) => {
  const ret = [];
  for (let i = 0; i < fssIds.length; i += 1) {
    const fileProp = {
      uid: -i,
      thumbImgId: fssIds[i].thumbImgId, // 用于在提交时获取真实的value
      bigImgId: fssIds[i].bigImgId
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

const Demo = () => {
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
  }, [initialValues]);

  // 上传图片
  const handleUpload = React.useCallback((file: File) => {
    return uploadImage(file).then((res) => {
      return { thumbImgId: res.thumbImgId, bigImgId: res.thumbImgId };
    });
  }, []);

  React.useEffect(() => {
    transformInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BizForm
      name="upload-with-min-max"
      form={form}
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
      ready={ready}
      initialValues={initialValues}
      labelWidth={98}
    >
      <BizFormItemUpload
        name="images"
        label="图片"
        type="image"
        onUpload={handleUpload}
        // onGetPreviewUrl={async () => "https://www.caijinfeng.com/assets/images/logo-doly@3x.png"}
        maxCount={9}
        disabled={!ready}
        required
        // uploadProps={{
        //   onPreview: () => {

        //   }
        // }}
      />
    </BizForm>
  );
};

export default Demo;
