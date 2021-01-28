import * as React from 'react';
import { Card } from 'antd';
import { FormInstance } from 'antd/es/form';
import { CardProps } from 'antd/es/card';
import BizForm, { QueryForm, QueryFormProps } from '../biz-form';
import createFormItems from './_util/createFormItems';
import { SearchProps } from './interface';

export declare interface SearchFormProps extends QueryFormProps {
  formItems?:
    | JSX.Element[] // eslint-disable-line
    | Exclude<React.ReactNode, string | number | boolean | null | undefined>[];
  searchItems?: SearchProps[];
  cardProps?: CardProps;
  ref?: React.MutableRefObject<FormInstance | undefined> | ((instance: FormInstance<any>) => void);
}

const SearchForm: React.FC<SearchFormProps> = React.forwardRef(
  ({ formItems, searchItems, cardProps, name, ...restProps }, ref) => {
    let items = [];
    const [form] = BizForm.useForm();

    if (Array.isArray(formItems) && formItems.length > 0) {
      items = formItems;
    } else if (Array.isArray(searchItems) && searchItems.length > 0) {
      items = createFormItems(searchItems, form);
    }

    if (items.length <= 0) {
      return null;
    }

    const formName = React.useMemo(
      () => name || `biz_table_search_form_${Math.random().toString().substr(2)}`,
      [name],
    );
    React.useImperativeHandle(ref, () => form, [form, ref]);

    return (
      <Card
        bordered={false}
        {...cardProps}
        bodyStyle={{ paddingBottom: 0, ...cardProps?.bodyStyle }}
      >
        <QueryForm form={form} name={formName} {...restProps}>
          {items.map((item: any, index) =>
            React.cloneElement(item, {
              key: item?.key || item?.props?.key || index.toString(),
            }),
          )}
        </QueryForm>
      </Card>
    );
  },
);

export default SearchForm;
