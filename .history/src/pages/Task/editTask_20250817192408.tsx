import "./index.less"
import React from "react";
import { useState, useEffect} from "react";
import './index.less';
interface TaskEditPageProps {
        name: string  
}

export const TaskEditPage : React.FC = () => {

  const [taskid,setTaskid] = useState<string>();
 

  
    return (
     <>
    <div className="TaskEditPage">
       
    </div>
     </>   
    )
  }
  
  export default TaskEditPage;