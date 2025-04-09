import "./index.less"
import React from "react";
import { useState, useEffect} from "react";
interface TasksProps {
        name: string  
}

export const Tasks: React.FC<TasksProps> = () => {

  const [taskid,setTaskid] = useState<string>();
  const [taskname,setTaskname] = useState<string>();
  const [tasks,setTasks] = useState<string[]>();
  const [competed,setCompeted] = useState<boolean>();
  const [taskList,setTaskList] = useState<string[]>();
  const [taskstates,setTaskstates] = useState<string[]>();


  
    return (
     <>
     <div className="Tasks">
    
      <div className="createTask"></div>
      <div className="myPlan"></div>
      <div className="Taskstore">你好</div>
     </div>
     </>   
    )
  }
  
  export default Tasks