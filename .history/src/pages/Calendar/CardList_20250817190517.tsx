import { useState} from 'react';

import { EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import './cardList.less';

const { Meta } = Card;

interface CardDataItem { 
    title: string; 
    description: string; 
}
type CardDataType = CardDataItem[];
export const CardList = ({cardData}: {cardData: CardDataType }) => {

    const [cardDatas, setCardDatas] = useState<CardDataType>(cardData);


   return (
        <div className="Container-cardlist">
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
                            <SearchOutlined  key="detail" />,
                            <EditOutlined key="edit" />, 
                            <DeleteOutlined key="delete" />
                        ]} 
                    > 
                        <Meta 
                           
                            title={item.title}  
                            description={item.description}  
                        /> 
                    </Card> 
                ))} 
    </div>)
}

export default CardList;
