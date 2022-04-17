import React, { useState, useEffect } from 'react'
import cartApi from '../../api/cartApi'
import { Link } from 'react-router-dom'
import CheckOrder from './CheckOutOrder/checkOrder'
import CheckOutForm from './CheckOutForm/checkOutForm'
import LoadingWeb from '../../components/Loading/loadingWeb'
import './style.css'


const CheckOut = () => {
    const [checkProduct, setCheckProduct] = useState({
        checkCart: [],
        totalPrice: ""
    })
    const [loadWeb, setLoadWeb] = useState(false)
    useEffect(() => {
        setLoadWeb(true)
        async function renderCheckOrder() {
            try {
                const res = await cartApi.getCart()
                setLoadWeb(false)

                setCheckProduct({
                    checkCart: res.cart,
                    totalPrice: res.totalPrice
                })
            }
            catch (err) {
                setLoadWeb(false)

                console.log(err);
            }
        }
        renderCheckOrder()
    }, [])
    
    return (
        <div className="checkout">
            {checkProduct.checkCart.length ?
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <CheckOutForm />
                        </div>
                        {loadWeb ? <LoadingWeb /> : <CheckOrder productOrder={checkProduct} />}
                    </div>
                </div>
                :
               
                <div className="notfind">
                     {loadWeb ? <LoadingWeb /> :
                    <div className="container">
                        <div className="notfind__img">
                            <img src="https://res.cloudinary.com/dkzpakm7v/image/upload/v1618038966/samples/anh/background/t%E1%BA%A3i_xu%E1%BB%91ng_ivnxbo.png" alt="" />
                        </div>
                        <div className="notfind__content">
                            <p className="notfind__content--title">Rất tiếc !, có vẻ như đã xảy ra sự cố. Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
                            <p className="notfind__content--decs">Bạn có thể bấm vào
                     <Link to="/san-pham/facebook.com"> đây </Link>
                     để gửi cho tôi một báo cáo hoặc
                     <Link to="/"> trở về trang chủ</Link>
                            </p>
                        </div>
                    </div> }
                </div>
            }
        </div>

    )
}

export default CheckOut
