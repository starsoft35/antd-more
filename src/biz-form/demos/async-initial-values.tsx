import * as React from 'react';
import { BizForm, BizFormItemInput } from 'antd-more';
import { waitTime } from 'util-helpers';

async function getNameApi() {
  await waitTime(2000);
  return '李四';
}

const Demo = () => {
  const [ready, setReady] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({ name: '张三' });

  React.useEffect(() => {
    getNameApi().then((name) => {
      setInitialValues({ name });
      setReady(true);
    });
  }, []);

  return (
    <BizForm
      name="form-async-initial-values"
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
      ready={ready}
      initialValues={initialValues}
    >
      <BizFormItemInput label="姓名" name="name" />
    </BizForm>
  );
};

export default Demo;
