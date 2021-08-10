import * as React from 'react';
import { Button, Row, Col, TreeSelect } from 'antd';
import { BizForm, InputIcon } from 'antd-more';
import icons from 'antd-more/es/input-icon/icons';
import { MenuType, HiddenMenu, CacheMenu } from './type';

// 菜单列表
const treeData = [
  {
    title: '顶级类目',
    // value: null,
    value: '',
    children: [
      {
        title: '首页',
        value: 1,
      },
      {
        title: '系统管理',
        value: 2,
        children: [
          {
            title: '用户管理',
            value: 3,
          },
          {
            title: '角色管理',
            value: 4,
          },
        ],
      },
    ]
  }
];

// 菜单类型
const menuTypeOptions = [
  {
    name: '菜单',
    value: MenuType.Menu
  },
  {
    name: '按钮',
    value: MenuType.Action
  },
];

// 菜单可见
const hiddenMenuOptions = [
  {
    name: '是',
    value: HiddenMenu.Yes
  },
  {
    name: '否',
    value: HiddenMenu.No
  }
];

// 菜单缓存
const cacheMenuOptions = [
  {
    name: '是',
    value: CacheMenu.Yes
  },
  {
    name: '否',
    value: CacheMenu.No
  }
];

const { ModalForm, Item, ItemRadio, ItemInput, ItemNumber } = BizForm;

const Demo: React.FC = () => {
  const [form] = BizForm.useForm();
  const [currentMenuType, setCurrentMenuType] = React.useState(MenuType.Menu);
  const menuTypeName = menuTypeOptions.find(item => item.value === (form.getFieldValue('menuType') || MenuType.Menu))?.name || '';
  const onValuesChange = (_, { menuType }: { menuType: MenuType }) => {
    setCurrentMenuType(menuType);
  }
  const onVisibleChange = (visibility) => {
    if (!visibility) {
      form.resetFields();
      setCurrentMenuType(MenuType.Menu);
    }
  }

  return (
    <ModalForm
      title="菜单配置"
      form={form}
      trigger={<Button type="primary">菜单配置</Button>}
      initialValues={{
        menuType: MenuType.Menu,
        sort: 0,
        parent: null,
        hidden: HiddenMenu.No,
        cache: CacheMenu.Yes
      }}
      onFinish={async (values) => {
        console.log(values);
      }}
      onValuesChange={onValuesChange}
      onVisibleChange={onVisibleChange}
      modalProps={{
        centered: false
      }}
    >
      <ItemRadio name="menuType" label="菜单类型" options={menuTypeOptions} optionType="button" radioGroupProps={{ buttonStyle: "solid" }} required />
      <Item name="parent" label="上级类目">
        <TreeSelect treeData={treeData} treeDefaultExpandAll placeholder="请选择" />
      </Item>
      <Row>
        <Col span={12}>
          <ItemInput name="name" label={`${menuTypeName}名称`} required />
        </Col>
        <Col span={12}>
          <ItemInput name="code" label={`${menuTypeName}编号`} required />
        </Col>
        <Col span={12}>
          <ItemNumber name="sort" label="排序" precision={0} inputProps={{ min: 0 }} />
        </Col>
      </Row>
      {
        currentMenuType === MenuType.Menu && (
          <>
            <Item label="菜单图标" name="icon">
              <InputIcon iconData={icons} />
            </Item>
            <Row>
              <Col span={12}>
                <ItemRadio name="hidden" label="是否可见" options={hiddenMenuOptions} optionType="button" radioGroupProps={{ buttonStyle: "solid" }} required />
              </Col>
              <Col span={12}>
                <ItemRadio name="cache" label="是否缓存" options={cacheMenuOptions} optionType="button" radioGroupProps={{ buttonStyle: "solid" }} required />
              </Col>
            </Row>
          </>
        )
      }
    </ModalForm>
  );
}

export default Demo;