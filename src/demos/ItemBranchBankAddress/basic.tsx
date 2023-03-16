import * as React from 'react';
import { BizForm, BizFormItem } from 'antd-more';
import { useAsync } from 'rc-hooks';
import { getPC } from 'lcn';
import ItemBranchBankAddress from '../components/ItemBranchBankAddress';
import ItemSelectBank from './ItemSelectBank';
import { queryBranchBanks } from './services';

const pc = getPC({ fieldNames: { code: 'value', name: 'label' }, inland: true });

function Demo() {
  const [form] = BizForm.useForm();

  const prevBranchBankAddressCodeRef = React.useRef<string>(); // 记录上一次选择开户支行省市区的值，用于下次变动对比。因为 cascade 组件即使选择同一个值也会触发 onChange 。

  const { run: runQueryBranchBanks, data: branchBanks, loading: queryBranchBanksLoading } = useAsync((...args: Parameters<typeof queryBranchBanks>) => queryBranchBanks(...args).then(res => res.map(item => ({
    label: item.fullBranchName,
    value: item.fullBranchName
  }))), {
    autoRun: false
  });

  return (
    <BizForm
      form={form}
      onFinish={values => {
        console.log(values);
      }}
      onValuesChange={(changedValues, values) => {
        let needUpdateBranchBank = false; // 标识是否需要更新银行支行地址
        const bankName = values.bankName;
        const branchBankAddressCode = values.branchBankAddressCode;
        const hasBranchBankAddressCode = Array.isArray(branchBankAddressCode) && branchBankAddressCode.length > 0;

        if ('bankName' in changedValues) {
          if (hasBranchBankAddressCode) {
            needUpdateBranchBank = true;
          }
        } else if ('branchBankAddressCode' in changedValues) {
          // 注意这里可能清空银行支行省市，也可能选择上一次的省市
          const currBranchBankAddressCode = hasBranchBankAddressCode ? values.branchBankAddressCode.join('') : '';
          if (bankName && currBranchBankAddressCode && prevBranchBankAddressCodeRef.current !== currBranchBankAddressCode) {
            needUpdateBranchBank = true;
          }
          prevBranchBankAddressCodeRef.current = currBranchBankAddressCode;
        }

        if (needUpdateBranchBank) {
          form.setFieldValue('branchBankName', undefined);
          runQueryBranchBanks({
            bankName: bankName,
            province: branchBankAddressCode[0],
            city: branchBankAddressCode[1],
          });
        } else if (!hasBranchBankAddressCode || !bankName) {
          // 如果清空银行名称 或 支行省市，清空
          prevBranchBankAddressCodeRef.current = '';
          form.setFieldValue('branchBankName', undefined);
        }
      }}
    >
      <ItemSelectBank
        label="开户银行"
        name='bankName'
        required
      />
      <BizFormItem shouldUpdate noStyle>
        {() => {
          const branchBankAddressCode = form.getFieldValue('branchBankAddressCode');
          const bankName = form.getFieldValue('bankName');
          const hasBranchBankAddressCode =
            Array.isArray(branchBankAddressCode) && branchBankAddressCode.length > 0;

          const isDisabled = !hasBranchBankAddressCode || !bankName;

          return (
            <ItemBranchBankAddress
              label="开户支行"
              labels={['省/市', '支行名称']}
              names={['branchBankAddressCode', 'branchBankName']}
              options={pc}
              required
              selectProps={{
                disabled: isDisabled,
                loading: queryBranchBanksLoading,
                options: branchBanks,
              }}
              formItemProps={[
                {},
                {
                  rules: [
                    {
                      validator(rule, value) {
                        let errMsg = '';
                        if (isDisabled) {
                          errMsg = '请先选择开户银行和开户支行';
                        } else if (!value) {
                          errMsg = '请选择支行名称';
                        }
                        if (errMsg) {
                          return Promise.reject(errMsg);
                        }
                        return Promise.resolve();
                      },
                    },
                  ],
                },
              ]}
            />
          );
        }}
      </BizFormItem>
    </BizForm>
  );
}

export default Demo;