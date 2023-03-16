import * as React from 'react';
import type { CascaderProps, FormItemProps, SelectProps } from 'antd';
import { Cascader, Col, Row, Select } from 'antd';
import type { BizFormItemProps } from 'antd-more';
import { BizFormItem } from 'antd-more';

interface ItemBranchBankAddressProps<DataNodeType = any>
  extends Omit<BizFormItemProps, 'name' | 'transform'>,
  Pick<CascaderProps<DataNodeType>, 'options' | 'fieldNames'> {
  names: [FormItemProps['name'], FormItemProps['name']]; // 如 ['location', 'address']
  labels: [string, string]; // 如 ['省/市/区', '详细地址']
  formItemProps?: [BizFormItemProps, BizFormItemProps];
  selectProps?: SelectProps;
  cascaderProps?: CascaderProps<DataNodeType>;
}

const ItemBranchBankAddress: React.FC<ItemBranchBankAddressProps> = ({
  names,
  labels,
  options = [],
  fieldNames,
  formItemProps = [{}, {}],
  selectProps = {},
  cascaderProps = {},

  style = {},
  required = false,
  ...restProps
}) => {
  const [
    { colProps: cascaderColProps, ...cascaderFormItemProps },
    { colProps: selectColProps, ...selectFormItemProps },
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
                },
              },
            ]}
            {...cascaderFormItemProps}
          >
            <Cascader
              placeholder={`请选择${labels[0]}`}
              options={options}
              fieldNames={fieldNames}
              {...cascaderProps}
            />
          </BizFormItem>
        </Col>
        <Col span={24} md={12} lg={16} {...selectColProps}>
          <BizFormItem
            name={names[1]}
            rules={[
              {
                validator(rule, value) {
                  let errMsg = '';
                  if (!value) {
                    errMsg = required ? `请选择${labels[1]}` : '';
                  }
                  if (errMsg) {
                    return Promise.reject(errMsg);
                  }
                  return Promise.resolve();
                },
              },
            ]}
            {...selectFormItemProps}
          >
            <Select
              placeholder={`请选择${labels[1]}`}
              allowClear
              filterOption={false}
              defaultActiveFirstOption={false}
              showSearch
              {...selectProps}
            />
          </BizFormItem>
        </Col>
      </Row>
    </BizFormItem>
  );
};

export default ItemBranchBankAddress;
