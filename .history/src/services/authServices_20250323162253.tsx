import {useState} from 'react';




type RegisterPayload = {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
}



export const useRegisterServices = () => {

    const [isLoading, setIsLoading] = useState(false);
    const register = async (paload: RegisterPayload) =>{
        setIsLoading(true);
        try{
            const response = await fetch('http://127.0.0.1:4523/m1/6022892-0-default/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paload)
            });

            if (response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message  || 'Registration failed');
            } else {
                const errorData = await response.json();
                alert('注册失败: ' + errorData.message);
            }
        }
        catch(error){
            console.log('请求出错',error);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {register, isLoading}

}