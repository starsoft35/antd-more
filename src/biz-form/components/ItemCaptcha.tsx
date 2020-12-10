import * as React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';
import CaptchaButton from '../../captcha-button';
import { CaptchaButtonProps } from '../../captcha-button/CaptchaButton';
import BizFormItem, { BizFormItemProps } from './Item';

interface VerificateCodeInputProps {
  value?: any;
  onChange?: (value: any) => void;
  // 验证手机号码 或 邮箱
  check?: () => boolean | Promise<any>;
  // 发送验证码
  onGetCaptcha?: () => Promise<any>;
  inputProps?: InputProps;
  buttonProps?: CaptchaButtonProps;
  [x: string]: any;
}

const VerificateCodeInput: React.FC<VerificateCodeInputProps> = ({
  value,
  onChange = () => {},
  check = () => true,
  onGetCaptcha = () => Promise.resolve(),
  inputProps = {},
  buttonProps = {},
  ...restProps
}) => {
  const inputRef = React.useRef(null);

  // 倒计时按钮状态
  const [start, setStart] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 验证手机号码/邮箱是否正确
  const checkResult = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      const ret = check();
      if (typeof ret === 'boolean' && checkResult) {
        resolve();
      } else if (typeof ret === 'object' && ret.then) {
        ret.then(resolve).catch(reject);
      } else {
        reject();
      }
    });
  }, [check]);

  const onButtonClick = async () => {
    setLoading(true);
    try {
      await checkResult();

      // 发送验证码
      onGetCaptcha()
        .then(() => {
          setStart(true);
          setLoading(false);
          inputRef.current.focus();
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  const handleEnd = React.useCallback(() => {
    setStart(false);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Input
        placeholder="请输入"
        onChange={onChange}
        value={value}
        allowClear
        ref={inputRef}
        {...restProps}
        {...inputProps}
        style={{
          flex: 1,
          transition: 'width 0.3s ease 0s',
          marginRight: '8px',
          ...inputProps?.style,
        }}
      />
      <CaptchaButton
        start={start}
        onClick={onButtonClick}
        onEnd={handleEnd}
        // block
        loading={loading}
        {...buttonProps}
      />
    </div>
  );
};

export interface FormItemCaptchaProps
  extends BizFormItemProps,
    Pick<VerificateCodeInputProps, 'check' | 'onGetCaptcha' | 'inputProps' | 'buttonProps'>,
    Pick<CaptchaButtonProps, 'initText' | 'runText' | 'resetText' | 'second'> {}

const FormItemCaptcha: React.FC<FormItemCaptchaProps> = ({
  check,
  onGetCaptcha,
  initText,
  runText,
  resetText,
  second,
  inputProps = {},
  buttonProps = {},

  label,
  required,
  ...restProps
}) => {
  return (
    <BizFormItem
      label={label}
      required={required}
      rules={[
        {
          validator(rules, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请输入${label}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          },
        },
      ]}
      {...restProps}
    >
      <VerificateCodeInput
        check={check}
        onGetCaptcha={onGetCaptcha}
        inputProps={inputProps}
        buttonProps={{
          initText,
          runText,
          resetText,
          second,
          ...buttonProps,
        }}
      />
    </BizFormItem>
  );
};

export default FormItemCaptcha;
