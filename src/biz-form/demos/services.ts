import { waitTime } from "util-helpers";

// 上传文件
export async function uploadFile(file: File): Promise<{ fssId: string }> {
  console.log('uploadFile: ', file);

  await waitTime(2000);
  if (Math.random() > 0.3) {
    return {
      fssId: `${Math.random().toString(16).substring(2)}`
    };
  }
  throw new Error('error');
}

// 下载文件
export async function downloadFile(fssId: string) {
  console.log('downloadFile: ', fssId);

  await waitTime(2000);
  if (Math.random() > 0.3) {
    return {
      data: `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`
    };
  }
  throw new Error('error');
}

