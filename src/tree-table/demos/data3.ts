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
        value: 'MERCHANT_LIST',
        children: [
          {
            title: '商户查询',
            value: 'MERCHANT_QUERY',
            children: [
              {
                title: '操作1',
                value: 'MERCHANT_QUERY_ACTION1'
              },
              {
                title: '操作2',
                value: 'MERCHANT_QUERY_ACTION2'
              }
            ]
          },
          {
            title: '查看商户详情',
            value: 'MERCHANT_DETAIL'
          },
          {
            title: '新增商户',
            value: 'MERCHANT_ADD'
          }
        ]
      }
    ]
  },
  {
    title: '交易管理',
    value: 'TRADE',
    children: [
      {
        title: '交易查询',
        value: 'TRADE_LIST',
        children: [
          {
            title: '交易查询',
            value: 'TRADE_QUERY'
          },
          {
            title: '交易详情',
            value: 'TRADE_DETAIL'
          }
        ]
      }
    ]
  },
  {
    title: '风控管理',
    value: 'RISK',
    children: [
      {
        value: 'RISK_LIST',
        title: '风控记录查询',
        children: [
          {
            value: 'RISK_QUERY',
            title: '风控记录查询'
          },
          {
            value: 'RISK_DETAIL',
            title: '查看商户详情'
          },
          {
            value: 'RISK_ADD',
            title: '新增商户处罚管理'
          }
        ]
      }
    ]
  },
  {
    title: '对账管理',
    value: 'RECON',
    children: [
      {
        value: 'RECON_OPERATION',
        title: '运营机构对账',
        children: [
          {
            value: 'RECON_OPERATION_QUERY',
            title: '对账记录查询'
          }
        ]
      }
    ]
  },
  {
    title: '运营平台管理',
    value: 'OPERATION',
    children: [
      {
        value: 'OPERATION_ROLE',
        title: '角色管理',
        children: [
          {
            value: 'OPERATION_ROLE_ADD',
            title: '新增角色'
          },
          {
            value: 'OPERATION_ROLE_UPDATE',
            title: '修改角色'
          },
          {
            value: 'OPERATION_ROLE_QUERY',
            title: '查询角色列表',
            disabled: true
          }
        ]
      },
      {
        value: 'OPERATION_ACCOUNT',
        title: '账号管理',
        children: [
          {
            value: 'OPERATION_ACCOUNT_QUERY',
            title: '账号查询'
          },
          {
            value: 'OPERATION_ACCOUNT_ADD',
            title: '新增账号'
          },
          {
            value: 'OPERATION_ACCOUNT_UPDATE',
            title: '编辑账号'
          }
        ]
      },
      {
        value: 'OPERATION_LOG',
        title: '日志管理',
        children: [
          {
            value: 'OPERATION_LOG_QUERY',
            title: '日志查询'
          }
        ]
      }
    ]
  }
];
