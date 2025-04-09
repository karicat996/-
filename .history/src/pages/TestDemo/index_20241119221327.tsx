import React, {useEffect,useState} from 'react';

  export const demoButton: React.FC = () => {
      
      const [clickCount, setclickCout] = useState<number>(0);
      const [clickState, setClickstate] =useState<boolean>(false);
      
    //进球数
      const [score,setScore] = useState<number>(0);

  //  初始化渲染一次
      useEffect(()=>{
          const  clickes= localStorage.getItem("clickes")
          const  clicked = localStorage.getItem("clicked")
          
          if(clickes){
             
          }
          if(clicked){
            setClickstate(clicked==='true')
          }     
      }, []);
      

  //  监听clickCount变化
      useEffect(()=>{
          localStorage.setItem("clickes",clickCount.toString())
          localStorage.setItem("clicked",clickState.toString())      
      
      },[clickCount,clickState]);

      
      const handleLike = () => {
          if (clickState == false) {
            // 增加 1
            setclickCout((prevLikes: number) => prevLikes + 1);
            setClickstate(true);
          }
        };
      
        const handleUnlike = () => {
          if (clickState == true) {
            // 减少 1，但不低于 0
            setclickCout((prevLikes: number) => prevLikes - 1);
            setClickstate(false);
          
          }
        };
      
        const handleScore = () => {
          if(score>=0){
            setScore(score+3)
          }
         
        }
        
        const deduction = () => {
          if(score>=3){
            setScore(score-3)
          }
          else{
            alert("分数不能小于0")
          }          
          
        }

        return (
          <>
          <div>
            <button onClick={handleLike}>👍 点赞</button>
            <button onClick={handleUnlike}>👎 取消点赞</button>
            <p>点赞数: {clickCount}</p>
          </div>
          <div>
            <button onClick={handleScore}>得分</button>
            <button onClick={deduction}>扣分</button>
            <p>总分：{score}</p>
          </div>
          </>
        );
      };

  export default demoButton