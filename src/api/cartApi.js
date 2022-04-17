import axiosClient from "./axiosClient"

const cartApi = {
     postCart : (userId,cartItemId,quantity,size) =>{
         const url = "/cart/create"
         return axiosClient.post(url, {userId,cartItemId,quantity,size})
     },
     getCart : () =>{
        const url = "/cart"
        return axiosClient.get(url)
    },
    deleteCart : (id) =>{
        const url = `/cart/remove/${id}`
        return axiosClient.delete(url)
    },
    updateQuantity : (quantity,slug,size)=>{
        const url = `/cart/update/${slug}?size=${size}&quantity=${quantity}`
        return axiosClient.post(url)
    }
}
export default cartApi