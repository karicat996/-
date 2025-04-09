import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './WishCard.less';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;



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
    <div className="card-list">
      <Card
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  
    </div>
    
    </div>
    </>)
}


export default WishCard;