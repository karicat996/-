import {useState} from 'react';
import { PlanList } from './../pages/Plan/Plans';




type RegisterPayload = {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
}



type CreatePlanPayload = {
    planTitle: string;
    description: string;
    planStatus: boolean;
    startTime: Date;
    endTime: Date;
    createdTime: Date;
}

type editPlanPagePayload = {
    planTitle: string;
    description: string;
    planStatus: boolean;
    startTime: Date;
    endTime: Date;
    createdTime: Date;
}

type  planListPayLoad = {
    planId : number;
    planTitle: string;
    description: string;
    planStatus: boolean;
    startTime: Date;
    endTime: Date;
    createdTime: Date;
}

type delPlanPayload = {
    planId: number;
}


export const useRegisterServices = () => {

    const [isLoading, setIsLoading] = useState(false);
    const register = async (paload: RegisterPayload) => {
        setIsLoading(true);
        try{
            const response = await fetch('http://127.0.0.1:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                
                },
                body: JSON.stringify(paload)
            });
            if (response.status === 200) {
                return { success: true, message: 'Registration successful' };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Registration failed' };
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


export const PlanListServvices = () => {
    const [isLoading, setLoading] = useState(false);

    const planList = async (payload: planListPayLoad) => {
        setLoading(true);
        const token = "74ef18d29426a04b50f5951c42383fd1464f20cf";
        try {
            const response = await fetch(`http://127.0.0.1:8000/plans/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            
            if (response.status === 200) {
                // 解析响应数据
                const data = await response.json();
                return {
                    success: true, 
                    message: 'Plan list fetched successfully',
                    data: data  // 返回实际数据
                };
            } else {
                const errorData = await response.json();
                return {
                    success: false, 
                    message: errorData.message || 'Plan list fetch failed',
                    data: null
                };
            }
        } catch (error) {
            console.log('请求出错', error);
            return {
                success: false,
                message: '请求出错',
                data: null
            };
        } finally {
            setLoading(false);
        }
    };
    
    return { planList, isLoading };
};


export const CreatePlanServices = () => { 

    const [isLoading,setIsLoading] = useState(false);

    const createPlan = async (payload: CreatePlanPayload) => { 
        setIsLoading(true);
        const token = "74ef18d29426a04b50f5951c42383fd1464f20cf";
        try{

            const response = await fetch('http://127.0.0.1:8000/createplans/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                    
                },
                body: JSON.stringify(payload)
                
            });

            if (response.status === 200){
                return {success: true, message: 'Plan created successfully'};

            }else{
                const errorData = await response.json();
                return {success: false, message: errorData.message || 'Plan creation failed'}
            }
        }
        catch(error){
            console.log('请求出错',error);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {createPlan, isLoading}
}


export const EditPlanServices = () => { 
   const [isLoading,setLoading] = useState(false);

   const editPlan =  async (paload: editPlanPagePayload) =>{
    setLoading(true);
    const token = "74ef18d29426a04b50f5951c42383fd1464f20cf";
    try{ 
        const response = await fetch('http://127.0.0.1:8000/editplans/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(paload)

        })

        if (response.status === 200){
            const data = await response.json();
            return {
                success: true, 
                message: 'Plan list fetched successfully',
                data: data  // 返回实际数据
            };
        }
        else{
            const errorData = await response.json();
            return {
                success: false, 
                message: errorData.message || 'Plan list fetch failed',
                data: null
            };
        }
    }
    catch(error){
        console.log('请求出错', error);
        return {
            success: false,
            message: '请求出错',
            data: null
        };
    }
    finally{
        setLoading(false);
    }
   }
   return { editPlan, isLoading }

}


export const DeletePlanServices =() =>{
    const [delIsLoading,setIsLoading ] = useState(false);
    
    const deletePlan = async (payLoad: delPlanPayload) =>{

        setIsLoading(true);
        const token = "74ef18d29426a04b50f5951c42383fd1464f20cf";
        try{
            const response = await fetch('http://127.0.0.1:8000/deleteplans/',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(payLoad)
            })
            if (response.status === 200){
                return {success: true, message: 'Plan deleted successfully'};
            }
            else{
                const errorData = await response.json();
                return {success: false, message: errorData.message || 'Plan deletion failed'};
            }

        }
        catch(error){
            console.log('请求出错', error);
            return{
                success: false,
                message: '请求出错',
                data: null
            };
        }
        finally{
            setIsLoading(false);
        }

    }
    return {deletePlan, delIsLoading}

}