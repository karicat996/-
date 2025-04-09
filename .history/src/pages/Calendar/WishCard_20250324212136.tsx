import {useState, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';
import './WishCard.less';



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

    return(<>
    <div className="Container-cardlist">

    </div>
    </>)
}


export default WishCard;