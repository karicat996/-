import "./index.less"
import React from "react";
import { useState, useEffect} from "react";
import { Table,Space,Button,Tag,Input} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useNavigate} from 'react-router-dom';
import type { GetProps } from 'antd';
import { TaskListServvices } from "../../services/authServices";
import {  DeleteTaskServices} from '../../services/authServices';
type SearchProps = GetProps<typeof Input.Search>;
interface taskListProps {
        id:number,
        taskIitle: string,
        taskStatus: string,
        startTime: string,
        endTime: string,
        createTime: string,
        updateTime: string
      
}

export const TaskPage: React.FC = () =>{
  const { Search } = Input;

  const [loading,setLoading] = useState(false);
  const [data, setData] =  useState<taskListProps[]>([]);
  const [pagination,setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,

  });
  const {taskList, isLoading } = TaskListServvices();
  const {deleteTask, delIsLoading } = DeleteTaskServices();
  const navigate = useNavigate(); 
  const handleTableChange =(pagination: any) => {
    setPagination(pagination);

  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const handleEditTask = (id: number) => { 
    //获取当前渲染的列数据的计划id
    console.log("Editing plan with ID:", id);
    navigate('/edit-plan', { 
      state: { id }  // 可选：传递参数 
    });

  };

  const handleDeleteTask = (id: number) => { 
  };

  const handletoTask = (id: number) => { 
    navigate('/plan/add');
  };

  useEffect(() => {
    console.log("useEffect 被触发");
    const fetchData = async () => {
      setLoading(true);
      console.log("开始请求数据");
      try {
        const formData: any = {
          user: 7
        };
        const res: any = await taskList(formData);
        console.log("planList 返回结果:", res);

         if (res && res.success && res.data) {
        // 确保每条数据都有 tags 字段且为数组
        const processedData = res.data.map((item: any) => ({
          taskId: item.taskId,              // 表格行标识需要
          taskTitle: item.taskTitle,     // 对应 dataIndex: 'planTitle'
          description: item.description,  // 对应 dataIndex: 'description'
          startTime: item.startTime,     // 对应 dataIndex: 'startTime'
          endTime: item.endTime,         // 对应 dataIndex: 'endTime'
          taskStatus: item.taskStatus,        // 对应 dataIndex: 'planStatus'
          createdTime: item.createdTime,  // 对应 dataIndex: 'createdTime'
          updateTime: item.updateTime
        }));
        setData(processedData);
      } else {
        console.log("返回数据格式不正确或为空");
        // 设置默认空数组避免错误
        setData([]);
      }
      } catch (error) {
        console.error("获取数据失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const columns: ColumnsType<taskListProps> = [
    {
      title: '任务标题',
      dataIndex: 'taskTitle',
      key: 'taskTitle',
    },
    {
      title: '任务状态',
      dataIndex: 'taskStatus',
      key: 'status'
    },
    {
      title: '任务描述',
      dataIndex:'description',
      key: 'description'

    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
  
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record:taskListProps) => (
        <Space size="middle">
           <div 
      className ="edit-button">
      <button 
      onClick={()=>{handleEditTask(record.id)}}
      aria-label="编辑计划">
        编辑
        </button>
      
      </div>
      <div 
      className ="del-button">
      <button 
      onClick={()=>{handleDeleteTask(record.id)}}
      aria-label="删除计划">
        删除
        </button>
      
      </div>
      <div 
      className ="task-button">
      <button 
      onClick={()=>{handletoTask(record.id)}}
      aria-label="创建任务">
        详情
        </button>
      
      </div>
        </Space>
      ),
    }
  ]





  return(
    <>
    <div className="TaskList">
    <Table
    className="Tasks"
    columns={columns}
    rowKey="taskId"
    pagination={false}
    loading={loading}
    onChange={handleTableChange}
    dataSource={data} 
    />

    </div>
    </>
  );
}


export default TaskPage;