import * as React from 'react';
import { Input, Divider } from 'antd';
import type { InputProps } from './antd.interface';
import CaptchaButton, { CaptchaButtonProps } from '../../captcha-button';
import BizFormItem, { BizFormItemProps } from './Item';
import getLabel from '../_util/getLabel';

interface VerificateCodeInputProps extends Record<number | string, any> {
  value?: any;
  onChange?: (value: any) => void;
  /**
   * @deprecated Please use `onGetCaptcha`
   */
  check?: () => boolean | Promise<any>;
  // 发送验证码
  onGetCaptcha?: () => boolean | Promise<any>;
  inputProps?: InputProps;
  buttonProps?: CaptchaButtonProps;
  type?: 'default' | 'inline'; // 显示类型
}

const checkResult = async (fn) => {
  try {
    const ret = await fn();
    if (ret !== false) {
      return ret;
    }
  } catch (err) {
    console.error(err);
  }
  return Promise.reject();
};

const VerificateCodeInput: React.FC<VerificateCodeInputProps> = ({
  value,
  onChange,
  check = () => true,
  onGetCaptcha = () => true,
  inputProps = {},
  buttonProps = {},
  type = 'default',
  ...restProps
}) => {
  const inputRef = React.useRef(null);

  // 倒计时按钮状态
  const [start, setStart] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 点击按钮
  const onButtonClick = async () => {
    setLoading(true);
    try {
      // 验证手机号码/邮箱是否正确
      // 发送验证码
      await checkResult(check);
      await checkResult(onGetCaptcha);

      setStart(true);
      setLoading(false);
      inputRef.current.focus();
    } catch (err) {
      setLoading(false);
    }
  };

  const handleEnd = React.useCallback(() => {
    setStart(false);
  }, []);

  const defaultStyle = React.useMemo(() => {
    let inputStyle: Record<string, any> = {
      flex: 1,
      transition: 'width 0.3s ease 0s',
      marginRight: '8px'
    };
    let buttonStyle = {};

    if (type === 'inline') {
      inputStyle = {
        flex: 1
      };
      buttonStyle = {
        height: 'auto',
        padding: '0 4px 0 6px'
      };
    }
    return {
      input: inputStyle,
      button: buttonStyle
    };
  }, [type]);

  const captchaButtonDom = (
    <CaptchaButton
      start={start}
      onClick={onButtonClick}
      onEnd={handleEnd}
      loading={loading}
      type={type === 'inline' ? 'link' : 'default'}
      {...buttonProps}
      onMouseUp={(e) => {
        e.stopPropagation();
        buttonProps?.onMouseUp?.(e);
      }}
      style={{
        ...defaultStyle.button,
        ...buttonProps?.style
      }}
    />
  );

  return (
    <div style={{ display: 'flex' }}>
      <Input
        placeholder="请输入"
        onChange={onChange}
        value={value}
        allowClear
        autoComplete="off"
        ref={inputRef}
        {...restProps}
        {...inputProps}
        style={{
          ...defaultStyle.input,
          ...inputProps?.style
        }}
        suffix={
          type === 'inline' ? (
            <>
              {inputProps?.suffix}
              <Divider type="vertical" />
              {captchaButtonDom}
            </>
          ) : (
            inputProps?.suffix
          )
        }
      />
      {type !== 'inline' ? captchaButtonDom : null}
    </div>
  );
};

export interface FormItemCaptchaProps
  extends BizFormItemProps,
    Pick<
      VerificateCodeInputProps,
      'check' | 'onGetCaptcha' | 'type' | 'inputProps' | 'buttonProps'
    >,
    Pick<CaptchaButtonProps, 'initText' | 'runText' | 'resetText' | 'second'> {}

const FormItemCaptcha: React.FC<FormItemCaptchaProps> = ({
  check,
  type,
  onGetCaptcha,
  initText,
  runText,
  resetText,
  second,
  inputProps = {},
  buttonProps = {},

  required,
  ...restProps
}) => {
  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rules, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请输入${getLabel(restProps)}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          }
        }
      ]}
      {...restProps}
    >
      <VerificateCodeInput
        check={check}
        type={type}
        onGetCaptcha={onGetCaptcha}
        inputProps={inputProps}
        buttonProps={{
          initText,
          runText,
          resetText,
          second,
          ...buttonProps
        }}
      />
    </BizFormItem>
  );
};

export default FormItemCaptcha;
