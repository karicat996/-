import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './WishCard.less';
import CardList from './CardList';
import { TaskListServices } from "../../services/authServices";
import { DeleteTaskServices } from '../../services/authServices';


interface taskListProps {
    id:number,
    taskIitle: string,
    taskStatus: string,
    startTime: string,
    endTime: string,
    createTime: string,
    updateTime: string
  
};

interface WishCardProps {
    id: number;
    tasktitle: string;
    description: string;
};

 
export const WishCard: React.FC = () =>{


    const [loading,setLoading] = useState(false);
    const [data, setData] =  useState<WishCardProps[]>([]);
    const [pagination,setPagination] = useState<any>({
      current: 1,
      pageSize: 10,
      total: 0,
  
    });
    const {taskList, isLoading } = TaskListServices();
    // const {deleteTask, delIsLoading } = DeleteTaskServices();
   
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
            console.log("获取数据失败:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [pagination.current, pagination.pageSize]);
      
      const cardData = data.map(item => ({
        title: item.tasktitle,
        description: item.description
    })); 
        
        return(<>
        <div>
        <CardList cardData={cardData}/>
        </div>
        

    </>)
}


export default WishCard;