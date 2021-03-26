import * as React from 'react';
import { BizForm } from 'antd-more';
import { ModalFormProps } from 'antd-more/es/biz-form';

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

const { ModalForm, ItemInput, ItemTextArea } = BizForm;

export interface UpdateModalProps extends ModalFormProps {
  data?: any;
  onChange?: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ data, onChange, visible, ...restProps }) => {
  const [form] = BizForm.useForm();

  React.useEffect(() => {
    if (visible && data) {
      form.setFieldsValue(data);
      // } else {
      //   form.resetFields(); // 和 modalProps.destroyOnClose=true 效果一样
    }
  }, [visible, data, form]);

  return (
    <ModalForm
      title={data ? '修改' : '新增'}
      visible={visible}
      form={form}
      pressEnterSubmit={false} // 回车建不触发提交
      onFinish={async (values) => {
        await waitTime(); // 发起请求
        console.log(values);

        onChange(); // 响应成功后，通知外部数据更新
      }}
      modalProps={{
        destroyOnClose: true, // 弹窗关闭后，将重置表单
        maskClosable: false
      }}
      {...restProps}
    >
      <ItemInput label="姓名" name="name" required />
      <ItemTextArea label="简介" name="resume" required inputProps={{ showCount: true, maxLength: 100 }} />
    </ModalForm>
  );
}

export default UpdateModal;