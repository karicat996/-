import React from 'react';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import { DatePicker} from 'antd';
import type { DatePickerProps, GetProps } from 'antd';
import { EditPlanServices } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
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
  return value;
};



 export const  EditPlanPage : React.FC = () => {

  const [formData, setFormData] = useState({
    user: '',
    planTitle: '',
    description: '',
    planStatus: '',
    startTime:'',
    endTime:''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { editPlan, isLoading } = EditPlanServices();
  const  navigate = useNavigate();

  const onFinish =  async (value: any) => {

    const formData: any = {
      user: 7,
      planTitle: value.planTitle,
      description: value.description,
      planStatus: value.planStatus,
      startTime:value.Time[0].$d,
      endTime:value.Time[1].$d
    };
    console.log("这是formData",formData);
    const result:any = await editPlan(formData);
    //如果成功返回计划列表
    if (result.success==true) {
      navigate('/plan', { state: { message: '修改计划成功' } });
      console.log("这是接口返回结果",result);
    }
  };
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target; 
    if (name){
      setFormData(prev => ({ ...prev, [name]: value })); 
    }
    

  }


  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItem name="planTitle" label="标题">
              <Input 
              name="planTitle"
              value={formData.planTitle} 
              onChange={handleInputChange}/>
            </MyFormItem>
            <MyFormItem name="planStatus" label="计划状态">
              <Input 
               name="planStatus"
               value={formData.planStatus} 
               onChange={handleInputChange}/>
            </MyFormItem>
       
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
                onOk={onOk}
          />
            </MyFormItem>

            <MyFormItem name="sumbit">
                <Button 
                type="primary" 
                htmlType="submit"
                disabled={isSubmitting}
                
                >
                {isSubmitting ? '确定中...' : '确定'}
                </Button>
            </MyFormItem>
  
  
    </Form>
  );
};

export default  EditPlanPage;
