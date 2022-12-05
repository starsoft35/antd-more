import * as React from 'react';
import { Cascader, Input, Row, Col } from 'antd';
import type { InputProps, CascaderProps, FormItemProps } from './antd.interface';
import { normalizeWhiteSpace } from '../_util/normalize';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';

// 兼容 antd v4
import 'antd/es/cascader/style';
import 'antd/es/input/style';
import 'antd/es/grid/style';
import 'antd/es/row/style';
import 'antd/es/col/style';

export interface BizFormItemAddressProps<DataNodeType = any>
  extends Omit<BizFormItemProps, 'name' | 'transform'>, Pick<CascaderProps<DataNodeType>, 'options' | 'fieldNames'> {
  names: [FormItemProps['name'], FormItemProps['name']]; // 如 ['location', 'address']
  labels: [string, string]; // 如 ['省/市/区', '详细地址']
  formItemProps?: [BizFormItemProps, BizFormItemProps];
  inputProps?: InputProps;
  cascaderProps?: CascaderProps<DataNodeType>;
}

function BizFormItemAddress<DataNodeType = any>({
  names,
  labels,
  options = [],
  fieldNames,
  formItemProps = [{}, {}],
  inputProps = {},
  cascaderProps = {},

  style = {},
  required = false,
  ...restProps
}: BizFormItemAddressProps<DataNodeType>) {
  const [
    { colProps: cascaderColProps, ...cascaderFormItemProps },
    { colProps: inputColProps, ...inputFormItemProps }
  ] = formItemProps;

  return (
    <BizFormItem required={required} style={{ marginBottom: 0, ...style }} {...restProps}>
      <Row gutter={10}>
        <Col span={24} md={12} lg={8} {...cascaderColProps}>
          <BizFormItem
            name={names[0]}
            rules={[
              {
                validator(rule, value) {
                  let errMsg = '';
                  if (!value || value.length <= 0) {
                    errMsg = required ? `请选择${labels[0]}` : '';
                  }
                  if (errMsg) {
                    return Promise.reject(errMsg);
                  }
                  return Promise.resolve();
                }
              }
            ]}
            {...cascaderFormItemProps}
          >
            <Cascader placeholder={`请选择${labels[0]}`} options={options} fieldNames={fieldNames} {...cascaderProps} />
          </BizFormItem>
        </Col>
        <Col span={24} md={12} lg={16} {...inputColProps}>
          <BizFormItem
            name={names[1]}
            normalize={normalizeWhiteSpace}
            rules={[
              {
                validator(rule, value) {
                  let errMsg = '';
                  if (!value) {
                    errMsg = required ? `请输入${labels[1]}` : '';
                  }
                  if (errMsg) {
                    return Promise.reject(errMsg);
                  }
                  return Promise.resolve();
                }
              }
            ]}
            {...inputFormItemProps}
          >
            <Input
              placeholder={`请输入${labels[1]}`}
              allowClear
              autoComplete="off"
              {...inputProps}
            />
          </BizFormItem>
        </Col>
      </Row>
    </BizFormItem>
  );
}

export default BizFormItemAddress;
