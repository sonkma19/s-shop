export const userAction = (item)=>{
    return {
        type: "LOGIN",
        payload: item
    }
}
export const userSignOut = (item)=>{
    return {
        type: "SIGNOUT",
        payload: item,
    }
}
export const userSignUp = (item)=>{
    return {
        type: "SIGNUP",
        payload: item,
    }
}
export const ProductData = (item)=>{
    return {
        type: "PRODUCT",
        payload: item
    }
}
export const imgProductData = (item)=>{
    return {
        type: "IMG",
        payload: item
    }
}
export const updateQuantityCart = (item)=>{
    return {
        type: "QUATITY",
        payload: item
    }
}
export const searchItem = (item) =>{
    return {
        type: "CHECKSEARCH",
        payload: item
    }
}

