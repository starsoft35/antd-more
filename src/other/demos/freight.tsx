import * as React from 'react';
import { Table, Button, message } from 'antd';
import { useAsync } from 'rc-hooks';
import Mockjs from 'mockjs';
import waitTime from './utils/waitTime';
import FreightRule, { FreightRuleType } from './components/FreightRule';

type DataItem = {
  freight: number;
  freightRule: number;
  id: number;
  name: string;
}

const services = {
  async getData() {
    await waitTime();
    const { data } = Mockjs.mock({
      'data|3-5': [{
        freight: '@float(0.01,999,0,2)',
        freightRule: '@integer(0,2)',
        'id|+1': 0,
        name: '@city'
      }]
    });
    return {
      success: true,
      data: data.map(item => {
        if ((item.freightRule as unknown as number) !== FreightRuleType.Need) {
          return {
            ...item,
            freight: 0
          }
        }
        return item;
      })
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(data) {
    await waitTime();
    return {
      success: true
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      // eslint-disable-next-line
      const { type, ...rest } = action;

      if (state.find(item => item.id === action.id)) {
        return state.map(item => {
          if (item.id === action.id) {
            return {
              ...item,
              ...rest
            };
          }
          return item;
        });
      }
      return [...state, rest]
    case 'clear':
      return [];
    default:
      return state;
  }
}

export interface FreightProps { }

const Freight: React.FC<FreightProps> = () => {
  const [state, dispatch] = React.useReducer(reducer, []);

  const columns = [
    {
      title: '地区',
      dataIndex: 'name',
      width: 170
    },
    {
      title: '规则',
      dataIndex: 'freightRule',
      render: (_, record) => {
        const currentState = state.find(item => item.id === record.id);
        return (
          <FreightRule
            {...record}
            {...currentState}
            onChange={(values) => {
              dispatch({
                type: 'update',
                ...values
              })
            }}
          />
        )
      }
    },
  ];

  const { data = [], refresh: refreshData, loading } = useAsync<DataItem[]>(() => services.getData().then(res => res.data));
  const { run: update, loading: updating } = useAsync(() => services.update(state), {
    autoRun: false
  });

  const handleUpdate = () => {
    if (!state || state.length === 0) {
      message.info('没有修改项');
      return;
    }
    if (state.find(item => item.freightRule === FreightRuleType.Need && item.freight === 0)) {
      message.error('运费不能为0');
      return;
    }
    update().then(() => {
      dispatch({ type: 'clear' });
      refreshData();
    });
  }

  return (
    <>
      <Table<DataItem>
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey='id'
        loading={loading || updating}
      />
      <Button type='primary' onClick={handleUpdate} disabled={loading} loading={updating} style={{ marginTop: 24 }}>更新</Button>
    </>
  );
}

export default Freight;