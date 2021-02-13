import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemInput } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-input-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={112}
    >
      <ItemInput label="Input" name="input1" />
      <ItemInput label="必填项" name="input2" required />
      <ItemInput label="禁止空格" name="input3" disabledWhiteSpace />
      <ItemInput
        label="图片验证码"
        name="code"
        required
        inputProps={{
          placeholder: "请输入验证码"
        }}
        after={<img src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAAoAIsDAREAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwQD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA2UAAFdPQngRhwlhAAAAABlZoZIg8ChGiAiziLCACCM8NPJEopegCJKgaKDyM/NFABVivltJwAAAAz8ly0gAHIdYAAAAAAP/EADkQAAEDAQMGCwYHAAAAAAAAAAMCBAUTAAYSAQcQICIjERQwMjM0QlJiksIVFiVyhLIXJDZDUVSi/9oACAEBAAE/ANY18oRq9KyI74XTfpRCCQlLyos0vZEujjbgKeqTYRwtCo9OmWmmcOIa3xCox9wJCfZaNvnCy50Cjntcq9jdiJg8+DlYB8dhnRvattGu39Sn1anu/OtNox8Z+EizR7tnt8xzT9C1aXfVi/JbMn+g/qSaZe8EVB0/aj8DOp0dWwr83aOUYQTTJZSbCN7q3sXLogXK4EYiPsG7qejx2L7r+7Q1xjl37fr7vo+P16nbR89oZT8kU3XKjEN9+7kHouxDvmecS8z9y1KNq7p0i9/UmZFbIGwwePKmNH5an61ptmwHI3ehBxD+FfoKs5CVdin9+ki0DHlWvmIsYf4jTTVYRUoOLc1Buf7RE9zwat/gzJ7puEQPT9vv4PB47P310l3B4kz+mai65X7GxzseO11RyoLvNkTxAkfdun/nks5GWUJliGjJq7cRpy/EeLCXUppWju7dmF5WIxCaAjJgQtgY/hpx63EGaCY0NQ5CfzS5f//EABQRAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQIBAT8ANf/EABQRAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQMBAT8ANf/Z" style={{ height: 32, margin: 0 }} alt="" />}
      />
      <ItemInput label="银行卡号" name="bankCardNo" type="bankCard" />
      <ItemInput label="手机号码" name="phone" type="mobile" />
      <ItemInput label="身份证号" name="idc" type="idCard" />
      <ItemInput label="邮箱" name="ema" type="email" />
      <ItemInput
        label="用户名"
        name="username"
        type="userName"
        extendRules={[
          {
            min: 6,
            max: 32,
            message: "用户名为6～32位"
          }
        ]}
      />
    </BizForm>
  );
}

export default Demo;