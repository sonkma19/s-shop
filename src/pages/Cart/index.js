import { DeleteFilled } from '@ant-design/icons'
import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateQuantityCart } from '../../action'
import { cartTotal } from '../../action/cart'
import cartApi from '../../api/cartApi'
import './style.css'

const Cart = () => {
    const [cartProduct, setCart] = useState({
        cart: [],
        id: null,
        sumProduct: 0,
        result: "",
        totalPrice: 0
    })
    const [number, setNumber] = useState(false)
    const [change, setChange] = useState(false)
    const dispatch = useDispatch()
    const useSelect = useSelector(state => state.user.list)

    // const orderProduct = useSelector(state => state.order.orderAction)
    const cartRefresh = useSelector(state => state.cart.checkCart)

    useEffect(() => {
       setNumber(false)
        async function renderCart() {
            try {
                const res = await cartApi.getCart()
                let moneySum = Number(res.totalPrice);
                moneySum = moneySum.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                setCart({
                    cart: res.cart,
                    id: res.id,
                    sumProduct: moneySum,
                    result: res.result,
                    totalPrice: res.totalPrice
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        renderCart()
    }, [change])

    const onDelete = (idProduct) => {
        async function deleteProduct() {
            try {
                const res = await cartApi.deleteCart(idProduct)

                let moneySum = Number(res.totalPrice);
                moneySum = moneySum.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                setCart({
                    cart: res.cartItems,
                    id: res.id,
                    sumProduct: moneySum,
                    result: res.result,
                    totalPrice: res.totalPrice
                })
                const action = updateQuantityCart(res)
                dispatch(action)
                const actionTotal = cartTotal(cartProduct)
                dispatch(actionTotal)
                message.success("X??a s???n ph???m th??nh c??ng !")
            }
            catch (err) {
                console.log(err);
                message.error("X??a s???n ph???m th???t b???i !")
            }
        }
        deleteProduct()
    }

    const onMinus = (quantity, slug, size) => {
        let flat = false
        if (quantity > 1) {
            quantity -= 1
            flat = true
        }
        else {
            message.warning("S???n ph???m t???i thi???u l?? 1")
        }
        setNumber(true)
        async function minusProduct() {
            try {
                await cartApi.updateQuantity(quantity, slug, size)
                setNumber(false)

                setChange(!change)
                if (flat) {
                    setNumber(true)
                    message.success("Gi???m s???n ph???m th??nh c??ng")
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        minusProduct()
    }
    const onPlus = (quantity, slug, size) => {
        let flat = false
        if (quantity < 10) {
            quantity += 1
            flat = true
        }
        else {
            message.warning("S???n ph???m t???i ??a l?? 10")
        }
        setNumber(true)
        async function plusProduct() {
            try {
                await cartApi.updateQuantity(quantity, slug, size)
                setNumber(false)

                setChange(!change)
                if (flat) {
                    message.success("T??ng s???n ph???m th??nh c??ng")
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        plusProduct()
    }
    const showCart = (cartProduct) => {

        let result = null
        result = cartProduct.map((value, index) => {
            let money = Number(value.price);
            money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            return (
                <div key={index} className="cart__list">
                    <div className="cart__item">
                        <div className="row pr">
                            <div className="col-xl-3 cart__img ">
                                <img src={value.productImage.img} alt="" />
                            </div>
                            <div className="col-xl-9 mr">
                                <div className="row pr">
                                    <div className="col-xl-6 cart__icon--start">
                                        <Link className="name--product" to="/">{value.title}</Link>
                                        <p>Sale: {value.sale}%</p>
                                        <p>Size: {value.size}</p>
                                    </div>
                                    <div className="col-xl-6 cart__icon--end">
                                        <div className="cart__quantity">
                                            <button type="button" onClick={() => onMinus(value.qty, value.slug, value.size)} className={!number ? "cart__minus" :"cart__minus disable"} disabled={number}>-</button>
                                            <span>{value.qty}</span>
                                            <button onClick={() => onPlus(value.qty, value.slug, value.size)} className={!number ? "cart__plus" :"cart__plus disable"} disabled={number}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pr">
                                    <div className="col-xl-6 cart__icon--start">
                                        <div onClick={() => onDelete(value._id)} className="cart__remove">
                                            <DeleteFilled />
                                            <span>X??a</span>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="cart__price cart__icon--end">
                                            <span>{money}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return result
    }

    const onBuyCart = (totalCart) => {
        const action = cartTotal(totalCart)
        dispatch(action)
    }
    return (
        <div className="cart">
            <div className="container">
                {
                    !useSelect || cartProduct.result === 0 || cartRefresh === false ?
                        <div className="empty">
                            <div className="empty__content">
                                <h2 className="empty__title">Kh??ng c?? ????n h??ng n??o</h2>
                                <Link to="/" className="empty__button">
                                    <button className="shopping">Ti???p t???c mua s???m</button>
                                </Link>
                            </div>
                        </div>
                        :
                        <div className="row cart__top">
                            <div className="col-xl-8 col-lg-8 mr">
                                <div className="cart__content">
                                    <h2 className="cart__title">Gi??? H??ng ( {cartProduct.result} s???n ph???m )</h2>
                                    {showCart(cartProduct.cart)}

                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 mr cart__sum">
                                <div className="cart__total">
                                    <h2 className="cart__total--title">C???ng gi??? h??ng</h2>
                                    <div className="cart__amuont">
                                        <span className="cart__amount--title">T???m t??nh</span>
                                        <span className="cart__amount--price">{cartProduct.sumProduct}</span>
                                    </div>
                                    <div className="cart__amuont">
                                        <span className="cart__amount--title">Ph?? ship</span>
                                        <span className="cart__amount--price">30.000 ??</span>
                                    </div>
                                    <div onClick={() => onBuyCart(cartProduct)} className="cart__button">
                                        <Link to="/thanh-toan">Thanh To??n H??ng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                   }
            </div>
        </div>
    )
}

export default Cart
