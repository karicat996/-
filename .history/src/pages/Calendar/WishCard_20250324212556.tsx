import {useState, useEffect} from 'react';
import { Card } from 'antd';
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
const tabList = [
    {
      key: 'tab1',
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2',
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };


  const tabListNoTitle = [
    {
      key: 'article',
      label: 'article',
    },
    {
      key: 'app',
      label: 'app',
    },
    {
      key: 'project',
      label: 'project',
    },
  ];
  
  const contentListNoTitle: Record<string, React.ReactNode> = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>,
  };

export const WishCard: React.FC = () =>{

    
    const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
    const [activeTabKey2, setActiveTabKey2] = useState<string>('app');


    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
      };
      const onTab2Change = (key: string) => {
        setActiveTabKey2(key);
      };

    return(<>
    <div className="Container-cardlist">
    <Card
        style={{ width: '100%' }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br />
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </div>
    </>)
}


export default WishCard;