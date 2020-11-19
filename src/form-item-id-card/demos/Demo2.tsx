/**
 * title: 脱敏校验
 * desc: |
 *    允许输入脱敏符号 `*` 。
 * 
 *    从服务获取的脱敏值传入 `initialValue` ，校验时进行比较。如果不一致就进行正常的验证流程。一致就表示没有变动，直接将脱敏数据再提交给服务。服务验证数据含有脱敏信息就不做更新该项，否则正常验证和更新。
 */
import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemIdCard } from 'antd-more';

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const buttonLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 },
  }
}

const Demo: React.FC<{}> = () => {
  const [result, setResult] = React.useState();
  const onFinish = React.useCallback((values) => {
    setResult(values);
  }, []);

  const initialValues = React.useMemo(() => ({
    idCard: '130***********2288'
  }), []);

  return (
    <>
      <Form
        name='form-item-id-card-demo2'
        initialValues={initialValues}
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemIdCard name='idCard' label='身份证号' required security initialValue={initialValues.idCard} />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;