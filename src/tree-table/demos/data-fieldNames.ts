export default [
  {
    name: '首页',
    code: 'HOME'
  },
  {
    name: '商户管理',
    code: 'MERCHANT',
    childs: [
      {
        name: '商户查询',
        code: 'MERCHANT_LIST'
      }
    ]
  },
  {
    name: '交易管理',
    code: 'TRADE',
    childs: [
      {
        name: '交易查询',
        code: 'TRADE_LIST'
      },
      {
        name: '交易配置',
        code: 'TRADE_CONFIG'
      }
    ]
  },
  {
    name: '风控管理',
    code: 'RISK',
    childs: [
      {
        code: 'RISK_LIST',
        name: '风控记录查询'
      }
    ]
  },
  {
    name: '对账管理',
    code: 'RECON',
    childs: [
      {
        code: 'RECON_OPERATION',
        name: '运营机构对账'
      }
    ]
  },
  {
    name: '运营平台管理',
    code: 'OPERATION',
    childs: [
      {
        code: 'OPERATION_ROLE',
        name: '角色管理'
      },
      {
        code: 'OPERATION_ACCOUNT',
        name: '账号管理'
      },
      {
        code: 'OPERATION_LOG',
        name: '日志管理'
      }
    ]
  }
];
