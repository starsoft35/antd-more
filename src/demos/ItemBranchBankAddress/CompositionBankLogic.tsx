import * as React from 'react';
import { BizForm } from 'antd-more';
import { useAsync } from 'rc-hooks';
import { getPC } from 'lcn';
import ItemSelectBank from './ItemSelectBank';
import ItemBranchBankAddress from '../components/ItemBranchBankAddress';
import { queryBranchBanks } from './services';

const pc = getPC({ fieldNames: { code: 'value', name: 'label' }, inland: true });

function CompositionBankLogic() {
  const form = BizForm.useFormInstance();
  const bankName = BizForm.useWatch('bankName', form);
  const branchBankAddressCode = BizForm.useWatch('branchBankAddressCode', form);
  const hasBranchBankAddressCode = React.useMemo(() => Array.isArray(branchBankAddressCode) && branchBankAddressCode.length > 0, [branchBankAddressCode]);

  const prevBranchBankAddressCodeRef = React.useRef<string>(); // 记录上一次选择开户支行省市区的值，用于下次变动对比。因为 cascade 组件即使选择同一个值也会触发 onChange 。

  const { run: runQueryBranchBanks, data: branchBanks, loading: queryBranchBanksLoading } = useAsync((...args: Parameters<typeof queryBranchBanks>) => queryBranchBanks(...args).then(res => res.map(item => ({
    label: item.fullBranchName,
    value: item.fullBranchName
  }))), {
    autoRun: false
  });

  return (
    <>
      <ItemSelectBank
        label="开户银行"
        name='bankName'
        required
        selectProps={{
          onChange(value) {
            if (hasBranchBankAddressCode) {
              form.setFieldValue('branchBankName', undefined);
              runQueryBranchBanks({
                bankName: value,
                province: branchBankAddressCode[0],
                city: branchBankAddressCode[1]
              });
            }
          },
        }}
      />
      <ItemBranchBankAddress
        label="开户支行"
        labels={['省/市', '支行名称']}
        names={['branchBankAddressCode', 'branchBankName']}
        options={pc}
        required
        selectProps={{
          disabled: !hasBranchBankAddressCode || !bankName,
          loading: queryBranchBanksLoading,
          options: branchBanks,
        }}
        cascaderProps={{
          onChange(value) {
            const hasValue = Array.isArray(value) && value.length > 0;
            // 注意这里可能清空银行支行省市，也可能选择上一次的省市
            const currBranchBankAddressCode = hasValue ? value.join('') : '';
            if (bankName && currBranchBankAddressCode && prevBranchBankAddressCodeRef.current !== currBranchBankAddressCode) {
              prevBranchBankAddressCodeRef.current = currBranchBankAddressCode;
              form.setFieldValue('branchBankName', undefined);
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
        formItemProps={[
          {},
          {
            dependencies: ['bankName', 'branchBankAddressCode'],
            rules: [
              {
                validator(rule, value) {
                  let errMsg = '';
                  if (!hasBranchBankAddressCode && !bankName) {
                    errMsg = '请先选择开户银行和开户支行';
                  } else if (!hasBranchBankAddressCode) {
                    errMsg = '请先选择开户支行';
                  } else if (!bankName) {
                    errMsg = '请先选择开户银行';
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
    </>
  );
}

export default CompositionBankLogic;