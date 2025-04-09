import React, {useEffect,useState} from 'react';


export const Test:React.FC = () => { 

        const [likes, setLikes] = useState<number>(0);
        const [liked,setLiked]  = useState<boolean>(false);

        //存到本地
        useEffect(() =>{
            const storeLikes = localStorage.getItem('likes');
            const storedLiked = localStorage.getItem('liked') === 'true';
                        
            if(storeLikes){
                setLikes(parseInt(storeLikes,10));
            }
            setLiked(storedLiked);

        },[]);

        //更新本地存储
        useEffect(()=>{
            localStorage.setItem('likes',likes.toString());
            localStorage.setItem('liked',liked.toString());
        },[likes,liked]);
        

        const handleLike = () => {
            if(!liked){
                setLikes(prevLikes => prevLikes + 1);
                setLiked(true);
            }
        };
        
        const handleUnlike =() =>{
            if(liked){
                setLikes(prevLikes => prevLikes + 1);
                setLiked(false);
            }
        };
        return (
            <div>
             <button onClick={handleLike}>👍 点赞</button>
             <button onClick={handleUnlike}>👎 取消点赞</button>
             <p>点赞数: {likes}</p>
           </div>
           )


};
  
  export default Test