import * as React from 'react';
import {
  BizForm,
  // BizFormList,
  BizFormItemInput,
  BizFormItemAddress,
  BizFormItemDate,
  BizFormItemDateRange,
  BizFormItemPassword,
  BizFormItemTextArea
} from 'antd-more';
import { getPCA } from 'lcn';

const pca = getPCA({ inland: true, fieldNames: { code: 'value', name: 'label' } });

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

// const initialValues = {
//   arr1: [
//     {
//       // bankCardNo: "1111"
//     },
//     {

//     }
//   ],
//   arr2: [
//     {
//       subArr2: [
//         {
//           bankCardNo: "222287316613"
//         }
//       ]
//     }
//   ],
//   date: "2020-10-10 10:00:00"
// };

const Demo = () => {
  const [result, setResult] = React.useState();
  const onFinish = React.useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <BizForm
        name="biz-form-demo1-bak"
        onFinish={onFinish}
        // initialValues={initialValues}
        {...formLayout}
      >
        <BizFormItemInput name="email" label="邮箱" type="email" />
        <BizFormItemAddress
          label="地址"
          names={['location', 'address']}
          labels={['省/市/区', '详细地址']}
          options={pca}
        />
        <BizFormItemInput label="银行卡号" name="bankCardNo" type="bankCard" />
        {/* <BizFormList name="arr1">
          {fields => {
            return fields.map(field => {
              // console.log(field);
              return (
                <div key={field.key}>
                  {
                    field.name !== 0 && (
                      <>
                        <BizFormItemInput label="嵌套银行卡号2" {...field} name={[field.name, "bankCardNo"]} type="bankCard" />
                        <BizFormItemInput name={[field.name, "email"]} label="嵌套邮箱" transform={(val) => val + "xxx"} type="email" />
                      </>
                    )
                  }
                  <BizFormItemAddress
                    label="嵌套地址"
                    names={[[field.name, "location"], [field.name, "address"]]}
                    labels={["省/市/区", "详细地址"]}
                    options={pca}
                  />
                </div>
              )
            })
          }}
        </BizFormList>
        <BizFormList name="arr2">
          {fields => {
            // console.log(fields);
            return fields.map(field => {
              return (
                <BizFormList {...field} name={[field.name, "subArr2"]}>
                  {(subFields) => {
                    return subFields.map(subField => (
                      <BizFormItemInput type="bankCard" initialValue={initialValues.arr2[field.name].subArr2[subField.name].bankCardNo} label="嵌套银行卡号3" {...subField} fieldKey={[subField.fieldKey, "bankCardNo"]} name={[subField.name, "bankCardNo"]} />
                    ))
                  }}
                </BizFormList>
              )
            })
          }}
        </BizFormList>
        <BizFormItemInput label="银行卡号4" name={["test", "bankCardNo"]} type="bankCard" /> */}
        <BizFormItemDate label="日期" name="date" />
        <BizFormItemDate label="周" name="week" pickerProps={{ picker: 'week' }} />
        <BizFormItemDate label="月" name="month" pickerProps={{ picker: 'month' }} />
        <BizFormItemDate label="年" name="year" pickerProps={{ picker: 'year' }} />
        <BizFormItemDate label="日期时间" name="dateTime" pickerProps={{ showTime: true }} />
        <BizFormItemDateRange label="日期区间" name="dateRange" />
        <BizFormItemDateRange
          label="日期时间区间"
          name="dateTimeRange"
          pickerProps={{ showTime: true }}
        />
        <BizFormItemInput label="身份证号" name="idCard" type="idCard" />
        <BizFormItemInput label="Input" name="input" />
        <BizFormItemPassword label="Input.Password" name="inputPassword" validated={false} />
        <BizFormItemTextArea label="Input.TextArea" name="inputTextArea" />
        <BizFormItemInput label="手机号码" name="mobile" type="mobile" />
      </BizForm>
      <div>
        result:
        {JSON.stringify(result)}
      </div>
    </>
  );
};

export default Demo;
