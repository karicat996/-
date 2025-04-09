import React from 'react';


export const Test = () => { 
    const LikeButton = () => {
        const [likes, setLikes] = React.useState(0);
        const [liked,setLiked]  = React.useState(false);

        const handleLike = () => {
            if(!liked){
                setLikes(likes+1);
                setLiked(true);
            }
        }
        
        const handleUnlike =() =>{
            if(liked){
                setLikes(likes-1);
                setLiked(false);
            }
        }
        return (
            <div>
             <button onClick={handleLike}>👍 点赞</button>
             <button onClick={handleUnlike}>👎 取消点赞</button>
             <p>点赞数: {likes}</p>
           </div>
           )

    }
}
  
  export default Test