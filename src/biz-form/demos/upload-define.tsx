import * as React from 'react';
import { BizForm } from 'antd-more';
// import { UploadFile } from "antd/lib/upload/interface";
// import { waitTime } from 'util-helpers';
import ItemUploadSpecial from './components/ItemUploadSpecial';

// // 上传图片
// async function uploadImage(file: File) {
//   await waitTime(2000);
//   if (Math.random() > 0.3) {
//     return {
//       fssId: `${Math.random()}`
//     };
//   }
//   throw new Error('error');
// }

const Demo = () => {
  // // 上传图片
  // const handleUpload = React.useCallback((file: File) => {
  //   return uploadImage(file).then(res => {
  //     // 返回值自动添加到 file 中
  //     return { value: res.fssId }
  //   });
  // }, []);

  // // 提交时转换上传值
  // const transformUploadValue = React.useCallback((uploadValues: (UploadFile & Record<string, any>)[]) => {
  //   return uploadValues ? uploadValues.filter(valItem => valItem.status !== "error" && valItem.value).map(valItem => valItem.value) : undefined;
  // }, []);

  return (
    <BizForm
      name="upload-define"
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ItemUploadSpecial
        name="upload"
        label="材料文件"
        uploadProps={{
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          name: 'file',
          headers: {
            authorization: 'authorization-text'
          }
        }}
        transform={(files) => {
          return files.map((item) => item?.response?.url).filter((item) => !!item); // 项目中可能没有url，而是一个文件id
        }}
      />
    </BizForm>
  );
};

export default Demo;
