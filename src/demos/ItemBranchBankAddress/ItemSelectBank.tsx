import * as React from 'react';
import { queryBanks } from './services';
import type { BizFormItemSelectProps } from 'antd-more';
import { BizFormItemSelect } from 'antd-more';
import { useAsync } from 'rc-hooks';

const ItemSelectBank: React.FC<BizFormItemSelectProps> = ({ ...restProps }) => {
  const { data, loading } = useAsync(
    () =>
      queryBanks().then((res) =>
        res.map((item) => ({
          label: item.bankName,
          value: item.bankName,
        })),
      ),
    {
      cacheKey: 'queryBanks',
      cacheTime: 24 * 60 * 60 * 1000,
      persisted: true,
    },
  );

  return (
    <BizFormItemSelect
      options={data}
      selectProps={{
        showSearch: true,
        loading,
        filterOption(inputValue, option) {
          if (inputValue) {
            return (
              option?.bankIndex.indexOf(inputValue) > -1 ||
              option?.bankShortIndex.indexOf(inputValue) > -1 ||
              option?.bankName.indexOf(inputValue) > -1
            );
          }
          return false;
        },
      }}
      {...restProps}
    />
  );
};

export default ItemSelectBank;
