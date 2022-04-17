import axiosClient from "./axiosClient"

const userApi = {
    postLogin: (email,password) =>{
        const url = '/user/login'
        return axiosClient.post(url, {email,password})
    },
    postSignup: (firstName,lastName,email,password,confirmPassword) =>{
        const url = '/user/signup'
        return axiosClient.post(url, {firstName,lastName,email,password,confirmPassword})
    }
}

export default userApi
