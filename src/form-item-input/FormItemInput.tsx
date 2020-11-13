import * as React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { InputProps } from 'antd/es/input';
import getLabel from '../_util/getLabel';
import normalizeWhiteSpace from '../_util/normalizeWhiteSpace';
import FormItemTextArea from './FormItemTextArea';
import FormItemPassword from './FormItemPassword';

export interface FormItemInputProps extends FormItemProps {
  disabledWhiteSpace?: boolean;
  inputProps?: InputProps;
}

class FormItemInput extends React.Component<FormItemInputProps> {
  static defaultProps = {
    disabledWhiteSpace: false,
    inputProps: {},
    required: false,
  };

  normalize = (val) => {
    const { disabledWhiteSpace } = this.props;
    if (disabledWhiteSpace) {
      return normalizeWhiteSpace(val);
    }
    return val;
  };

  static TextArea: typeof FormItemTextArea;

  static Password: typeof FormItemPassword;

  render() {
    const { label, disabledWhiteSpace, inputProps, required, ...restProps } = this.props;
    const labelText = getLabel(label);

    return (
      <Form.Item
        label={label}
        required={required}
        normalize={this.normalize}
        rules={[
          {
            validator(rule, value) {
              let errMsg = '';
              if (!value) {
                errMsg = required ? `请输入${labelText}` : '';
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
        <Input placeholder="请输入" allowClear autoComplete="off" {...inputProps} />
      </Form.Item>
    );
  }
}

export default FormItemInput;
