import * as React from 'react';

export default React.createContext({
  transforming: false, // 转换（下载）中
  uploading: false, // 上传中
});
