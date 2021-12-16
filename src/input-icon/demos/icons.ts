import type { FC } from 'react';
import {
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  HeatMapOutlined,
  FundOutlined,
  SlidersOutlined
} from '@ant-design/icons';

export type IconProp = [string, FC];

export default new Map([
  // 数据类
  ['AreaChart', AreaChartOutlined],
  ['PieChart', PieChartOutlined],
  ['BarChart', BarChartOutlined],
  ['DotChart', DotChartOutlined],
  ['LineChart', LineChartOutlined],
  ['RadarChart', RadarChartOutlined],
  ['HeatMap', HeatMapOutlined],
  ['Fund', FundOutlined],
  ['Sliders', SlidersOutlined]
]);
