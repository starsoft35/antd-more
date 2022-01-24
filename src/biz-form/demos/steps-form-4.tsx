/**
 * title: 分步表单-固定页脚
 * desc: |
 *      第二步即可提交，提交成功后，手动触发下一步，第三步仅用作显示
 */
import * as React from 'react';
import { Card, Result, Space, Button, Popconfirm } from 'antd';
import { PayCircleOutlined } from '@ant-design/icons';
import { BasicLayout, FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { StepsFormActionType } from 'antd-more';
import { BizForm } from 'antd-more';
import { BillAccountOptions } from './constants';
import waitTime from '../../utils/waitTime';

const { StepsForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

const Demo = () => {
  const actionRef = React.useRef<StepsFormActionType>();

  return (
    <BasicLayout
      fixSiderbar
      navTheme="light"
      breakpoint={false}
      defaultCollapsed
      pageTitleRender={false}
      logo="https://www.caijinfeng.com/assets/images/logo-doly@3x.png"
      title="antd-more"
      menuDataRender={() => [
        {
          path: '/one',
          icon: <PayCircleOutlined />,
          name: '付款管理',
          children: [
            {
              path: 'two',
              name: '创建付款单'
            }
          ]
        }
      ]}
      layout="mix"
      location={{
        pathname: '/one/two'
      }}
    >
      <PageContainer title="创建付款单">
        <Card>
          <StepsForm
            onFinish={async (values) => {
              await waitTime(2000);
              console.log('所有表单值：', values);

              // 因为第二步已经提交，这里手动触发下一步
              actionRef.current.next(false);
            }}
            actionRef={actionRef}
            stepsFormRender={(stepsDom, formDom, submitterDom) => (
              <>
                {stepsDom}
                {formDom}
                <FooterToolbar>{submitterDom}</FooterToolbar>
              </>
            )}
          >
            <StepsForm.StepForm
              title="选择收款方"
              onFinish={async (values) => {
                await waitTime(2000);
                console.log(values); // 当前表单值
                // return false; // 如果返回false 表示验证失败不进入下一步。
              }}
              labelWidth={112}
              submitter={{
                render: (_, dom) => (
                  <>
                    <span style={{ marginRight: 10, color: 'gray' }}>自定义提示信息</span>
                    {dom}
                  </>
                )
              }}
            >
              <ItemInput label="收款账号" name="ban" required />
              <ItemSelect
                label="收款账号名称"
                name="accountName"
                options={BillAccountOptions}
                required
              />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              title="填写付款信息"
              onFinish={async (values) => {
                await waitTime(2000);
                console.log(values);
              }}
              labelWidth={112}
              submitter={{
                noNext: true,
                forceShowSubmit: true,
                render: ({ submitButtonProps }, dom) => (
                  <Space>
                    {dom[0]}
                    <Popconfirm
                      placement="topRight"
                      title={
                        <div style={{ width: 190 }}>
                          <div>提交后将直接发起审核</div>
                          <div style={{ color: 'gray', fontSize: '12px', marginTop: 10 }}>
                            请确认页面信息填写正确，提交后将直接发起审核
                          </div>
                        </div>
                      }
                      cancelText="取消"
                      okText="确认提交"
                      onConfirm={() => actionRef.current.submit()}
                    >
                      <Button type="primary" {...submitButtonProps}>
                        提交
                      </Button>
                    </Popconfirm>
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
            <StepsForm.StepForm title="创建结果" submitter={false}>
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
        </Card>
      </PageContainer>
    </BasicLayout>
  );
};

export default Demo;
