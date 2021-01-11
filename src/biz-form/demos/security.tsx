/**
 * title: 脱敏校验
 * desc: |
 *      用于部分修改页面，并且由服务端对数据进行脱敏。
 * 
 *      先将表单项和初始数据进行比较，如果不一致就进行正常的验证流程。一致就表示没有变动，直接将脱敏数据提交给服务。服务逐项验证数据含有脱敏信息就不做更新该项，否则正常验证和更新。
 * 
 *      **注意这里支持输入 `*`，可自定义脱敏符号 **
 */
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemInput, ItemIdCard, ItemMobile, ItemEmail, ItemBankCard } = BizForm;

const initialValues = {
  name: "张三",
  mobile: "130****0000",
  email: "12****@qq.com",
  idCard: "300***********2288",
  bankCardNo: "563058*******277"
}

const Demo: React.FC<{}> = () => {
  const [loading, setLoading] = React.useState(false);
  const onFinish = React.useCallback((values) => {
    console.log(values);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BizForm
      name="form-security"
      loading={loading}
      initialValues={initialValues}
      onFinish={onFinish}
      submitter={{
        submitText: "提交",
        noReset: true
      }}
      labelWidth={98}
    >
      <ItemInput label="姓名" name="name" required />
      <ItemIdCard label="身份证号" name="idCard" required security initialValue={initialValues.idCard} />
      <ItemMobile label="手机号码" name="mobile" required security initialValue={initialValues.mobile} />
      <ItemEmail label="邮箱" name="email" inputProps={{placeholder: "请输入（选填）"}} security initialValue={initialValues.email} />
      <ItemBankCard label="银行卡号" name="bankCardNo" required formatting security initialValue={initialValues.bankCardNo} />
    </BizForm>
  );
}

export default Demo;