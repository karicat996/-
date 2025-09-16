import "./index.less"
import React from "react";
import { useState, useEffect} from "react";

interface TaskDetailPageProps {
        name: string  
}

export const TaskDetailPage : React.FC = () => {

  const [taskid,setTaskid] = useState<string>();
 

  
    return (
     <>
    <div className="TasksDetail">
        <div className="TaskDetail">
            任务详情
          </div>
        <div className="TaskScheme">
            实现方案
          </div>
        <div className="TaskResult">
            任务结果
          </div>
        </div>
     </>   
    )
  }
  
  export default TaskDetailPage;