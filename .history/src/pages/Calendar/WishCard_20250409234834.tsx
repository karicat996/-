import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './WishCard.less';
import CardList from './CardList';


interface WishCardProps {
    id: number;
    title: string;
    description: string;
    date: string;
    priority: string;
    status: string;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}


 
export const WishCard: React.FC = () =>{
   
  const cardData = [ 
    { 
        avatarSrc: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",  
        title: "Card title 1", 
        description: "This is the description 1" 
    }, 
    { 
        avatarSrc: "https://api.dicebear.com/7.x/miniavs/svg?seed=9",  
        title: "Card title 2", 
        description: "This is the description 2" 
    }, 
    // 可以根据需要添加更多的卡片数据 
]; 
    
    return(<>
       <div className="Container-cardlist">
       <CardList cardData={cardData}/>
       </div>
      

    </>)
}


export default WishCard;