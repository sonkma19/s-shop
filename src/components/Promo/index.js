import React from 'react'
import './style.css'

const Promo = () => {
    return (
        <div className="promo">
            <div className="row">
                <div className="promo__content">
                    <img src="https://res.cloudinary.com/dkzpakm7v/image/upload/v1617611130/samples/anh/img/promo_wbu7vw.jpg" alt="" />
                    <div className="promo__item">
                        <h2 className="promo__title">NEW</h2>
                        <h2 className="promo__decs">SHOES SPORT</h2>
                        <p>CHANGE LIVES INSTITUTIONS DIALOGUE</p>
                        <button className="button__item--new">Mua ngay</button>
                    </div>
                   
                </div>
                <div className="promo__content">
                    <img src="https://res.cloudinary.com/dkzpakm7v/image/upload/v1617611130/samples/anh/img/promo2_odrggq.jpg" alt="" />
                    <div className="promo__item ">
                        <h2 className="promo__title p--sale">SALE</h2>
                        <h2 className="promo__decs">UP TO 50% OFF</h2>
                        <p>PREVENTION SOCIAL RESPONSIBILITY</p>
                        <button className="button__item--sale">Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Promo
