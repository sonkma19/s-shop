import axiosClient from './axiosClient'

const orderApi =  {
   postOrder :(order)=>{
       const url = "/order/create"
       return axiosClient.post(url,order)
   },
   getOrder :()=>{
       const url = "/order"
       return axiosClient.get(url)
   },
   deleteOrder: (id) =>{
       const url = `/order/${id}`
       return axiosClient.delete(url)
   }
}

export default orderApi
