import react from 'react';
import {useState,useEffect} from 'react'; 


interface LoginProps{
    email: string;
    password: string;
    remember: boolean;
}


interface AuthResponse{
    token: string;
    user:{
        id: string;
        email: string;
    }
}

const LoginPage: React.FC = () =>{

    const [formData,setFormData] =useState<LoginProps>({
        email: '',
        password: '',
        remember: false
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [isRegisterMode,setIsRegisterMode] = useState<boolean>(false);
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [error,setError] = useState<string>('');

//记住密码功能

    useEffect(()=>{

    });


//表单处理
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value, checked,type} = e.target;
    setFormData(prev => ({ 
            ...prev,
        [name] : type === 'checkbox' ? checked : value
        
        }));

    };
    //登录/注册提交
    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)){
            setError('无效邮箱格式');
            setLoading(false);
            return;
        }

        if(formData.password.length < 6){
            setError('密码长度必须大于等于6');
            setLoading(false);
            return;
        }

        try {
            const response  = await fetch('http://localhost:1111/api/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });


            if(!response.ok){
                throw new Error(await response.text());
            }


            const data : AuthResponse = await response.json();

            if(formData.remember){
                localStorage.setItem('rememberEmail',formData.email);
                localStorage.setItem('rememberPassword', formData.password);
            }else{
                localStorage.removeItem('rememberEmail');
                localStorage.removeItem('rememberPassword');
            }

            window.location.href = '/';


        }catch(err){
            setError('登录失败');
        }finally{
            setLoading(false);
        }


    };


       
    //忘记密码
    const handleForgotPassword = async () =>{
        if (!formData.email){
            setError('请输入邮箱');
            return;
        }

        try{
            const response = await fetch('http://localhost:1111/api/auth/forget-password',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: formData.email})
            });

            if(!response.ok){
                throw new Error('发生邮件失败');
            }
            alert('已发送邮件，请检查您的邮箱');

        }catch(err){
            setError('发生错误');
        }finally{

        }    

    };


    return(
        <div>
           <form onSubmit={handleSumbit}>
            <h2>{isRegisterMode ? '注册' : '登录'}</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label >邮箱</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                {!isRegisterMode && (
                    <div className="form-group">
                        <label>密码</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required  minLength={6}/>
                    </div>
                )}
                <div className="action-buttons">
                <button type="submit" disabled={loading}>
                    {loading ? '处理中...' : isRegisterMode ? '注册' : '登录'}
                </button>
                <button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)}>
                    {isRegisterMode ? '返回登录' : '注册账号'}
                </button>
                {!isRegisterMode && (
                    <button type="button" onClick={() => setIsForgotPassword(!isForgotPassword)}>
                    {isForgotPassword ? '返回登录' : '忘记密码'}
                    </button>
                )}
                </div>
                
                {isForgotPassword && (
                <div className="forgot-password">
                    <button type="button" onClick={handleForgotPassword}>
                    发送重置链接
                    </button>
                </div>
                )}

            </div>
           </form>
        </div>
    )

};




export default LoginPage;

















































