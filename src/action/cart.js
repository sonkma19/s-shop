export const cartTotal = (item)=>{
    return {
        type: "TOTALCART",
        payload: item,
    }
}
export const checkCart = (item)=>{
    return {
        type: "CHECK",
        payload: item,
    }
}