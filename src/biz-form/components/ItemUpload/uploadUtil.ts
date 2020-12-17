// 获取base64文件
export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

// 检查文件类型
export function checkFileType(file: File, accept?: string): boolean {
  if (!accept || !accept.trim()) {
    return true;
  }

  const types = accept.split(/,(?:\s+)?/);
  let ret = false;
  types.some((type) => {
    // .doc .docx .jpg .png
    if (type.indexOf('.') === 0) {
      if (file.name.substr(file.name.length - type.length) === type) {
        ret = true;
      }
    } else if (file.type === type) {
      ret = true;
    }
    return ret;
  });

  return ret;
}

// 检查文件大小
export function checkFileSize(file: File, size: number): boolean {
  return file.size < size;
}

// 字节转为单位
export function bytesToSize(bytes: number): string {
  if (bytes === 0) return '0B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line
  return Number((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
}

// 判断是否为promise
export function isPromiseLike(obj: any) {
  return (
    obj !== null &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

// 获取文件名
export function getFileName(url: string): string {
  if (typeof url !== 'string' || !url) {
    return '';
  }

  let divider = '/';

  if (url.indexOf('\\') > -1) {
    divider = '\\';
  }

  const pathArr = url.split(divider);
  return pathArr[pathArr.length - 1] || '';
}
