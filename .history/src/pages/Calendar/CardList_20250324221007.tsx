import { useState} from 'react';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';


const { Meta } = Card;

interface CardDataItem { 
    avatarSrc: string; 
    title: string; 
    description: string; 
}
type CardDataType = CardDataItem[];
export const CardList = ({cardData}: {cardData: CardDataType }) => {

    const [cardDatas, setCardDatas] = useState<CardDataType>(cardData);


   return (
        <div className="card-list">
        {cardData.map((item,  index) => ( 
                    <Card 
                        key={index} 
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
                            avatar={<Avatar src={item.avatarSrc}  />} 
                            title={item.title}  
                            description={item.description}  
                        /> 
                    </Card> 
                ))} 
    </div>)
}

export default CardList;
