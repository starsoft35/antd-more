import * as React from 'react';
import { Form, Row, Col, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import BaseForm, { BaseFormProps } from './BaseForm';

export interface CollapseProps {
  collapsed: boolean;
  onToggle?: (collapsed: boolean) => void;
}

const Collapse: React.FC<CollapseProps> = React.memo(({ collapsed, onToggle = () => {} }) => {
  const handleToggle = () => {
    onToggle(!collapsed);
  };
  return (
    <a onClick={handleToggle}>
      {collapsed ? '展开' : '收起'}
      <DownOutlined
        style={{
          marginLeft: '0.5em',
          transition: '0.3s all',
          transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
        }}
      />
    </a>
  );
});

const formItemHideLabelClass = 'antd-more-form-item-hide-label';

export interface QueryFormProps extends BaseFormProps {
  labelWidth?: number | 'auto';
  submitText?: string;
  resetText?: string;
  defaultCollapsed?: boolean;
  defaultColsNumber?: number;
}

const colSpan = {
  xs: 24,
  md: 12,
  lg: 8,
  xxl: 6,
};

const QueryForm: React.FC<QueryFormProps> = (props) => {
  const {
    layout = 'horizontal',
    labelWidth = 84,
    labelCol,
    submitter,
    submitText = '查询',
    resetText = '重置',
    defaultCollapsed = true,
    defaultColsNumber,
    ...restProps
  } = props;
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const labelFlexStyle = React.useMemo(() => {
    return layout !== 'vertical' && labelWidth && labelWidth !== 'auto'
      ? { flex: `0 0 ${labelWidth}px` }
      : {};
  }, [layout, labelWidth]);

  return (
    <BaseForm
      submitter={{
        submitText,
        resetText,
        // render: (_, dom) => dom.reverse(),
        ...submitter,
      }}
      layout={layout}
      labelCol={{
        ...labelFlexStyle,
        ...labelCol,
      }}
      contentRender={(items, submitter) => {
        const enabledCollapse =
          typeof defaultColsNumber === 'number' && defaultColsNumber < items.length;
        return (
          <Row gutter={16}>
            {items.map((item: any, index) => {
              const { colProps, ...restProps } = item.props;
              const hidden = collapsed && index >= defaultColsNumber;
              return (
                <Col
                  key={item.key || item.props.name || item.props.label}
                  {...colSpan}
                  {...colProps}
                  style={hidden ? { display: 'none' } : {}}
                >
                  {React.cloneElement(item, {
                    hidden,
                    ...restProps,
                  })}
                </Col>
              );
            })}
            <Col
              style={{
                display: 'flex',
                flex: 'auto',
                flexWrap: 'nowrap',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
            >
              <Form.Item
                label=" "
                colon={false}
                className={layout !== 'vertical' ? formItemHideLabelClass : ''}
              >
                <Space>
                  {submitter}
                  {enabledCollapse && <Collapse collapsed={collapsed} onToggle={setCollapsed} />}
                </Space>
              </Form.Item>
            </Col>
          </Row>
        );
      }}
      {...restProps}
    />
  );
};

export default QueryForm;
