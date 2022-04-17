import React from 'react'
import './style.css'

const Sale = () => {
    return (
        <div className="sale">
                <div className="row">
                    <div className="sale__content">
                        <div className="sale__item">
                            <img src="https://res.cloudinary.com/dkzpakm7v/image/upload/v1620634590/samples/anh/img/sale1_wkojax.jpg" alt="" />
                            <div className="sale__item__border"></div>
                        </div>
                    </div>
                    <div className="sale__content">
                        <div className="sale__item">
                            <img src="https://res.cloudinary.com/dkzpakm7v/image/upload/v1620634591/samples/anh/img/sale2_ah5xfg.jpg" alt="" />
                            <div className="sale__item__border"></div>
                        </div>
                    </div>
                    <div className="sale__content">
                        <div className="sale__item">
                            <img src="https://res.cloudinary.com/dkzpakm7v/image/upload/v1620634590/samples/anh/img/sale3_gzdqsq.jpg" alt="" />
                            <div className="sale__item__border"></div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Sale