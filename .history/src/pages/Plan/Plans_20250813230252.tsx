
import { useState,useEffect} from 'react';
import { Table,Space,Button,Tag,Input} from 'antd';
import  './Plans.less';
import type { ColumnsType } from 'antd/es/table';
import {useNavigate} from 'react-router-dom';
import type { GetProps } from 'antd';
import { PlanListServvices } from "../../services/authServices"
type SearchProps = GetProps<typeof Input.Search>;

interface PlanDataType {
  planId: number;
  planTitle: string;
  description: string;
  startTime: string;
  endTime: string;
  status: boolean;
  createdTime: string;
  tags: string[];
}

export const PlanList = () => {
  const { Search } = Input;
 
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState<PlanDataType[]>([]);
  const [pagination,setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const {planList, isLoading} = PlanListServvices();
  


  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


  
 
  const navigate = useNavigate();
  const handleTableChange =(pagination: any) => {
    setPagination(pagination);

  }

  useEffect(() => {
    console.log("useEffect 被触发");
    const fetchData = async () => {
      setLoading(true);
      console.log("开始请求数据");
      try {
        const formData: any = {
          user: 7
        };
        const res: any = await planList(formData);
        console.log("planList 返回结果:", res);

         if (res && res.success && res.data) {
        // 确保每条数据都有 tags 字段且为数组
        const processedData = res.data.map((item: any) => ({
          plandId: item.planId,              // 表格行标识需要
          planTitle: item.planTitle,     // 对应 dataIndex: 'planTitle'
          description: item.description,  // 对应 dataIndex: 'description'
          startTime: item.startTime,     // 对应 dataIndex: 'startTime'
          endTime: item.endTime,         // 对应 dataIndex: 'endTime'
          planStatus: item.planStatus,        // 对应 dataIndex: 'planStatus'
          createdTime: item.createdTime,   // 对应 dataIndex: 'createdTime'
          tags: Array.isArray(item.tags) ? item.tags : []
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



  const handleEditPlan = (planId : number)=>{
    //获取当前渲染的列数据的计划id
    console.log("Editing plan with ID:", planId);
    // navigate('/edit-plan', { 
    //   state: { planType: 'edit', planId: id}  // 可选：传递参数 
    // });
  }



const columns: ColumnsType<PlanDataType> = [
  {
    title: '计划名',
    dataIndex: 'planTitle',
    key: 'planTitle',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: '计划状态',
    dataIndex: 'planStatus',
    key: 'planStatus',
    render: (status) => (
      <span>{status ? '启用' : '禁用'}</span>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {Array.isArray(tags) && tags.map((tag, index) => {
          // 确保 tag 有值
          if (!tag) return null;
          
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          // 使用 tag 值和 index 组合确保唯一性
          return (
            <Tag color={color} key={`${tag}-${index}`}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
         <div 
    className ="edit-button">
    <button 
    onClick={()=>{handleEditPlan(record.id)}}
    aria-label="编辑计划">
      编辑
      </button>
    
    </div>
        <a>删除</a>
      </Space>
    ),
  },
];

  const handleCreatePlan = ()=>{
    console.log("执行此代码");
    /*
    * 后续补充这段代码的触发逻辑
     */
    navigate('/create-plan', { 
      state: { planType: 'new' }  // 可选：传递参数 
    });
  }


  return (
    <>
    <div>
      <Space className="Plan-list-header">
      <Search
      placeholder="请输入搜索内容"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    <div 
    className ="Plan-new-button">
    <button 
    onClick={handleCreatePlan}
    aria-label="创建新计划">
      创建计划
      </button>
    
    </div>
      </Space>
    </div>
    <Table className="Plan-list"
      columns ={columns}
      rowKey ="id"
      dataSource={data}
      pagination={false}
      loading={loading}
      onChange={handleTableChange}
      bordered
    />
    </>   
  );

};






export default PlanList;