import * as React from 'react';
import { getPC } from 'lcn';
import { useAsync } from 'rc-hooks';
import { Col, Row } from 'antd';
import { BizForm, BizFormItemAutoComplete, BizFormItemCascader, BizFormItemSelect } from 'antd-more';
import { queryBanks, queryBranchBanks } from './services';

const colSpan = {
  span: 24,
  lg: 12,
  xxl: 8
}
const pc = getPC({ fieldNames: { code: 'value', name: 'label' }, inland: true });

function Demo() {
  const [form] = BizForm.useForm();

  const bankName = BizForm.useWatch('bankName', form);
  const branchBankAddressCode = BizForm.useWatch('branchBankAddressCode', form);
  const hasBranchBankAddressCode = React.useMemo(() => Array.isArray(branchBankAddressCode) && branchBankAddressCode.length > 0, [branchBankAddressCode]);

  const prevBranchBankAddressCodeRef = React.useRef<string>(); // 记录上一次选择开户支行省市区的值，用于下次变动对比。因为 cascade 组件即使选择同一个值也会触发 onChange 。

  // 请求银行列表数据
  const { data: banks = [], loading: queryBanksLoading } = useAsync(() => queryBanks().then((res) =>
    res.map((item) => ({
      label: item.bankName,
      value: item.bankName,
    })),
  ), {
    cacheKey: 'queryBanks',
    cacheTime: 24 * 60 * 60 * 1000,
    persisted: true,
  });

  // 请求支行列表数据
  const { run: runQueryBranchBanks, mutate: mutateBranchData, data: branchBanks = [], loading: queryBranchBanksLoading } = useAsync((...args: Parameters<typeof queryBranchBanks>) => queryBranchBanks(...args).then(res => res.map(item => ({
    label: item.fullBranchName,
    value: item.fullBranchName
  }))), {
    autoRun: false
  });

  // 支行获取焦点时，如果没有数据，加载数据
  const handleFocus = () => {
    if (!branchBanks && !queryBranchBanksLoading) {
      if (bankName && Array.isArray(branchBankAddressCode) && branchBankAddressCode.length > 0) {
        runQueryBranchBanks({
          bankName,
          province: branchBankAddressCode[0]!,
          city: branchBankAddressCode[1]!,
        });
      }
    }
  }

  return (
    <BizForm
      form={form}
      onFinish={values => {
        console.log(values);
      }}
    >
      <Row gutter={24}>
        <Col {...colSpan}>
          <BizFormItemCascader
            label='省份/城市'
            name='branchBankAddressCode'
            placeholder='请选择省/市'
            options={pc}
            allowClear={false}
            cascaderProps={{
              onChange(value) {
                const hasValue = Array.isArray(value) && value.length > 0;
                // 注意这里可能清空银行支行省市，也可能选择上一次的省市
                const currBranchBankAddressCode = hasValue ? value.join('') : '';
                if (bankName && currBranchBankAddressCode && prevBranchBankAddressCodeRef.current !== currBranchBankAddressCode) {
                  prevBranchBankAddressCodeRef.current = currBranchBankAddressCode;
                  form.setFieldValue('branchBankName', undefined);
                  mutateBranchData([]);
                  runQueryBranchBanks({
                    bankName,
                    province: value[0],
                    city: value[1]
                  });
                } else if (!hasValue) {
                  prevBranchBankAddressCodeRef.current = '';
                  form.setFieldValue('branchBankName', undefined);
                }
              }
            }}
            required
          />
        </Col>
        <Col {...colSpan}>
          <BizFormItemSelect
            label='银行名称'
            name='bankName'
            options={banks}
            selectProps={{
              showSearch: true,
              loading: queryBanksLoading,
              filterOption(inputValue, option) {
                if (inputValue) {
                  return (
                    ('' + option?.value).indexOf(inputValue) > -1 ||
                    (typeof option?.label === 'string' && option?.label.indexOf(inputValue) > -1)
                  );
                }
                return false;
              },
              onChange(value) {
                if (hasBranchBankAddressCode) {
                  form.setFieldValue('branchBankName', undefined);
                  mutateBranchData([]);
                  runQueryBranchBanks({
                    bankName: value,
                    province: branchBankAddressCode[0],
                    city: branchBankAddressCode[1]
                  });
                }
              },
            }}
            required
          />
        </Col>
        <Col {...colSpan}>
          <BizFormItemAutoComplete
            label='支行名称'
            name='branchBankName'
            placeholder='请输入支行名称'
            allowClear
            options={branchBanks}
            normalize={value => value ? value.trim() : value}
            autoCompleteProps={{
              disabled: !hasBranchBankAddressCode || !bankName,
              filterOption: (inputValue, option) => (option!.value as string).indexOf(inputValue) > -1,
              onFocus: handleFocus
            }}
            dependencies={['bankName', 'branchBankAddressCode']}
            rules={[
              {
                validator(rule, value) {
                  let errMsg = '';
                  if (!hasBranchBankAddressCode && !bankName) {
                    errMsg = '请先选择开户银行和开户支行省/市';
                  } else if (!hasBranchBankAddressCode) {
                    errMsg = '请先选择开户支行省/市';
                  } else if (!bankName) {
                    errMsg = '请先选择开户银行';
                  } else if (!value) {
                    errMsg = '请输入支行名称';
                  }
                  if (errMsg) {
                    return Promise.reject(errMsg);
                  }
                  return Promise.resolve();
                },
              },
            ]}
            required
          />
        </Col>
      </Row>
    </BizForm>
  );
}

export default Demo;