import React, {useState} from "react"
import { AppstoreOutlined,HomeOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';


type MenuItem = (Required<MenuProps>['items'][number]& { route?: string });

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: '欢迎来到我的网站',
    icon: <HomeOutlined />,
    children: [
      { key: '1', label: 'Plan', route: '/plan' }
 
    ],
  },

];


export const SideNav = () => {
  
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');
  const navigate = useNavigate();
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  

  
  return (
    <>
    <Switch
      checked={theme === 'dark'}
      onChange={changeTheme}
      checkedChildren="Dark"
      unCheckedChildren="Light"
    />
    <br />
    <br />
    <Menu
      theme={theme}
      onClick={onClick}
      style={{ width: 256 }}
      defaultOpenKeys={['sub1']}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  </>
  )
}

export default SideNav;