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
import { BizForm } from 'antd-more';
import { UploadFile } from 'antd/es/upload/interface';

const { ItemUpload } = BizForm;

// 上传图片
function uploadImage(file: File): Promise<{ fssId: string; }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({
          fssId: `${Math.random()}`
        });
      } else {
        reject();
      }
    }, 2000);
  })
}

const Demo: React.FC = () => {
  // 上传图片
  const handleUpload = React.useCallback((file: UploadFile) => {
    return uploadImage(file.originFileObj as File).then(res => {
      // 返回值自动添加到 file 中
      return { value: res.fssId }
    });
  }, []);

  // 提交时转换上传值
  const transformUploadValue = React.useCallback((uploadValues: (UploadFile & Record<string, any>)[]) => {
    return uploadValues ? uploadValues.filter(valItem => valItem.status !== 'error' && valItem.value).map(valItem => valItem.value) : undefined;
  }, []);

  return (
    <BizForm
      name="upload-real-time"
      onFinish={(values) => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemUpload
        name="doc"
        label="doc文档"
        maxCount={1}
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        fileTypeMessage="不支持文件类型"
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
      <ItemUpload
        name="xls"
        label="xls文档"
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        required
        fileTypeMessage="不支持文件类型"
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
      <ItemUpload
        name="images"
        label="图片"
        type="image"
        maxCount={9}
        required
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
      <ItemUpload
        name="headpic01"
        label="头像1"
        type="avatar"
        tooltip="点击图片区域上传替换，常用于头像或封面，不支持预览"
        required
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
      <ItemUpload
        name="headpic02"
        label="头像2"
        type="image"
        maxCount={1}
        tooltip="使用image的方式，修改时需要先删除才能再上传"
        required
        onUpload={handleUpload}
        transform={transformUploadValue}
      />
      <ItemUpload
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
}

export default Demo;
