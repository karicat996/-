import React, {useEffect,useState} from 'react';

export const demoButton: React.FC = () => {
    
    const [clickCount, setclickCout] = useState<number>(0);
    const [clickState, setClickstate] =useState<boolean>(false);

//  初始化渲染一次
    useEffect(()=>{
        const  clickes= localStorage.getItem("clickes")
        const  clicked = localStorage.getItem("clicked")
        
        if(clickes){
            setclickCout(parseInt(clickes,10))
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
        if (!clickCount) {
          // 增加 1
          setclickCout((prevLikes: number) => prevLikes + 1);
          setClickstate(true);
        }
      };
    
      const handleUnlike = () => {
        if (clickCount) {
          // 减少 1，但不低于 0
          setclickCout((prevLikes: number) => prevLikes - 1);
         
        }
      };
    

      return (
        <div>
          <button onClick={handleLike}>👍 点赞</button>
          <button onClick={handleUnlike}>👎 取消点赞</button>
          <p>点赞数: {clickCount}</p>
        </div>
      );
    };

export default demoButton