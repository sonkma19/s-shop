import { HeartOutlined, MenuOutlined, ReloadOutlined, SearchOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import { Pagination, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductData } from '../../action'
import productApi from '../../api/productApi'
import LoadingProduct from '../../components/Loading/lodingProduct'
import './style.css'

const MenuList = (props) => {
    let nameURL = props.match.match.params.name
    const dispatch = useDispatch()
    const [slug, setSlug] = useState()
    const [err, setErr] = useState()
    const [saleSearch, setSaleSearch] = useState({
        saleFirst: (0).toLocaleString('vi', { style: 'currency', currency: 'VND' }),
        saleLast: (10000000).toLocaleString('vi', { style: 'currency', currency: 'VND' })
    })
    const [page, setPage] = useState(0)
    const [loadWeb, setLoadWeb] = useState(false)
    const [filter, setfilter] = useState({
        slug: '',
        sort: '',
        min: '',
        max: '',
        page: 1
    })
    useEffect(() => {
        setLoadWeb(true)
        window.scrollTo(0, 0)
        async function renderProductSlug() {
            try {
                const pageRes = await productApi.getSlug(nameURL)
                setPage(pageRes.result)
                setErr(null)
                const res = await productApi.getProductBySlug(nameURL, filter)

                setLoadWeb(false)
                setSlug(res)
            }
            catch (err) {
                setLoadWeb(false)
                setErr(err)
            }
        }
        renderProductSlug()
    }, [nameURL, filter])

    const [flag, setFlag] = useState(false)

    const Change = (e) => {
        const { value } = e.target
        setfilter({
            ...filter,
            sort: value
        })
    }

    const onChangeSale = (value) => {
        setSaleSearch({
            ...saleSearch,
            saleFirst: (value[0] * 100000).toLocaleString('vi', { style: 'currency', currency: 'VND' }),
            saleLast: (value[1] * 100000).toLocaleString('vi', { style: 'currency', currency: 'VND' })
        })
    }

    const onAfterChangeSale = (value) => {
        setfilter({
            ...filter,
            min: value[0] * 100000,
            max: value[1] * 100000
        })
    }

    const onDetailProduct = (id) => {
        let result = null
        if (slug) {
            slug.products.forEach((value) => {
                if (id === value._id) {
                    result = value
                }
            })
        }

        const action = ProductData(result)
        dispatch(action)
    }
    const showProductSlug = (products) => {
        let result = null
        if (products) {
            result = products.map((value, index) => {
                let money = Number(value.price);
                money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })

                return (
                    <div key={index} className="col-sm-6 col-md-4 col-xl-3 product__items">
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
    const onMenu = (setFlag, flag) => {
        setFlag(!flag)
    }
    function onChange(newPage) {
        setfilter({
            ...filter,
            page: newPage
        })
    }

    return (
        <div className="shop">

            <div className="container">
                <div className="shop__header">
                    <div className="filter">
                        <div className="filter__left">
                            <select onChange={(e) => Change(e)}
                                className="filter__left__select">
                                <option value="sort">sắp xếp theo giá tiền</option>
                                <option value="sort=price">giá tiền từ thấp đến cao</option>
                                <option value="sort=-price">giá tiền từ cao đến thấp</option>
                            </select>
                        </div>
                        <div className="filter__right">
                            {slug && !slug.message ? <p>Hiển thị tất cả {slug.products.length} kết quả</p> : <p>không có kết quả</p>}
                            <div onClick={() => onMenu(setFlag, flag)} className="filter__search">
                                <span>tìm kiếm</span>
                                <MenuOutlined />
                            </div>
                        </div>
                    </div>
                    <div className={flag === true ? "sidebar--active" : "sidebar"}>
                        <div className="row">
                            <div className="col-xl-6 siba">
                                <div className="sidebar__item">
                                    <h2 className="sidebar__item--title">CHẤT LƯỢNG</h2>
                                    <ul className="sideber__checkbox">
                                        <li className="sideber__checkbox__item">
                                            <input type="checkbox" id="checkbox1" />
                                            <label>In stock</label>
                                        </li>
                                        <li className="sideber__checkbox__item">
                                            <input type="checkbox" id="checkbox2" />
                                            <label>Out stock</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-6 siba">
                                <div className="sidebar__item">
                                    <h2 className="sidebar__item--title">GIÁ TIỀN (Sale %)</h2>
                                    <p className="sidebar__item--decs">Sản phẩm trong khoảng: <span>{saleSearch.saleFirst} - {saleSearch.saleLast} </span></p>
                                    <Slider
                                        range
                                        step={1}
                                        defaultValue={[0, 100]}
                                        onChange={onChangeSale}
                                        onAfterChange={onAfterChangeSale}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {slug && slug.status && !err ?
                    <div className="all__product">
                        <div className="row">
                            {loadWeb ? <LoadingProduct /> :
                                showProductSlug(slug.products)
                            }
                        </div>
                    </div>
                    :
                    <div className="shop__content">
                        <div className="shop__not-product">
                            <h3 className="not-product__title">Không Có Sản Phẩm Nào</h3>
                            <div className="shop__button">
                                <Link to="/"><button className="shopping">Tiếp tục mua sắm</button></Link>
                            </div>
                        </div>
                    </div>

                }
                <Pagination
                    defaultCurrent={1} total={page} current={filter.page} onChange={onChange}
                />
            </div>
        </div>
    )
}

export default MenuList
