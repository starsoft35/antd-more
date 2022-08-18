import { blobToDataURL } from 'util-helpers';
import IconAudio from '../assets/icon-audio.png';
import IconExcel from '../assets/icon-excel.png';
import IconFile from '../assets/icon-file.png';
import IconPdf from '../assets/icon-pdf.png';
import IconWord from '../assets/icon-word.png';
import IconVideo from '../assets/icon-video.png';

export function isImageType(file?: File) {
  return file?.type.indexOf('image/') > -1;
}
export function isAudioType(file?: File) {
  return file?.type.indexOf('audio/') > -1;
}
export function isVideoType(file?: File) {
  return file?.type.indexOf('video/') > -1;
}
export function isPdfType(file?: File) {
  return file?.type === 'application/pdf' || file?.name.lastIndexOf('.pdf') > -1;
}
export function isWordType(file?: File) {
  return (
    file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file?.name.lastIndexOf('.doc') > -1 ||
    file?.name.lastIndexOf('.docx') > -1
  );
}
export function isExcelType(file?: File) {
  return (
    file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file?.type === 'application/vnd.ms-excel' ||
    file?.name.lastIndexOf('.xls') > -1 ||
    file?.name.lastIndexOf('.xlsx') > -1
  );
}

export function getFileType(file?: File) {
  if (isImageType(file)) {
    return 'image';
  }
  if (isPdfType(file)) {
    return 'pdf';
  }
  if (isAudioType(file)) {
    return 'audio';
  }
  if (isVideoType(file)) {
    return 'video';
  }
  if (isWordType(file)) {
    return 'word';
  }
  if (isExcelType(file)) {
    return 'excel';
  }
}

export async function getThumbUrl(file?: File) {
  // 图片类型内部会自动处理 thumbUrl
  if (isImageType(file)) {
    const url = await blobToDataURL(file);
    return url;
  }
  if (isAudioType(file)) {
    return IconAudio;
  }
  if (isVideoType(file)) {
    return IconVideo;
  }
  if (isPdfType(file)) {
    return IconPdf;
  }
  if (isWordType(file)) {
    return IconWord;
  }
  if (isExcelType(file)) {
    return IconExcel;
  }
  return IconFile;
}
