// 审核状态
export enum ApproveStatus {
  Processing = 1,
  Success,
  Error
}

// 审核状态选项
export const ApproveStatusOptions = [
  {
    value: ApproveStatus.Processing,
    name: "审核中",
    badge: {
      status: "processing"
    },
    tag: {
      alias: "待审核",
      color: "orange"
    }
  },
  {
    value: ApproveStatus.Success,
    name: "审核通过",
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
    value: ApproveStatus.Error,
    name: "审核不通过",
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