import React from 'react'
import { CloseOutlined } from '@ant-design/icons'


let shipPrice = (30000).toLocaleString('vi', { style: 'currency', currency: 'VND' })

const showCheckOrder = (productOrder) => {
    let result = null
    result = productOrder.map((value, index) => {
        let money = Number(value.price);
        money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })
        return (
            <li key={index} className="checkout__list--item order--item">
                <span>{value.title}/ size: {value.size}/<CloseOutlined /> {value.qty} </span>
                <span className="money">{money}</span>
            </li>
        )
    })
    return result
}
const CheckOrder = (props) => {
    const productOrder = props.productOrder
    let sumPrice = productOrder.totalPrice + 30000
    sumPrice = sumPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })

    return (
        <div className="col-xl-6 col-lg-6">
            <div className="checkout__order">
                <h2 className="checkout__order--title">
                    Đơn hàng của bạn
                </h2>
                <ul className="checkout__list">
                    <li className="checkout__list--item">
                        <span>Sản Phẩm</span>
                        <span>Tạm Tính</span>
                    </li>
                    {showCheckOrder(productOrder.checkCart)}
                    <li className="checkout__list--item">
                        <span>Giao hàng</span>
                        <span>{shipPrice}</span>
                    </li>
                    <li className="checkout__list--item">
                        <span>Tổng: </span>
                        <span>{sumPrice}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CheckOrder
