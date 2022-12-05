import * as React from 'react';
import { Input, Row, Col, Empty } from 'antd';
import { useThrottle } from 'rc-hooks';
import classnames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import type { IconProp } from '../../icons';

import './index.less';

// 兼容 antd v4
import 'antd/es/input/style';
import 'antd/es/grid/style';
import 'antd/es/row/style';
import 'antd/es/col/style';
import 'antd/es/empty/style';

const prefixCls = 'antd-more-input-icon';

export interface SelectPanelProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onSelect'
  > {
  options: IconProp[];
  onSelect: (icon: IconProp) => void;
  visible?: boolean;
  showSearch?: boolean;
  column?: number;
}

const SelectPanel: React.FC<SelectPanelProps> = ({
  onSelect,
  showSearch = true,
  column = 3,
  options,
  visible,
  className,
  ...restProps
}) => {
  const [filterValue, setFilterValue] = React.useState<string>();
  const throttleValue = useThrottle(filterValue, 500);
  const filterOptions = React.useMemo(() => {
    const realValue = throttleValue?.trim();
    return realValue
      ? options.filter((opt) => opt[0].toLowerCase().indexOf(realValue) > -1)
      : options;
  }, [options, throttleValue]);
  const handleSelect = React.useCallback(
    (icon) => {
      onSelect?.(icon);
    },
    [onSelect]
  );
  const handleChange = React.useCallback((e) => {
    setFilterValue(e.target.value);
  }, []);

  const timerRef = React.useRef(null);

  React.useEffect(() => {
    // 隐藏时，清空过滤值
    if (!visible) {
      timerRef.current = setTimeout(() => {
        setFilterValue(undefined);
      }, 500);
    } else {
      clearTimeout(timerRef.current);
    }
  }, [visible]);

  const span = column >= 24 ? 1 : Math.floor(24 / column);

  return (
    <div className={classnames(`${prefixCls}-panel`, className)} {...restProps}>
      {showSearch && (
        <Input
          placeholder="请输入图标名称"
          prefix={<SearchOutlined style={{ color: '#999' }} />}
          value={filterValue}
          autoComplete="off"
          allowClear
          onChange={handleChange}
          className={`${prefixCls}-panel-input`}
        />
      )}
      <div className={`${prefixCls}-panel-result`}>
        {filterOptions && filterOptions.length > 0 ? (
          <Row gutter={16}>
            {filterOptions.map(([name, Comp]) => (
              <Col span={span} key={name}>
                <a className={`${prefixCls}-panel-icon`} onClick={() => handleSelect([name, Comp])}>
                  <Comp />
                  {name}
                </a>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: '25px 0' }} />
        )}
      </div>
    </div>
  );
};

export default SelectPanel;
