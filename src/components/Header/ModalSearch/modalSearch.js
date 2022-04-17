import { HeartOutlined, ReloadOutlined, SearchOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductData, searchItem } from '../../../action'
import productApi from '../../../api/productApi'
import LodingProduct from '../../Loading/lodingProduct' 


const ModalSearch = (props) => {
    const valueSearch = props.valueSearch
    const [loadWeb, setLoadWeb] = useState(false)
    const [productSeach, setProductSearch] = useState([])
    const dispatch = useDispatch()

    useEffect(() =>{
        setLoadWeb(true)
        async function getProductSearch(){
            try{
                const res = await productApi.getProductSearch(valueSearch)
                setLoadWeb(false)
                setProductSearch(res.products)
            }
            catch(err){
                setLoadWeb(false)
                // console.log(err);
            }
        }
        getProductSearch()
    },[valueSearch])
    const onDetailProduct = (id) => {
        let result = null
        productSeach.forEach((value) => {
            if (id === value._id) {
                result = value
            }
        })
        if(productSeach){
            const action = ProductData(result)
            dispatch(action)
        }
        
        const actionCheck = searchItem(false)
        dispatch(actionCheck)
    }
    const showProduct = (products) => {
        let result = null
        if(products){
        result = products.map((value, index) => {
            let money = Number(value.price);
            money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })

            return (
                <div key={index} className="col-xl-3 col-sm-6 col-md-4 product__items">
                    <div className="product__content">
                        <div className="product__content__img">
                            <img className="img--before" src={value.productImage[0].img} alt="" />
                            <img className="img--after" src={value.productImage[1].img} alt="" />
                        </div>
                        <div className="product__img--title">Giảm {value.sale}%</div>
                        <ul className="product__button">
                            <li className="product__button--list"><ShoppingCartOutlined /></li>
                            <Link onClick={() => onDetailProduct(value._id)} to={`/products/${value.slug}`} className="product__button--list">
                                <SearchOutlined />
                            </Link>
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
    }
        return result
    }
   
    return (
        <div className="container">
            <div className="row">
                {
                    loadWeb === false ?  showProduct(productSeach) : <LodingProduct />
                }
            </div>
        </div>
    )
}

export default ModalSearch
