import axios, { AxiosError } from 'axios';
import Cookies from "js-cookie"

const httpServiceGoogle = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

httpServiceGoogle.interceptors.request.use(async(config) => { 
    const token = Cookies.get("chase_token") 
    if (config.data instanceof FormData) {
        console.log('ITS FORMDATA');
        config.headers['Content-Type'] = 'multipart/form-data'
        if (token === null || token === undefined) {
            return config;
        } 
    
        return config;
    } else {
        config.headers['Content-Type'] = 'application/json';
        if (token === null || token === undefined) {
            return config;
        } 
    
        return config;
    }
    
   
},  error => {
    return Promise.reject(error)
}); 

httpServiceGoogle.interceptors.response.use((data) => {
    return data;
}, async(error: AxiosError<any, unknown>) => {
    return Promise.reject(error);
    if (!error.response) {
        return Promise.reject(error);
    } else {
        if (error.response?.data instanceof Array) {
            return Promise.reject(JSON.stringify(error.response?.data));
        } else if (error.response?.data instanceof Object) {
            return Promise.reject(error.response?.data.message);
        }
        else {
            if (error.response?.status === 401 || error.response?.status === 403) {
             localStorage.setItem('token', '');
            }
            
            return Promise.reject(error.response?.data.message);
        }
    }
});

export default httpServiceGoogle;
