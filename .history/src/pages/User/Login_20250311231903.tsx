import react from 'react';
import {useState,useEffect} from 'react'; 
import  './Login.less'; 
import { AppstoreOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';



interface LoginPageProps{
    username: string,
    email: string,
    password: string
}




const LoginPage: React.FC<LoginPageProps> = () => {

    const [account, setAccount] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [remember,setRemember] = useState<boolean>();
    const [error,setError] = useState<string>();
    const [loading,setLoading] = useState<boolean>();
    const [success,setSuccess] = useState<boolean>();
    const [errorMessage,setErrorMessage] = useState<string>();




    useEffect(()=>{

    },[]);


    //账号邮箱表单校验


    //登录请求
    const handleSumbit = async (event:React.MouseEvent<HTMLButtonElement>) =>{
        //登录请求
        try{
            const response = await fetch('/api/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    account,
                    password,
                    remember
                })
               
                
            });
            const data = await response.json(); 
            if (data.success)  {
                alert('登录成功');
                // 处理登录成功后的逻辑，如跳转页面 
            } else {
                alert('登录失败: ' + data.message); 
            };
        }catch(e){

        }finally{
            setLoading(false);
        }
    };
    //取消登录
    const handleCancel =(event:React.MouseEvent<HTMLButtonElement>) =>{

        console.log(event);
    };




    //忘记密码
    const handleForgetPassword =() =>{

        try{
            //忘记密码请求


        }catch(e){



        }finally{

        }

    };


    //注册
    const handleRegister =()=>{

    };


 



    return (
        <>
        <div className="Login-Container">
            <h2>登录</h2>
            <div className="inputGroup">  
                <label>账号/邮箱：</label>
                 <input 
                 type="text"
                 value={account}
                 onChange={(e)=>{setAccount(e.target.value)}}
                 placeholder="输入用户名、邮箱" />
            </div>
            <div className="inputGroup">
                <label>密码：</label>
                <input type="text"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}} 
                placeholder="输入密码" />
            </div>
            <div className="radioGroup">
                <input
                type="radio"
                id="remember"
                checked={remember}
                onChange={(e)=>{setRemember(e.target.checked)}}/>
                <label htmlFor="remember">记住密码</label>
            </div>
            <div className="buttonGroup">
            <button onClick={handleSumbit}>登录</button>
            <button onClick={handleCancel} value="rememberInput">取消登录</button>
            </div>
            <div className='linkGroup'>
                <a href="#" onClick={handleForgetPassword}>忘记密码</a>
                <a href="#" onClick={handleRegister}>注册</a>
            </div>
           
        
        </div>
    </>)
}



export default LoginPage;






















































