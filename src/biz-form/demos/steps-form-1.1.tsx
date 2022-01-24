import * as React from 'react';
import { message, Result, Space, Button } from 'antd';
import { BizForm } from 'antd-more';
import type { StepsFormActionType } from 'antd-more';
import { BillAccountOptions } from './constants';
import waitTime from '../../utils/waitTime';

const { StepsForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

const Demo = () => {
  const actionRef = React.useRef<StepsFormActionType>();

  return (
    <StepsForm
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');

        // 因为第二步已经提交，这里手动触发下一步
        actionRef.current.next(false);
      }}
      actionRef={actionRef}
    >
      <StepsForm.StepForm
        title="选择收款方"
        labelWidth={112}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
      >
        <ItemInput label="收款账号" name="ban" required />
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountOptions} required />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title="填写付款信息"
        labelWidth={112}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        submitter={{
          noNext: true,
          forceShowSubmit: true,
          render: ({ submitButtonProps }, dom) => (
            <Space>
              {dom[0]}
              <Button type="primary" {...submitButtonProps} onClick={actionRef.current.submit}>
                提交
              </Button>
            </Space>
          )
        }}
      >
        <ItemNumber label="付款金额" name="money" required precision={2} contentAfter="¥" />
        <ItemUpload
          label="材料文件"
          name="files"
          required
          title="上传文件"
          transform={(values) => values.map((val) => val.name)}
        />
        <ItemTextArea
          label="备注（选填）"
          name="remark"
          disabledWhiteSpace
          inputProps={{ showCount: true, maxLength: 140 }}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm title="结果页" submitter={false}>
        <Result
          status="success"
          title="创建成功"
          subTitle={
            <>
              <Space size={30}>
                <div>付款单：XXX 笔</div>
                <div>总付款金额： 111,111,111.00 元</div>
              </Space>
              <br />
              我们将在 1 个工作日内完成付款单审核，审核通过后即可进行付款
              <br />
              您可以通过「付款单查询」及时关注付款单状态
            </>
          }
          extra={[
            <Button type="primary" key="back">
              返回
            </Button>,
            <Button key="reset" onClick={() => actionRef.current.reset()}>
              再次创建
            </Button>
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default Demo;
