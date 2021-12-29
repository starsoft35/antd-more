// 审核状态
// 1-待审核 2-审核通过 3-审核拒绝
export enum ApproveStatus {
  Processing = 1,
  Success,
  Error
}

// 审核状态选项
export const ApproveStatusOptions = [
  {
    label: '待审核',
    value: ApproveStatus.Processing,
    badge: {
      status: 'processing'
    }
  },
  {
    label: '审核通过',
    value: 2,
    badge: {
      status: 'success'
    }
  },
  {
    label: '审核拒绝',
    value: 3,
    badge: {
      status: 'error'
    }
  }
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
    label: '中国银行',
    value: Bank.BOC
  },
  {
    label: '交通银行',
    value: Bank.BCM
  },
  {
    label: '中国农业银行',
    value: Bank.ABC
  }
];
