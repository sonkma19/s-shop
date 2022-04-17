import React, { useEffect, useState } from 'react'
import './style.css'
import productApi from '../../api/productApi'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingCartOutlined, SearchOutlined, ReloadOutlined, HeartOutlined, StarFilled } from '@ant-design/icons'
import { ProductData } from '../../action'
import {useDispatch} from 'react-redux'
import LoadingProduct from '../Loading/lodingProduct'

const ProductSale = () => {
    const [product, setProduct] = useState([])
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setLoad(true)
        async function renderProduct() {
            try {
                const res = await productApi.getProduct()
                setLoad(false)
                setProduct(res.saleProducts)
            } catch (err) {
                setLoad(false)
                console.log(err);
            }
        }
        renderProduct()
    }, [])

    const onDetailProduct = (id) => {
        let result = null
        product.forEach((value) => {
            if (id === value._id) {
                result = value
            }
        })
        const action = ProductData(result)
        dispatch(action)
            window.scrollTo(0, 0)
    }   
    const showProduct = (saleProducts) => {
        let result = null
        result = saleProducts.map((value, index) => {
            let money = Number(value.price);
            money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            return (
                <div key={index} className="product__items">
                    <div className="product__item__img">
                        <div className="product__content__img">
                            <img className="img--before" src={value.productImage[0].img} alt="" />
                            <img className="img--after" src={value.productImage[1].img} alt="" />
                        </div>
                        <div className="product__img--title">Giảm {value.sale}%</div>
                        <ul className="product__button">
                            <li className="product__button--list"><ShoppingCartOutlined /></li>
                            <Link onClick={() => onDetailProduct(value._id)} to={`/products/${value.slug}`} className="product__button--list"><SearchOutlined /></Link>
                            <li className="product__button--list"><ReloadOutlined /></li>
                            <li className="product__button--list"><HeartOutlined /></li>
                        </ul>
                    </div>
                    <Link onClick={() => onDetailProduct(value._id)} to={`/products/${value.slug}`} className="product__item__title">{value.title}</Link>
                    <div className="product__item__rating">
                        <StarFilled className="rating--th1" />
                        <StarFilled className="rating--th2" />
                        <StarFilled className="rating--th3" />
                        <StarFilled className="rating--th4" />
                        <StarFilled className="rating--th5" />
                    </div>
                    <p className="product__item__price">{money}</p>
                </div>
            )
        })
        return result
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          }
        ]
    };
    return (
        <div className="product__sale">
            <div className="container">
                <div className="product__sale__header">
                    <div className="product__heading">
                        <h1 className="product__sale--title">Sản phẩm sale</h1>
                    </div>
                </div>
                <div className="product__sale__content">
                    <Slider autoplay {...settings}>
                        {load ? <LoadingProduct /> : showProduct(product)}
                    </Slider>
                </div>
            </div>
        </div >
    )
}

export default ProductSale
