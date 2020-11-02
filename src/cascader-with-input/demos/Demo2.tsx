/**
 * title: 省市区+详细地址
 * desc: |
 *    同时适用于 `省市+详细地址`，根据 `options` 参数的层级决定的。
 *
 *    如果该表单项触发校验 `validateTrigger` 是 `onBlur`，则需要传入 `form` 实例。
 */

import React, { useCallback, useState } from 'react';
import { Form, Button } from 'antd';
import { CascaderWithInput } from 'antd-more';
import lcnData from 'lcn/lcn-form';

type ValueType = {
  addressArr: [string[], string];
};
type ReturnValue = {
  province: string;
  city: string;
  district: string;
  address: string;
};

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const buttonItemLayout = {
  wrapperCol: {
    span: 16,
    sm: {
      offset: 5,
    },
  },
};

const initialValues: ValueType = {
  addressArr: [[], ''],
};

const normalizeValues = ({ addressArr }: ValueType) => {
  let province = addressArr[0][0],
    city = addressArr[0][1],
    district = addressArr[0][2],
    address = addressArr[1] || '';
  return { province, city, district, address };
};

export default () => {
  const [params, setParams] = useState<ReturnValue>(() => normalizeValues(initialValues));
  const [form] = Form.useForm();

  const onFinish = useCallback((values) => {
    setParams(normalizeValues(values));
  }, []);

  return (
    <>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={initialValues}
        form={form}
        name="cascader_with_input_2"
      >
        <Form.Item
          label="所在地址"
          name="addressArr"
          validateFirst
          validateTrigger="onBlur"
          required
          rules={[
            {
              validator: (rule, value) => {
                let errMsg = '';

                if (value[0].length === 0 && !value[1]) {
                  errMsg = '请填写所在地址';
                } else if (value[0].length === 0) {
                  errMsg = '请选择省/市/区';
                } else if (!value[1]) {
                  errMsg = '请输入详细地址';
                }
                if (errMsg) {
                  return Promise.reject(errMsg);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <CascaderWithInput
            options={lcnData}
            form={form}
            cascaderProps={{ placeholder: '请选择省/市/区' }}
            inputProps={{ placeholder: '请输入详细地址' }}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
      <div>params: {JSON.stringify(params)}</div>
    </>
  );
};
