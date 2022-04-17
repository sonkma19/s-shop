import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const NotFind = () => {
    window.scrollTo(0,0)
    return (
        <div className="notfind">
            <div className="container">
                <div className="notfind__img">
                    <img src="https://res.cloudinary.com/dkzpakm7v/image/upload/v1618038966/samples/anh/background/t%E1%BA%A3i_xu%E1%BB%91ng_ivnxbo.png" alt="" />
                </div>
                <div className="notfind__content">
                    <p className="notfind__content--title">Rất tiếc !, có vẻ như đã xảy ra sự cố. Trang web này sẽ sớm được cập nhật!</p>
                    <p className="notfind__content--decs">Bạn có thể bấm vào
                    <Link to="/san-pham/facebook.com"> đây </Link>
                    để gửi cho tôi một báo cáo hoặc
                    <Link to="/"> trở về trang chủ</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default NotFind
