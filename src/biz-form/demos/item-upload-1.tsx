import * as React from 'react';
import { BizForm, BizFormItemUpload } from 'antd-more';
import type { UploadFile } from 'antd/lib/upload/interface';
import ItemSpecialUpload from './components/ItemSpecialUpload';
import ItemDefineUpload from './components/ItemDefineUpload';
import { waitTime } from 'util-helpers';

// 上传图片
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadImage(file: File): Promise<{ fssId: string }> {
  await waitTime(2000);
  if (Math.random() > 0.3) {
    return {
      fssId: `${Math.random()}`
    };
  }
  throw new Error('error');
}

const Demo = () => {
  // 上传图片
  const handleUpload = React.useCallback((file: File) => {
    return uploadImage(file).then((res) => {
      // 返回值自动添加到 file 中
      return { value: res.fssId };
    });
  }, []);

  // 提交时转换上传值
  const transformUploadValue = React.useCallback(
    (uploadValues: (UploadFile & Record<string, any>)[]) => {
      return uploadValues
        ? uploadValues
            .filter((valItem) => valItem.status !== 'error' && valItem.value)
            .map((valItem) => valItem.value)
        : undefined;
    },
    []
  );

  return (
    <BizForm
      name="item-upload-1"
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
      labelWidth={112}
    >
      <BizFormItemUpload name="upload" label="Upload" />
      <BizFormItemUpload
        name="doc"
        label="doc文档"
        maxCount={1}
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        fileTypeMessage="不支持文件类型"
      />
      <BizFormItemUpload
        name="xls"
        label="xls文档"
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        // required
        fileTypeMessage="不支持文件类型"
      />
      <BizFormItemUpload
        name="images"
        label="图片"
        type="image"
        tooltip="配置multiple后，支持多选"
        maxCount={9}
        // required
        multiple
        // 使用自定义上传
        onUpload={handleUpload}
        transform={transformUploadValue}

        // 使用 action 上传
        // uploadProps={{
        //   name: "file",
        //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        //   headers: {
        //     authorization: "authorization-text",
        //   }
        // }}
        // transform={(files) => {
        //   return files.map(item => item?.response?.fssId).filter(item=>!!item);
        // }}
      />
      <BizFormItemUpload
        name="headpic01"
        label="头像1"
        type="avatar"
        tooltip="点击图片区域上传替换，常用于头像或封面，不支持预览"
        // required
      />
      <BizFormItemUpload
        name="headpic02"
        label="头像2"
        type="image"
        maxCount={1}
        tooltip="使用image的方式，修改时需要先删除才能再上传"
        // required
      />
      <BizFormItemUpload
        name="dragger"
        label="拖拽上传"
        type="dragger"
        // required
        multiple
      />
      <ItemSpecialUpload
        name="special-upload-1"
        label="特殊自定义1"
        tooltip="自定义上传后的显示，将删除改为重新上传"
        uploadProps={{
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          name: 'file',
          headers: {
            authorization: 'authorization-text'
          }
        }}
        transform={(files) => {
          return files?.map((item) => item?.response?.url).filter((item) => !!item); // 实际项目中服务端可能没有返回url，而是返回文件id
        }}
      />
      <ItemDefineUpload
        name="special-upload-2"
        label="特殊自定义2"
        title="上传身份证件"
        tooltip="自定义右侧内容"
        uploadProps={{
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          name: 'file',
          headers: {
            authorization: 'authorization-text'
          }
        }}
        transform={(files) => {
          return files?.map((item) => item?.response?.url).filter((item) => !!item); // 实际项目中服务端可能没有返回url，而是返回文件id
        }}
      />
    </BizForm>
  );
};

export default Demo;
