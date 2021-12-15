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
        value: 'MERCHANT_LIST',
        children: [
          {
            label: '商户查询',
            value: 'MERCHANT_QUERY',
            children: [
              {
                label: '操作1',
                value: 'MERCHANT_QUERY_ACTION1'
              },
              {
                label: '操作2',
                value: 'MERCHANT_QUERY_ACTION2'
              }
            ]
          },
          {
            label: '查看商户详情',
            value: 'MERCHANT_DETAIL'
          },
          {
            label: '新增商户',
            value: 'MERCHANT_ADD'
          }
        ]
      }
    ]
  },
  {
    label: '交易管理',
    value: 'TRADE',
    children: [
      {
        label: '交易查询',
        value: 'TRADE_LIST',
        children: [
          {
            label: '交易查询',
            value: 'TRADE_QUERY'
          },
          {
            label: '交易详情',
            value: 'TRADE_DETAIL'
          }
        ]
      }
    ]
  },
  {
    label: '风控管理',
    value: 'RISK',
    children: [
      {
        value: 'RISK_LIST',
        label: '风控记录查询',
        children: [
          {
            value: 'RISK_QUERY',
            label: '风控记录查询'
          },
          {
            value: 'RISK_DETAIL',
            label: '查看商户详情'
          },
          {
            value: 'RISK_ADD',
            label: '新增商户处罚管理'
          }
        ]
      }
    ]
  },
  {
    label: '对账管理',
    value: 'RECON',
    children: [
      {
        value: 'RECON_OPERATION',
        label: '运营机构对账',
        children: [
          {
            value: 'RECON_OPERATION_QUERY',
            label: '对账记录查询'
          }
        ]
      }
    ]
  },
  {
    label: '运营平台管理',
    value: 'OPERATION',
    children: [
      {
        value: 'OPERATION_ROLE',
        label: '角色管理',
        children: [
          {
            value: 'OPERATION_ROLE_ADD',
            label: '新增角色'
          },
          {
            value: 'OPERATION_ROLE_UPDATE',
            label: '修改角色'
          },
          {
            value: 'OPERATION_ROLE_QUERY',
            label: '查询角色列表',
            disabled: true
          }
        ]
      },
      {
        value: 'OPERATION_ACCOUNT',
        label: '账号管理',
        children: [
          {
            value: 'OPERATION_ACCOUNT_QUERY',
            label: '账号查询'
          },
          {
            value: 'OPERATION_ACCOUNT_ADD',
            label: '新增账号'
          },
          {
            value: 'OPERATION_ACCOUNT_UPDATE',
            label: '编辑账号'
          }
        ]
      },
      {
        value: 'OPERATION_LOG',
        label: '日志管理',
        children: [
          {
            value: 'OPERATION_LOG_QUERY',
            label: '日志查询'
          }
        ]
      }
    ]
  }
];
