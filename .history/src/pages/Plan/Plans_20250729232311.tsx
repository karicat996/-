
import { useState,useEffect} from 'react';
import { Table,Space,Button,Tag,Input} from 'antd';
import  './Plans.less';
import type { ColumnsType } from 'antd/es/table';
import {useNavigate} from 'react-router-dom';
import type { GetProps } from 'antd';
import 
import { PlanListServvices } from "../../services/authServices"
type SearchProps = GetProps<typeof Input.Search>;

interface PlanDataType {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export const PlanList = () => {
  const { Search } = Input;
  // const [data,setData] = useState<[]>();
  const [loading,setLoading] = useState(false);
  const [pagination,setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });


  

  const columns: ColumnsType<PlanDataType> = [
    {
      title: '计划名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
    },
    {
      title: '计划状态',
      dataIndex: ' status',
      key: ' status',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
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
      render: (_,) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
];

   const data: PlanDataType[] = [//根据接口请求获取真实的数据
  {
    id: 2,
    name: "se",
    description: "sdw",
    start_time: "",
    end_time: "string;",
    status: false,
    created_at: "string;",
    updated_at:" string;",
    tags: ['loser'],
  },
];

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


  
  //接口获取
  const fetchData = async () => {
    setLoading(true);
    try{
      console.log('接口获取数据');
      const res = await PlanListServvices(
        // {
        //   page: pagination.current, 
        //   pageSize: pagination.pageSize 
        // }

      );
      // setData(res.data);
      // setPagination({
      //   current: res.current_page,
      //   pageSize: res.per_page,
      //   total: res.total,
      // });

    }catch(error){
      console.log('请求出错',error);
    }finally{
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleTableChange =(pagination: any) => {
    setPagination(pagination);

  }

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const handleCreatePlan = ()=>{
    console.log("执行此代码");
    navigate('/create-plan', { 
      state: { planType: 'new' }  // 可选：传递参数 
    });
  };

  return (
    <>
    <div>
      <Space className="Plan-list-header">
      <Search
      placeholder="input search text"
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