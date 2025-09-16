import React from 'react';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<React.PropsWithChildren<MyFormItemGroupProps>> = ({
  prefix,
  children,
}) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};


type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};
 export const  CreatePlanPage : React.FC = () => {
  const onFinish = (value: object) => {
    console.log(value);
  };

  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItemGroup prefix={['user']}>
        <MyFormItemGroup prefix={['name']}>
          <MyFormItem name="planTitle" label="标题">
            <Input />
          </MyFormItem>
          <MyFormItem name="planStatus" label="计划状态">
            <Input />
          </MyFormItem>
        </MyFormItemGroup>

        <MyFormItem name="age" label="Age">
          <Input />
        </MyFormItem>
      </MyFormItemGroup>

      <RangePicker
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      onChange={(value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }}
      onOk={onOk}
    />

  <Button type="primary" htmlType="submit">
        Submit
      </Button>

    </Form>
  );
};

export default  CreatePlanPage;
