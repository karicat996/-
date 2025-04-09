import react from 'react';
import {useState,useEffect} from 'react'; 
import styles from './Login.less'; 
import { AppstoreOutlined } from '@ant-design/icons';



interface LoginPageProps{
    username: string,
    email: string,
    password: string
}




const LoginPage: React.FC = (LoginPageProps) => {

    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [remember,setRemember] = useState<boolean>();
    const [error,setError] = useState<string>();
    const [loading,setLoading] = useState<boolean>();
    const [success,setSuccess] = useState<boolean>();
    const [errorMessage,setErrorMessage] = useState<string>();




    useEffect(()=>{

    },[]);




    const handleSumbit =() =>{

        try{
            //登录请求


        }catch(e){



        }finally{

        }

    };


    //账号邮箱表单校验



    //密码表单校验


    //登录请求



    //忘记密码
    const handleForgetPassword =() =>{

        try{
            //忘记密码请求


        }catch(e){



        }finally{

        }

    };







    return (
        <>
        <form className="Login-table">
            <input type="text" placeholder="用户名、邮箱" />
            <input type="text" placeholder="密码" />

            <input type="checkbox" name="remember" id="remember"  />
            <button onClick={handleSumbit}>登录</button>
            <button onClick={}>取消登录</button>
            <button onClick={}>忘记密码</button>
            <button onClick={}>注册</button>
        </form>
    </>)
}























































