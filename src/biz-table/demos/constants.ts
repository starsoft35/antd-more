// 审核状态
export enum ApproveStatus {
  Processing = 1,
  Success,
  Error
}

// 审核状态选项
export const ApproveStatusOptions = [
  {
    name: '待审核',
    value: ApproveStatus.Processing,
    badge: {
      status: 'processing'
    }
  },
  {
    name: '审核通过',
    value: 2,
    badge: {
      status: 'success'
    }
  },
  {
    name: '审核拒绝',
    value: 3,
    badge: {
      status: 'error'
    }
  },
];

// 银行
export enum Bank {
  BOC = 'BOC',
  BCM = 'BCM',
  ABC = 'ABC'
}

// 银行选项
export const BankOptions = [
  {
    name: '中国银行',
    value: Bank.BOC
  },
  {
    name: '交通银行',
    value: Bank.BCM
  },
  {
    name: '中国农业银行',
    value: Bank.ABC
  },
];