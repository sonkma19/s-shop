import axios from 'axios'
import queryString from 'query-string'



const axiosClient = axios.create({
    baseURL: 'https://haoshop02.herokuapp.com',
    headers: {
        'content-type':'application/json',
        'Authorization': ''
    },
    paramsSerializer: params => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config) =>{
    //hande token    
        const token = JSON.parse (localStorage.getItem("token"))
        if(token){
            config.headers.Authorization = `Bearer ${JSON.parse (localStorage.getItem("token"))}`
        }
   
    return config
})
axiosClient.interceptors.response.use((response) =>{
    if(response && response.data){
       
        return response.data
    }
    return response
},(error) =>{
    // hende err
    throw error
})
export default axiosClient