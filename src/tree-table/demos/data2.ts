export default [
  {
    title: '首页',
    value: 'HOME'
  },
  {
    title: '商户管理',
    value: 'MERCHANT',
    children: [
      {
        title: '商户查询',
        value: 'MERCHANT_LIST'
      }
    ]
  },
  {
    title: '交易管理',
    value: 'TRADE',
    children: [
      {
        title: '交易查询',
        value: 'TRADE_LIST'
      },
      {
        title: '交易配置',
        value: 'TRADE_CONFIG'
      }
    ]
  },
  {
    title: '风控管理',
    value: 'RISK',
    children: [
      {
        value: 'RISK_LIST',
        title: '风控记录查询'
      }
    ]
  },
  {
    title: '对账管理',
    value: 'RECON',
    children: [
      {
        value: 'RECON_OPERATION',
        title: '运营机构对账'
      }
    ]
  },
  {
    title: '运营平台管理',
    value: 'OPERATION',
    children: [
      {
        value: 'OPERATION_ROLE',
        title: '角色管理'
      },
      {
        value: 'OPERATION_ACCOUNT',
        title: '账号管理'
      },
      {
        value: 'OPERATION_LOG',
        title: '日志管理'
      }
    ]
  }
];
