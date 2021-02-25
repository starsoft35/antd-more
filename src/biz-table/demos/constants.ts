// 审核状态
export const ApproveStatus = [
  {
    name: "待审核",
    value: 1,
    badge: {
      status: "processing"
    }
  },
  {
    name: "审核通过",
    value: 2,
    badge: {
      status: "success"
    }
  },
  {
    name: "审核拒绝",
    value: 3,
    badge: {
      status: "error"
    }
  },
];

// 银行
export const Bank = [
  {
    name: "中国银行",
    value: "BOC"
  },
  {
    name: "交通银行",
    value: "BCM"
  },
  {
    name: "中国农业银行",
    value: "ABC"
  },
];