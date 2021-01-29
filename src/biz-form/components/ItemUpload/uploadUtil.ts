export { isPromiseLike, bytesToSize } from 'util-helpers';

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
    if (
      file.type === type ||
      (type.indexOf('.') === 0 && file.name.substr(file.name.length - type.length) === type)
    ) {
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
