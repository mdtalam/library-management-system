import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Provider/AuthProvider'

 const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOutUser} = useContext(AuthContext);
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res
        }, async error=>{
            console.log('error caught',error.response)
            if(error.response.status === 401 || error.response.status === 403){
                logOutUser()
                navigate('/login')
            }
        })
    },[logOutUser,navigate])
    return axiosSecure
}

export default useAxiosSecure;