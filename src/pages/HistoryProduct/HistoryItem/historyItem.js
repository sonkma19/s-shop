import React from 'react'
import { Link } from 'react-router-dom'
import { Button, message } from 'antd'
import orderApi from '../../../api/orderApi'
import { useDispatch } from 'react-redux'
import { orderHistory } from '../../../action/order'

const HistoryItem = (props) => {
    const dispatch = useDispatch()
    const product = props.Product
    
    const onDelete = (idProduct) => {
        async function deleteProduct() {
            try {
                const res = await orderApi.deleteOrder(idProduct)
                const action = orderHistory(res)
                dispatch(action)
            }
            catch (err) {
                message.success("Bạn đã hủy đơn hàng thành công")

            }
        }
        deleteProduct()
        const action = orderHistory(idProduct)
        dispatch(action)
    }
    const showHistoryProductItem = (productItem) => {
        let result = null
        result = productItem.map((value, index) => {
            let money = value.productId.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })

            return (
                <div key={index} className="history__order__item">
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-8 mr">
                            <div className="history__order__img">
                                <img src={value.productId.productImage[0].img} alt="" />
                            </div>
                        </div>
                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 mr">
                            <div className="history__order__content">
                                <Link className="history__order--title" to="/">{value.productId.title}</Link>
                                <p className="history__order--quantity">Quantity: {value.purchaseQty}</p>
                                <div className="history__order--price">
                                    <span>{money}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return result
    }
   
    const showHistoryProduct = (product) => {
        let result = null
        result = product.map((value, index) => {

            return (
                <div key={index} className="history__order">
                    {showHistoryProductItem(value.items)}
                    <div className="history__info mr">
                        <p>Khách hàng: {value.address.name} ({value.address.phone}) / {value.address.town}-{value.address.city} </p>
                    </div>
                    <div className="history__button mr">
                        <Button onClick={() => onDelete(value._id)} className="history__button--cancel" type="primary" danger>X Hủy Đơn Hàng</Button>
                        <Button className="history__button--edit" type="primary" >Chỉnh Sửa</Button>
                    </div>
                </div>
            )

        })
        return result
    }
    return (
        <div className="history__product">
            { product.length !== 0 ? showHistoryProduct(product)
                :
                <div className="empty">
                    <div className="empty__content">
                        <h2 className="empty__title">Không có đơn hàng nào</h2>
                        <Link to="/" className="empty__button">
                            <button className="shopping">Tiếp tục mua sắm</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default HistoryItem
