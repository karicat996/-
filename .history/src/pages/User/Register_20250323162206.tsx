import {useState,useEffect} from 'react';
import react from 'react';
import './Register.less';
import '../../services/authServices';
import { useRegisterServices } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';


interface Registerform {

        username:string;
        password:string;
        email:string;
        confirmPassword:string;
    }








export const RegisterPage: React.FC =()=>{

    const [registerformState,setRegisterformState] = useState<Registerform>({
        username:'',
        password:'',
        email:'',
        confirmPassword:''
    })

    const [errors, setErrors] = useState<Partial<Registerform>>({});
    const { register,isLoading } = useRegisterServices();
    const  navigate = useNavigate();


    const validateForm = (): boolean => {
        const newErrors: Partial<Registerform> = {};
        if (!registerformState.email.includes('@'))  newErrors.email  = 'Invalid email';
        if (registerformState.password.length  < 8) newErrors.password  = 'Password must be at least 8 characters';
        if (registerformState.password  !==registerformState.confirmPassword)  newErrors.confirmPassword  = 'Passwords do not match';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length  === 0;
      };


    const handleSumbit  = async (e:React.FormEvent) =>{
        e.preventDefault();
        try{
            await register(registerformState);
            navigate('/login',{state:{message:'Registration successful'}})
        }
        catch(error){
            setErrors({ ...errors, username: 'Registration failed. Please try again.' });
        }

    }

    return(<>
    <form onSubmit={handleSumbit} className="register-page">
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username"
             placeholder="Enter your username"
              value={registerformState.username}
               onChange={(e)=>setRegisterformState({
                ...registerformState,username:e.target.value})}
                disabled = {isLoading}
                 />
            {errors.username  && <span className="error">{errors.username}</span>} 
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
            <input type="password" id="password"
             placeholder="Enter your password"
              value={registerformState.password}
               onChange={(e)=>setRegisterformState({
                ...registerformState,password:e.target.value})}
                disabled = {isLoading}
                 />
            {errors.password  && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword"
             placeholder="Enter your password again"
              value={registerformState.confirmPassword}
               onChange={(e)=>setRegisterformState({
                ...registerformState,confirmPassword:e.target.value})}
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
        <button type="submit"
         className="register-sumbit"
         disabled={isLoading}
        >{isLoading ? 'Loading...' : 'Register'}</button>
    </form>
    
    
    </>)

}



export default RegisterPage;



