import Mock from 'mockjs';
import type { ApproveStatus } from './constants';

export type DataItem = {
  applyCode: string;
  applicantName: string;
  approverName: string;
  createTime: string;
  approveTime: string;
  approveResult: ApproveStatus;
  money: number;
};

type ApplyListResponse = {
  data: DataItem[];
  pageInfo: {
    total: number;
    pages: number;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const applyList = ({ page: { pageNum, pageSize }, data = {} }) =>
  Mock.mock({
    [`data|${pageSize}`]: [
      {
        applyCode: '@word(6)',
        applicantName: '@cname',
        approverName: '@cname',
        createTime: '@datetime',
        approveTime: '@datetime',
        'approveResult|1-3': 1,
        'money|0-10000.0-2': 0
      }
    ],
    pageInfo: {
      total: 50,
      pages: 10
    }
  }) as ApplyListResponse;

export function getApplyList(params) {
  return new Promise<ApplyListResponse>((resolve) => {
    setTimeout(() => {
      resolve(applyList(params));
    }, 1000);
  });
}
