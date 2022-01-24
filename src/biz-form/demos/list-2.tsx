import * as React from 'react';
import { BizForm } from 'antd-more';
import { Button, Card, Space, Row, Col, Popconfirm } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getPCA } from 'lcn';
import waitTime from '../../utils/waitTime';

const pcaInlandData = getPCA({ inland: true, formatForm: true });

const colspan = {
  xxl: 6,
  lg: 8,
  md: 12,
  xs: 24
};

const { List, Item, ItemInput, ItemNumber, ItemDate, ItemAddress } = BizForm;

const Demo = () => {
  return (
    <BizForm
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
      submitter={{
        render: (_, dom) => dom
      }}
    >
      <ItemInput label="公司名称" name="companyName" />
      <ItemAddress
        label="公司地址"
        labels={['省/市/区', '详细地址']}
        names={['locals', 'address']}
        options={pcaInlandData}
      />
      <List name="contacts">
        {(fields, { add, remove, move }) => {
          return (
            <Space size="middle" direction="vertical" style={{ display: 'flex', width: '100%' }}>
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  type="inner"
                  title={`业务员${index + 1}`}
                  extra={
                    <Space>
                      {index !== 0 && <a onClick={() => move(index, index - 1)}>上移</a>}
                      {index !== fields.length - 1 && (
                        <a onClick={() => move(index, index + 1)}>下移</a>
                      )}
                      <Popconfirm
                        title={`确认删除业务员${index + 1}？`}
                        onConfirm={() => remove(field.name)}
                        placement="topRight"
                        arrowPointAtCenter
                      >
                        <a>删除</a>
                      </Popconfirm>
                    </Space>
                  }
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <Col {...colspan}>
                      <ItemInput label="姓名" name={[field.name, 'name']} />
                    </Col>
                    <Col {...colspan}>
                      <ItemNumber
                        label="年龄"
                        name={[field.name, 'age']}
                        precision={0}
                        inputProps={{ min: 1 }}
                      />
                    </Col>
                    <Col {...colspan}>
                      <ItemDate label="生日" name={[field.name, 'birthday']} />
                    </Col>
                    <Col {...colspan}>
                      <List name={[field.name, 'mobile']}>
                        {(mobileFields, mobileFieldAction) => (
                          <>
                            {mobileFields.map((mobileField, mobileFieldIndex) => (
                              <div style={{ display: 'flex' }} key={mobileField.key}>
                                <ItemInput
                                  {...mobileField}
                                  type="mobile"
                                  label={mobileFieldIndex === 0 ? '手机号码' : ' '}
                                  colon={mobileFieldIndex === 0}
                                  messageVariables={{ label: '手机号码' }}
                                  style={{ flex: 1, marginRight: 8 }}
                                />
                                <MinusCircleOutlined
                                  style={{ marginTop: 9 }}
                                  onClick={() => mobileFieldAction.remove(mobileField.name)}
                                />
                              </div>
                            ))}
                            {mobileFields.length < 3 && (
                              <Item label=" " colon={false}>
                                <Button
                                  type="dashed"
                                  block
                                  icon={<PlusOutlined />}
                                  onClick={() => mobileFieldAction.add()}
                                  style={{ marginBottom: 16 }}
                                >
                                  添加手机号码
                                </Button>
                              </Item>
                            )}
                          </>
                        )}
                      </List>
                    </Col>
                  </Row>
                </Card>
              ))}
              <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
                onClick={() => add()}
                style={{ marginBottom: 16 }}
              >
                添加业务员
              </Button>
            </Space>
          );
        }}
      </List>
    </BizForm>
  );
};

export default Demo;
