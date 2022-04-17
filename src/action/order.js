
export const orderProduct = (item) =>{
    return {
        type: "ORDER",
        payload: item
    }
}
export const orderHistory = (item) =>{
    return {
        type: "ORDERHISTORY",
        payload: item
    }
}
