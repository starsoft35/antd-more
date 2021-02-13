/**
 * title: 异步初始值
 * desc: |
 *      可通过 `ready` 控制表单是否已准备好（如表单的初始值需要通过异步获取）。
 */
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemInput } = BizForm;

function getNameApi(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('李四');
    }, 2000);
  })
}

const Demo: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({ name: '张三' });

  React.useEffect(() => {
    getNameApi().then((name) => {
      setInitialValues({ name })
      setReady(true);
    });
  }, []);

  return (
    <BizForm
      name="form-async-initial-values"
      onFinish={values => {
        console.log(values);
      }}
      ready={ready}
      initialValues={initialValues}
    >
      <ItemInput label="姓名" name="name" />
    </BizForm>
  );
}

export default Demo;