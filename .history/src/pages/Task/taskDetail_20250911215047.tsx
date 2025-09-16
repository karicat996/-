import "./index.less"
import React from "react";
import { useState, useEffect} from "react";
import { Space, Typography, Divider,Card } from 'antd';
import { useNavigate } from "react-router-dom";
import { TaskDetailServices } from "../../services/authServices";
const { Text, Link, Title} = Typography;
import './index.less';

interface taskDetailProps {
  id:number,
  taskTitle: string,
  taskStatus: string,
  description: string,
  startTime: string,
  endTime: string,
  createTime: string,
  updateTime: string

}

export const TaskDetailPage : React.FC = () => {

  const [loading,setLoading] = useState(false);
  const {taskDetail,isLoading} = TaskDetailServices();
  const [data, setData] =  useState<taskDetailProps[]>([]);
  const [pagination,setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,});


  useEffect(() => {
    console.log("useEffect 被触发");
    const fetchData = async () => {
      setLoading(true);
      console.log("开始请求数据");
      try {
        const formData: any = {
          user: 7
        };
        const res: any = await taskDetail(formData);
        console.log("task返回结果:", res.data);

        if (res.success && res.data) {
        const taskData: taskDetailProps = {
          id: res.data.id,
          taskTitle: res.data.task_title || res.data.taskTitle,
          taskStatus: res.data.task_status || res.data.taskStatus,
          description: res.data.description,
          startTime: res.data.start_time || res.data.startTime,
          endTime: res.data.end_time || res.data.endTime,
          createTime: res.data.create_time || res.data.createTime,
          updateTime: res.data.update_time || res.data.updateTime
        };
        setData(taskData);
      } else {
        console.log("返回数据格式不正确或为空");
        // 设置默认空数组避免错误
        setData([]);
      }
      } catch (error) {
        console.log("获取数据失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pagination.current, pagination.pageSize]);
  
    return (
     <>
    <Card title="Card title"
     style={{ width: 800 }}>
      <div  className="TaskDetail">
      <Space direction="vertical">
        <Title level={2}>任务名称：</Title>
        <p>任务ID：<Text mark>{ data?.id || "暂无数据"}</Text></p>
        <Text keyboard>Ant Design (keyboard)</Text>
        <Divider /> 
        <p>任务标题：<Text mark>{ data?.taskStatus || "暂无数据" }</Text></p>
        <p>任务状态：<Text mark>{ data?.description|| "暂无数据"}</Text></p>
        <p>创建时间：<Text mark>{ data?.createTime || "暂无数据"}</Text></p>
        <p>更新时间：<Text mark>{ data?.updateTime || "暂无数据"}</Text></p>
        <p>结束时间：<Text mark>{ data?.endTime || "暂无数据" }</Text></p>
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
        </Card>
     </>   
    )
  }
  
  export default TaskDetailPage;