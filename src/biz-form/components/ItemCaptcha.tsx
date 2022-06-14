import * as React from 'react';
import { useMount } from 'rc-hooks';
import { Input, Divider } from 'antd';
import type { InputProps } from './antd.interface';
import type { CaptchaButtonProps } from '../../captcha-button';
import CaptchaButton from '../../captcha-button';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

interface VerificateCodeInputProps extends Record<number | string, any> {
  value?: any;
  onChange?: (value: any) => void;
  // 发送验证码
  onGetCaptcha?: () => boolean | Promise<any>;
  inputProps?: InputProps;
  buttonProps?: CaptchaButtonProps;
  type?: 'default' | 'inline'; // 显示类型
  autoRun?: boolean;
}

const checkResult = async (fn: () => boolean | Promise<boolean>) => {
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
  onGetCaptcha = () => true,
  inputProps = {},
  buttonProps = {},
  type = 'default',
  autoRun = false,
  ...restProps
}) => {
  const inputRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  // 倒计时按钮状态
  const [start, setStart] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 点击按钮
  const onButtonClick = React.useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      setLoading(true);
      buttonProps?.onClick?.(e);

      try {
        // 验证手机号码/邮箱是否正确
        // 发送验证码
        await checkResult(onGetCaptcha);

        setStart(true);
        setLoading(false);
        inputRef.current.focus();
      } catch (err) {
        setLoading(false);
      }
    },
    [buttonProps, onGetCaptcha]
  );

  const handleEnd = React.useCallback(() => {
    setStart(false);
    buttonProps?.onEnd?.();
  }, [buttonProps]);

  React.useImperativeHandle(buttonProps?.ref, () => buttonRef.current, [buttonRef]);

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
      loading={loading}
      type={type === 'inline' ? 'link' : 'default'}
      {...buttonProps}
      onMouseUp={(e) => {
        e.stopPropagation();
        buttonProps?.onMouseUp?.(e);
      }}
      onClick={onButtonClick}
      onEnd={handleEnd}
      ref={buttonRef}
      style={{
        ...defaultStyle.button,
        ...buttonProps?.style
      }}
    />
  );

  useMount(() => {
    if (autoRun) {
      buttonRef.current.click();
    }
  });

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

export interface BizFormItemCaptchaProps
  extends BizFormItemProps,
    Pick<
      VerificateCodeInputProps,
      'onGetCaptcha' | 'type' | 'inputProps' | 'buttonProps' | 'autoRun'
    >,
    Pick<CaptchaButtonProps, 'initText' | 'runText' | 'resetText' | 'second'> {}

const BizFormItemCaptcha: React.FC<BizFormItemCaptchaProps> = ({
  type,
  onGetCaptcha,
  initText,
  runText,
  resetText,
  second,
  autoRun,
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
        type={type}
        onGetCaptcha={onGetCaptcha}
        autoRun={autoRun}
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

export default BizFormItemCaptcha;
