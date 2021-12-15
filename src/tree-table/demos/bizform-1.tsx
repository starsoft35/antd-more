import * as React from 'react';
import { BizForm, TreeTable } from 'antd-more';
import jsonData from './data1';

const Demo = () => {
  return (
    <BizForm
      initialValues={{
        roles: [
          'HOME',
          'MERCHANT_LIST',
          'MERCHANT_QUERY',
          'MERCHANT_DETAIL',
          'MERCHANT_ADD',
          'MERCHANT'
        ]
      }}
      onFinish={(values) => {
        console.log(values);
      }}
      layout="vertical"
    >
      <BizForm.ItemInput label="角色名称" name="roleName" />
      <BizForm.Item label="角色权限" name="roles">
        <TreeTable
          treeData={jsonData}
          columnTitles={['一级菜单', '二级菜单', '操作']}
          lastColumnMerged
        />
      </BizForm.Item>
    </BizForm>
  );
};

export default Demo;
