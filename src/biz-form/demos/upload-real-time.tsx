/**
 * title: 实时上传文件图片
 * desc: |
 *      设置 `onUpload` 后，添加上传文件自动调用并处理上传中状态和失败状态。上传成功的返回值将自动添加到 `UploadFile` 对象。
 *
 *      这里通过 `value` 标识对应文件的 `fssId` ，提交时再获取该值。
 *
 *      如果设置 `transform` 可以帮助内置的规则进行校验。
 */
import * as React from 'react';
import { BizForm, BizFormList, BizFormItemUpload } from 'antd-more';
import type { UploadFile } from 'antd/lib/upload/interface';
import waitTime from '../../utils/waitTime';

// 上传图片
async function uploadImage(file: File): Promise<{ fssId: string }> {
  await waitTime(2000);
  if (Math.random() > 0.3) {
    return {
      fssId: `${Math.random()}`
    };
  }
  throw new Error('errro');
}

const Demo = () => {
  // 上传图片
  const handleUpload = React.useCallback((file) => {
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
      name="upload-real-time"
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
      labelWidth={98}
    >
      <BizFormItemUpload
        name="doc"
        label="doc文档"
        maxCount={1}
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        fileTypeMessage="不支持文件类型"
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
        name="xls"
        label="xls文档"
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        required
        fileTypeMessage="不支持文件类型"
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
        name="images"
        label="图片"
        type="image"
        maxCount={9}
        required
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
        //   return files.map(item => item?.response?.fssId).filter(item => !!item);
        // }}
      />
      <BizFormItemUpload
        name="headpic01"
        label="头像1"
        type="avatar"
        tooltip="点击图片区域上传替换，常用于头像或封面，不支持预览"
        required
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
      <BizFormItemUpload
        name="headpic02"
        label="头像2"
        type="image"
        maxCount={1}
        tooltip="使用image的方式，修改时需要先删除才能再上传"
        required
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
      {/* <BizFormList name='test' initialValue={[{ headpic03: [] }]}>
        {
          fields => fields.map(field => (
            <BizFormItemUpload
              {...field}
              key={field.key}
              name={[field.name, 'headpic03']}
              label="头像3"
              type="image"
              maxCount={1}
              tooltip="使用image的方式，修改时需要先删除才能再上传"
              required
              onUpload={handleUpload}
              transform={transformUploadValue}
            />
          ))
        }
      </BizFormList> */}
      <BizFormItemUpload
        name="dragger"
        label="拖拽上传"
        type="dragger"
        required
        multiple
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
    </BizForm>
  );
};

export default Demo;
