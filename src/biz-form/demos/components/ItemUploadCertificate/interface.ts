// 文件类型
// 1-身份证正面图片/护照照片 ; 2-身份证反面图片 ; 4-三证合一营业执照图片 ; 19-商业登记证 ; 30 -董事会议授权书
export enum FileType {
  IdCardFront = '1',
  IdCardBack = '2',
  BusinessLicense = '4',
  BusinessRegistry = '19',
  Authorization = '30'
}
