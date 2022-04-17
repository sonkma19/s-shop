import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'

const Footer = () => {
    return (
        <div className="footer">
           
            <div className="container">
                <div className="row">
                    <div className="footer__title">
                        <h3>HỆ THỐNG CỬA HÀNG</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/">Địa chỉ: Thái Thụy, Thái Bình</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Số điện thoại: 0971523763</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Email: sonnguyen192501@gmail.com</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__title">
                        <h3>HỖ TRỢ</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/">Hướng dẫn chọn cỡ giày</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Chính sách đổi trả/ hoàn tiền</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Chính sách bảo mật thông tin</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Hướng dẫn mua hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__title">
                        <h3>HỆ THỐNG CỬA HÀNG</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/">Hướng dẫn đặt hàng</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Thông tin thanh toán</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Chính sách giao hàng và nhận hàng</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Liên hệ</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/">Sơ đồ website</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__title">
                        <h3>HỆ THỐNG CỬA HÀNG</h3>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__list__item">
                                    <Link to="/"><EnvironmentOutlined className="footer__icon" /> Thái Thụy, Thái Bình</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/"><PhoneOutlined className="footer__icon nth-2" /> Số điện thoại: 0971523763</Link>
                                </li>
                                <li className="footer__list__item">
                                    <Link to="/"><MailOutlined className="footer__icon" /> Email: sonnguyen192501@gmail.com</Link>
                                </li>
                                <li className="footer__list__item">
                                    <a href="https://www.facebook.com/profile.php?id=100013434319366"><MailOutlined className="footer__icon" /> Facebook: Sơn Nguyễn </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
