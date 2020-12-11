/**
 * title: 修改密码
 * desc: |
 *    由于含有特殊校验：新密码不能与原密码一致，所以新密码也使用 `ItemInput.Password` 。
 */
import * as React from 'react';
import { Form } from 'antd';
import { BizForm } from 'antd-more';
import { validatePassword } from 'util-helpers';

const { ItemInput } = BizForm;

const Demo: React.FC<{}> = () => {
  const [loading, setLoading] = React.useState(false);
  const [form] = BizForm.useForm();
  const onFinish = React.useCallback((values) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BizForm
      submitter={{
        submitText: '确定',
        noReset: true
      }}
      onFinish={onFinish}
      loading={loading}
      labelCol={{
        flex: '0 0 96px'
      }}
      form={form}
      name="form-change-password"
    >
      <Form.Item label="手机号码">13000000000</Form.Item>
      <Form.Item label="用户名">guest</Form.Item>
      <ItemInput.Password
        label="原密码"
        name="password"
        required
      />
      <ItemInput.Password
        label="新密码"
        name="newPassword"
        required
        dependencies={['password']}
        rules={[
          {
            validator(rules, value) {
              let errMsg = '';

              if (!value) {
                errMsg = '请输入新密码';
              } else if(value.length > 16 || value.length < 8) {
                errMsg = '新密码为8~16位';
              } else {
                const ret = validatePassword(value);
                if (ret.containes.unallowableCharacter) {
                  errMsg = '新密码包含无法识别的字符';
                } else if (!ret.validated) {
                  errMsg = `新密码为大小写字母、数字或符号任意两者组成`;
                } else {
                  const oldPwd = form.getFieldValue('password');
                  if (oldPwd && oldPwd === value) {
                    errMsg = '新密码不能与原密码一致';
                  }
                }
              }
              if (errMsg) {
                return Promise.reject(errMsg);
              }

              return Promise.resolve();
            }
          }
        ]}
      />
      <ItemInput.Password
        label="重复新密码"
        name="repeatNewPassword"
        required
        dependencies={['newPassword']}
        rules={[
          {
            validator(rules, value) {
              let errMsg = '';
              if (!value) {
                errMsg = '请再次输入新密码';
              } else if (value !== form.getFieldValue('newPassword')) {
                errMsg = '两次输入的密码不一致';
              }
              if (errMsg) {
                return Promise.reject(errMsg);
              }
              return Promise.resolve();
            }
          }
        ]}
      />
    </BizForm>
  );
}

export default Demo;