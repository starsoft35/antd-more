/**
 * title: 脱敏校验
 * desc: |
 *      常用于修改页面，并且数据源由服务端进行脱敏。
 *
 *      先将表单项和初始数据进行比较，如果不一致就进行正常的验证流程。一致就表示没有变动，直接将脱敏数据提交给服务。服务逐项验证数据含有脱敏信息就不做更新该项，否则正常验证和更新。
 *
 *      **注意这里支持输入 `*`，可通过 `symbol` 自定义脱敏符号**
 */
import * as React from 'react';
import { BizForm } from 'antd-more';
import { useAsync } from 'rc-hooks';
import waitTime from './utils/waitTime';

const { ItemInput } = BizForm;

const getUserDataApi = async () => {
  await waitTime(2000);

  return {
    name: '张三',
    mobile: '130****0000',
    email: '12****@qq.com',
    idCard: '300***********2288',
    bankCardNo: '563058*******277'
  };
};

const Demo = () => {
  const [form] = BizForm.useForm();
  const { loading, data } = useAsync(getUserDataApi, {
    onSuccess: (res) => {
      form.setFieldsValue(res);
    }
  });

  return (
    <BizForm
      name="form-security"
      form={form}
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
      submitter={{
        submitText: '提交',
        submitButtonProps: {
          disabled: loading
        },
        noReset: true
      }}
      labelWidth={98}
    >
      <ItemInput label="姓名" name="name" required />
      <ItemInput
        label="身份证号"
        name="idCard"
        type="idCard"
        required
        security
        initialValue={data?.idCard}
      />
      <ItemInput
        label="手机号码"
        name="mobile"
        type="mobile"
        required
        security
        initialValue={data?.mobile}
      />
      <ItemInput
        label="邮箱"
        name="email"
        type="email"
        inputProps={{ placeholder: '请输入（选填）' }}
        security
        initialValue={data?.email}
      />
      <ItemInput
        label="银行卡号"
        name="bankCardNo"
        type="bankCard"
        required
        security
        initialValue={data?.bankCardNo}
      />
    </BizForm>
  );
};

export default Demo;
