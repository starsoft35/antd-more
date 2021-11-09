// 周期
export enum Cycle {
  Day,
  Month,
  Quarter
}

// 周期选项
export const CycleOptions = [
  {
    label: '按日',
    value: Cycle.Day
  },
  {
    label: '按月',
    value: Cycle.Month
  },
  {
    label: '按季度',
    value: Cycle.Quarter
  }
];

// 返佣周期
export enum RakebackeCycle {
  Day,
  Month
}

// 返佣周期选项
export const RakebackeCycleOptions = [
  {
    label: '日返',
    value: RakebackeCycle.Day
  },
  {
    label: '月返',
    value: RakebackeCycle.Month
  }
];

// 收款账号选项
export const BillAccountOptions = [
  {
    label: '张三',
    value: 'a'
  },
  {
    label: '李四',
    value: 'b'
  }
];
