import axiosClient from "./axiosClient"

const productApi = {
    getProduct: ()=> {
        const url = "/products/initial-data"
        return axiosClient.get(url)
    },
    getProductBySlug: (slug,filter)=>{
        const url = `/products/${slug}/?${filter.sort}&minPrice=${filter.min}&maxPrice=${filter.max}&page=${filter.page}&limit=${8}`
        return axiosClient.get(url)
    },
    getSlug: (slug)=>{
        const url = `/products/${slug}`
        return axiosClient.get(url)
    },
    getProductSearch: (value) =>{
        const url = `/products/?search=${value}`
        return axiosClient.get(url)
    }
}
export default productApi