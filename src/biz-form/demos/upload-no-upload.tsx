/**
 * title: 提交时一次性上传所有文件
 * desc: |
 *      不设置 `onUpload` 即可
 */
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemUpload } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="upload-no-upload"
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
      />
      <ItemUpload
        name="xls"
        label="xls文档"
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        required
        fileTypeMessage="不支持文件类型"
      />
      <ItemUpload
        name="images"
        label="图片"
        type="image"
        tooltip="配置multiple后，支持多选"
        maxCount={9}
        required
        multiple
      />
      <ItemUpload
        name="headpic01"
        label="头像1"
        type="avatar"
        tooltip="点击图片区域上传替换，常用于头像或封面，不支持预览"
        required
      />
      <ItemUpload
        name="headpic02"
        label="头像2"
        type="image"
        maxCount={1}
        tooltip="使用image的方式，修改时需要先删除才能再上传"
        required
      />
      <ItemUpload
        name="dragger"
        label="拖拽上传"
        type="dragger"
        required
        multiple
      />
    </BizForm>
  );
}

export default Demo;
