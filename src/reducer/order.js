
const initalOrder = {
    // orderAction: JSON.parse(localStorage.getItem("cart")) || null,
    orderHistory: null
}

const OrderReducer = (state = initalOrder, action) => {
    switch (action.type) {
        case "ORDER": {
            let updateOrder = state.orderAction
            updateOrder = action.payload
            console.log(updateOrder);
           localStorage.setItem("cart", JSON.stringify(updateOrder))
            return {
                ...state,
                orderAction: updateOrder
            }}
        case "ORDERHISTORY": {
            let neworderHistory = state.orderHistory
            neworderHistory = action.payload

            return {
                ...state,
                orderHistory: neworderHistory
            }
        }

        default:
            return state
    }
}

export default OrderReducer
