import React from 'react';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import { DatePicker} from 'antd';
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

  const [sumbit,setIsSumbit] = useState<boolean>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    planStatus: '',
    starttime:'',
    endtime:''
  });
  

  const onFinish = (value: object) => {
    console.log(value);
  };

  const handleInputChange = (e) =>{
    const { name, value } = e.target; 
    setFormData(prev => ({ ...prev, [name]: value })); 

  }


  /* 接口需要传
  * taskId  user   plan_title   plan_status  description  start_time  created_time  end_time
  */



  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItemGroup prefix={['user']}>
        <MyFormItemGroup prefix={['name']}>
            <MyFormItem name="planTitle" label="标题">
              <Input 
              name="title"
              value={formData.title} 
              onChange={handleInputChange}/>
            </MyFormItem>
            <MyFormItem name="planStatus" label="计划状态">
              <Input 
               name="planStatus"
               value={formData.planStatus} 
               onChange={handleInputChange}/>
            </MyFormItem>
        </MyFormItemGroup>
            <MyFormItem name="description" label="描述">
              <Input
               name="description"
               value={formData.description} 
               onChange={handleInputChange} />
            </MyFormItem>

            <MyFormItem name="Time">
            <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value, dateString) => {
                  console.log('Selected Time: ', value);
                  console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={onOk}
          />
            </MyFormItem>
            
            </MyFormItemGroup>

            <MyFormItem name="sumbit">
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
            </MyFormItem>
  
  
    </Form>
  );
};

export default  CreatePlanPage;
