import * as React from 'react';
import { Card } from 'antd';
import { FormInstance } from 'antd/es/form';
import { CardProps } from 'antd/es/card';
import BizForm, { QueryForm, QueryFormProps } from '../biz-form';

export declare interface SearchFormProps extends QueryFormProps {
  formItems?: React.ReactNode[];
  cardProps?: CardProps;
  ref?: React.MutableRefObject<FormInstance | undefined> | ((instance: FormInstance<any>) => void);
}

const SearchForm: React.FC<SearchFormProps> = React.forwardRef(
  ({ formItems, cardProps, name, ...restProps }, ref) => {
    if (!formItems) {
      return null;
    }

    const [form] = BizForm.useForm();
    const formName = React.useMemo(
      () => name || `biz_table_search_form_${Math.random().toString().substr(2)}`,
      [name],
    );
    React.useImperativeHandle(ref, () => form, [form]);

    return (
      <Card
        bordered={false}
        {...cardProps}
        bodyStyle={{ paddingBottom: 0, ...cardProps?.bodyStyle }}
      >
        <QueryForm form={form} name={formName} {...restProps}>
          {React.Children.toArray(formItems).map((item: React.ReactElement) =>
            React.cloneElement(item, {
              key: item.props.key || item.props.name || item.props.label,
            }),
          )}
        </QueryForm>
      </Card>
    );
  },
);

export default SearchForm;
