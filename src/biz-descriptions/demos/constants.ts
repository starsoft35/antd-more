// 审核状态
export const ApproveStatus = [
  {
    value: 1,
    name: '审核中',
    badge: {
      status: "processing"
    },
    tag: {
      alias: "待审核",
      color: "orange"
    }
  },
  {
    value: 2,
    name: '审核通过',
    text: {
      style: {
        color: "green"
      }
    },
    badge: {
      status: "success"
    },
    tag: {
      color: "green"
    }
  },
  {
    value: 3,
    name: '审核不通过',
    text: {
      style: {
        color: "red"
      }
    },
    badge: {
      status: "error"
    },
    tag: {
      color: "red"
    }
  },
];