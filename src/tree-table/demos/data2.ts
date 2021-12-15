export default [
  {
    label: '首页',
    value: 'HOME'
  },
  {
    label: '商户管理',
    value: 'MERCHANT',
    children: [
      {
        label: '商户查询',
        value: 'MERCHANT_LIST'
      }
    ]
  },
  {
    label: '交易管理',
    value: 'TRADE',
    children: [
      {
        label: '交易查询',
        value: 'TRADE_LIST'
      },
      {
        label: '交易配置',
        value: 'TRADE_CONFIG'
      }
    ]
  },
  {
    label: '风控管理',
    value: 'RISK',
    children: [
      {
        value: 'RISK_LIST',
        label: '风控记录查询'
      }
    ]
  },
  {
    label: '对账管理',
    value: 'RECON',
    children: [
      {
        value: 'RECON_OPERATION',
        label: '运营机构对账'
      }
    ]
  },
  {
    label: '运营平台管理',
    value: 'OPERATION',
    children: [
      {
        value: 'OPERATION_ROLE',
        label: '角色管理'
      },
      {
        value: 'OPERATION_ACCOUNT',
        label: '账号管理'
      },
      {
        value: 'OPERATION_LOG',
        label: '日志管理'
      }
    ]
  }
];
