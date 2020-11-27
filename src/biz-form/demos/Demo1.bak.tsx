import * as React from 'react';
import { BizForm } from 'antd-more';
import lcnFormInlandData from 'lcn/lcn-form-inland';

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

// const initialValues = {
//   arr1: [
//     {
//       // bankCardNo: '1111'
//     },
//     {

//     }
//   ],
//   arr2: [
//     {
//       subArr2: [
//         {
//           bankCardNo: '2222****77***2'
//         }
//       ]
//     }
//   ],
//   date: '2020-10-10 10:00:00'
// };

const Demo: React.FC<{}> = () => {
  const [result, setResult] = React.useState();
  const onFinish = React.useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <BizForm
        name='biz-form-demo2'
        onFinish={onFinish}
        // initialValues={initialValues}
        {...formLayout}
      >
        <BizForm.ItemEmail name='email' label='邮箱' />
        <BizForm.ItemAddress
          label='地址'
          names={['location', 'address']}
          labels={['省/市/区', '详细地址']}
          options={lcnFormInlandData}
        />
        <BizForm.ItemBankCard formatting label='银行卡号' name='bankCardNo' />
        {/* <BizForm.List name='arr1'>
          {fields => {
            return fields.map(field => {
              // console.log(field);
              return (
                <div key={field.key}>
                  {
                    field.name !== 0 && (
                      <>
                        <BizForm.ItemBankCard formatting label='嵌套银行卡号2' {...field} name={[field.name, 'bankCardNo']} />
                        <BizForm.ItemEmail name={[field.name, 'email']} label='嵌套邮箱' transform={(val) => val + 'xxx'} />
                      </>
                    )
                  }
                  <BizForm.ItemAddress
                    label='嵌套地址'
                    names={[[field.name, 'location'], [field.name, 'address']]}
                    labels={['省/市/区', '详细地址']}
                    options={lcnFormInlandData}
                  />
                </div>
              )
            })
          }}
        </BizForm.List>
        <BizForm.List name='arr2'>
          {fields => {
            // console.log(fields);
            return fields.map(field => {
              return (
                <BizForm.List {...field} name={[field.name, 'subArr2']}>
                  {(subFields) => {
                    return subFields.map(subField => (
                      <BizForm.ItemBankCard security initialValue={initialValues.arr2[field.name].subArr2[subField.name].bankCardNo} formatting label='嵌套银行卡号3' {...subField} fieldKey={[subField.fieldKey, 'bankCardNo']} name={[subField.name, 'bankCardNo']} />
                    ))
                  }}
                </BizForm.List>
              )
            })
          }}
        </BizForm.List>
        <BizForm.ItemBankCard label='银行卡号4' name={['test', 'bankCardNo']} /> */}
        <BizForm.ItemDate label='日期' name='date' />
        <BizForm.ItemDate label='周' name='week' pickerProps={{ picker: 'week' }} />
        <BizForm.ItemDate label='月' name='month' pickerProps={{ picker: 'month' }} />
        <BizForm.ItemDate label='年' name='year' pickerProps={{ picker: 'year' }} />
        <BizForm.ItemDate label='日期时间' name='dateTime' pickerProps={{ showTime: true }} />
        <BizForm.ItemDateRange label='日期区间' name='dateRange' />
        <BizForm.ItemDateRange label='日期时间区间' name='dateTimeRange' pickerProps={{ showTime: true }} />
        <BizForm.ItemIdCard label='身份证号' name='idCard' />
        <BizForm.ItemInput label='Input' name='input' />
        <BizForm.ItemInput.Password label='Input.Password' name='inputPassword' />
        <BizForm.ItemInput.TextArea label='Input.TextArea' name='inputTextArea' />
        <BizForm.ItemMobile label='手机号码' name='mobile' />
      </BizForm>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;