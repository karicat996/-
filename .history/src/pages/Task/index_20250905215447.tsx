import "./index.less"
import React from "react";
import { useState, useEffect} from "react";
import { Table,Space,Button,Tag,Input} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useNavigate} from 'react-router-dom';
import type { GetProps } from 'antd';
type SearchProps = GetProps<typeof Input.Search>;
interface taskListProps {
        name: string,
        id: string,
        status: string,
        startTime: string,
        endTime: string,
        createTime: string,
        updateTime: string,
        taskType: string,
      
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
  const navigate = useNavigate();
  const handleTableChange =(pagination: any) => {
    setPagination(pagination);

  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const handleEditTask = (record: taskListProps) => { 
  };

  const handleDeleteTask = (record: taskListProps) => { 
  };

  const handletoTask = () => { 
    navigate('/plan/add');
  };

  useEffect(() => { 

    const fetchData = async () => { 
      try{
        const formData: any = {
          user: 7
        };
      } catch(error) {
        return null;

      }finally{
        return null;
      }
    };
    fetchData();


  }, [pagination]);

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
      onClick={()=>{handleEditTask(record.taskId)}}
      aria-label="编辑计划">
        编辑
        </button>
      
      </div>
      <div 
      className ="del-button">
      <button 
      onClick={()=>{handleDeleteTask(record.taskId)}}
      aria-label="删除计划">
        删除
        </button>
      
      </div>
      <div 
      className ="task-button">
      <button 
      onClick={()=>{handletoTask(record.taskId)}}
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