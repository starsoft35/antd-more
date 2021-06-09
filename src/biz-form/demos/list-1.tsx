import * as React from "react";
import { BizForm } from "antd-more";
import { Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import waitTime from "./utils/waitTime";

const { List, Item, ItemInput } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
    >
      <List name="list">
        {
          (fields, { add, remove }) => {
            return (
              <>
                {
                  fields.map((field, index) => (
                    <div style={{ display: "flex" }} key={field.key}>
                      <ItemInput
                        {...field}
                        label={index === 0 ? "Passengers" : " "}
                        colon={index === 0}
                        style={{ flex: 1, marginRight: 8 }}
                      />
                      <MinusCircleOutlined style={{ marginTop: 9 }} onClick={() => remove(field.name)} />
                    </div>
                  ))
                }
                <Item label=" " colon={false}>
                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                  >
                    添加
                  </Button>
                </Item>
              </>
            )
          }
        }
      </List>
    </BizForm>
  );
}

export default Demo;