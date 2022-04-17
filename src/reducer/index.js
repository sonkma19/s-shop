import {combineReducers} from 'redux'
import userReducer from './hobby'
import productReducer from './product'
import cartReducer from './cart'
import OrderReducer from './order'

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: OrderReducer
})
export default rootReducer