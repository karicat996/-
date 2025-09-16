import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './WishCard.less';
import CardList from './CardList';


interface WishCardProps {
    id: number;
    title: string;
    description: string;

}


 
export const WishCard: React.FC = () =>{

    const [data,setData] = useState<WishCardProps>();



   
  const cardData = [ 
    { 
        title: "Card title 1", 
        description: "This is the description 1" 
    }, 
    { 
 
        title: "Card title 2", 
        description: "This is the description 2" 
    }, 
    { 
  
        title: "Card title 3", 
        description: "This is the description 3" 
    }, 
    { 

        title: "Card title 3", 
        description: "This is the description 3" 
    }, 
    // 可以根据需要添加更多的卡片数据 
]; 
    
    return(<>
       <div>
       <CardList cardData={cardData}/>
       </div>
      

    </>)
}


export default WishCard;