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