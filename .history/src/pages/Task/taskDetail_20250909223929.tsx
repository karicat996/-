import "./index.less"
import React from "react";
import { useState, useEffect} from "react";
import { Space, Typography, Divider  } from 'antd';
const { Text, Link, Title} = Typography;
import './index.less';
interface TaskDetailPageProps {
        name: string  
}

export const TaskDetailPage : React.FC = () => {

  const [taskid,setTaskid] = useState<string>();
 

  
    return (
     <>
    <div className="ThisTasksPage">
        <div className="TaskDetail">
        <Space direction="vertical">\
        <Title level={2}>任务名称：</Title>
        <Text mark>{ }</Text>
        <Text keyboard>Ant Design (keyboard)</Text>
        <Divider /> 
        <a>任务名称：<Text mark>{ }</Text></a>
        <a>任务标题：<Text mark>{ }</Text></a>
        <a>任务状态：<Text mark>{ }</Text></a>
        <a>创建时间：<Text mark>{ }</Text></a>
        <a>更新时间：<Text mark>{ }</Text></a>
        <a>结束时间：<Text mark>{ }</Text></a>
        <Divider /> 
       
        </Space>
          </div>
        <div className="TaskScheme">
            实现方案
          </div>
          <Divider /> 
        <div className="TaskResult">
            任务结果
          </div>
          <Divider /> 
        </div>
     </>   
    )
  }
  
  export default TaskDetailPage;