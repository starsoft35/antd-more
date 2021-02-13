import * as React from 'react';
import { Modal, Button, message } from 'antd';
import { BizForm } from 'antd-more';
import { StepsFormActionType } from 'antd-more/es/biz-form';

const { StepsForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

const BillAccountName = [
  {
    name: "张三",
    value: 'a'
  },
  {
    name: "李四",
    value: 'b'
  },
];

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const actionRef = React.useRef<StepsFormActionType>();

  // 关闭时重置表单
  React.useEffect(() => {
    if (!visible) {
      actionRef.current.reset();
    }
  }, [visible]);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>创建付款单</Button>
      <StepsForm
        actionRef={actionRef}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          setVisible(false);
          message.success('提交成功');

          // 提交成功再重置表单
          // actionRef.current.reset();
        }}
        stepsFormRender={(stepsDom, formDom, submitterDom) => (
          <Modal
            title="分步表单"
            visible={visible}
            footer={submitterDom}
            width={600}
            onCancel={() => setVisible(false)}
            centered

            // 关闭时销毁dom
            destroyOnClose
          >
            {stepsDom}
            {formDom}
          </Modal>
        )}
      >
        <StepsForm.StepForm
          title="选择收款方"
          labelWidth={112}
        >
          <ItemInput label="收款账号" name="ban" required />
          <ItemSelect label="收款账号名称" name="accountName" options={BillAccountName} required />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title="填写付款信息"
          labelWidth={112}
        >
          <ItemNumber label="付款金额" name="money" required after="¥" />
          <ItemUpload label="材料文件" name="files" required title="上传文件" transform={values => values.map(val => val.name)} />
          <ItemTextArea label="备注（选填）" name="remark" disabledWhiteSpace inputProps={{ showCount: true, maxLength: 140 }} />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
}

export default Demo;