import { CheckCircleFilled, CheckCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { imgProductData, updateQuantityCart } from '../../action';
import { checkCart } from '../../action/cart';
import cartApi from '../../api/cartApi';
import LoadingButton from '../../components/Loading/loadingButton'
import LoadingWeb from '../../components/Loading/loadingWeb';
import ProductSale from '../../components/Products-sale';
import './style.css';

const DetailProduct = () => {

   const productData = useSelector(state => state.product.listProduct)
   const imgProduct = useSelector(state => state.product.imgProduct)
   const dispatch = useDispatch()

   const [sizeCategory, setSizeCategory] = useState()
   const [sizeProducts, setSizeProducts] = useState()
   const [loading, setLoading] = useState(true)
   const [loadWeb, setLoadWeb] = useState(true)

   useEffect(() => {
      window.scrollTo(0, 0)
      setLoadWeb(false)
   }, [])
   let money = Number(productData.price);
   money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })

   const showSize = (size) => {
      let result = null

      if (size) {
         result = size.map((value, index) => {
            return (
               <li key={index} onClick={() => onChooseSize(setSizeCategory, index, value)}
                  className={sizeCategory === index ? "detail__size__list--active" : "detail__size__list"}>
                  {value.size}
               </li>
            )
         })
      }
      return result
   }
   const onChooseSize = (setSizeCategory, index, value) => {
      setSizeCategory(index)
      setSizeProducts(value.size)
   }

   const onImage = (img) => {
      const action = imgProductData(img)
      dispatch(action)
   }

   const onBuy = (item, size) => {

      const idUser = JSON.parse((localStorage.getItem("task")))
      if (idUser) {
         setLoading(false)
         async function buyProduct() {
            try {
               const res = await cartApi.postCart(idUser._id, item._id, 1, size)
               message.success("Mua hàng thành công !")
               setLoading(true)

               const action = updateQuantityCart(res.totalProducts)
               dispatch(action)
               const actionCheck = checkCart(true)
               dispatch(actionCheck)
            }
            catch (err) {
               setLoading(true)
               message.error("Vui lòng chọn size giày !")
            }
         }
         buyProduct()
      }
      else {
         message.warning("Vui lòng đăng nhập để mua sản phẩm !")
      }
   }
   const showImage = (img) => {
      let result = null
      if (img !== null) {
         result = img.map((value, index) => {
            return (
               <li onClick={() => onImage(value.img)} key={index} className="detail__list__item">
                  <img src={value.img} alt="" />
               </li>
            )
         })
      }
      return result
   }
   const showImageFoot = (img) => {
      let result = null
      if (img !== null) {
         result = img.map((value, index) => {
            return (
               <li key={index} className="detail__bottom__item">
                  <img src={value.img} alt="" />
               </li>
            )
         })
      }
      return result
   }

   return (
      <div className="detail">
         {loadWeb ?
            <LoadingWeb />
            :
            <div className="detail__product">
               <div>
                  <div className="container-fluid row">
                     <div className=" col-xl-7 col-lg-7">
                        <div className="detail__product__left">
                           <ul className="detail__list">
                              {showImage(productData.productImage)}
                           </ul>
                           <div className="detail__img">
                              <img src={imgProduct ? imgProduct : productData.productImage[0].img} alt="" />
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-5 col-lg-5">
                        <div className="detail__product__right ">
                           <div className="detail__product__content">
                              <h2 className="detail__product--title">{productData.title}</h2>
                              <p className="detail__product--decs"> {productData.description} </p>
                              <div className="product--status">
                                 <span >Trạng thái: </span>
                                 <span className="stock"><CheckCircleOutlined /> Còn hàng</span>
                              </div>
                              <div className="detail__price">{money}</div>
                              <div className="detail__size">
                                 <h3>Size:</h3>
                                 <ul className="detail__size__item">
                                    {showSize(productData.sizeProduct)}
                                 </ul>

                              </div>
                              <div className="detail__product__buy">
                                 {loading ?
                                    <button onClick={() => onBuy(productData, sizeProducts)} className="detail__buy"><ShoppingCartOutlined /> MUA HÀNG</button>
                                    :
                                    <LoadingButton />
                                 }

                              </div>
                              <div className="detail__sale">
                                 <h4 className="detail__sale--title">KHUYẾN MÃI KHI MUA HÀNG</h4>
                                 <ul className="detail__sale--decs">
                                    <li><CheckCircleFilled className="icon--sale" /> Miễn phí ship hàng toàn quốc cho đơn hàng trên 2 triệu.</li>
                                    <li><CheckCircleFilled className="icon--sale" /> Với đơn hàng dưới 2 triệu, phí ship đồng giá 30k.</li>
                                    <li><CheckCircleFilled className="icon--sale" /> Nhận hàng và kiểm tra trước khi thanh toán.</li>
                                    <li><CheckCircleFilled className="icon--sale" /> Giao hàng nhanh 60 phút trong nội thành Hà Nội. Tp HCM.</li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="container">
                     <div className="detail__prodct__bottom">
                        <h4 className="detail__bottom--title">Hình ảnh chi tiết
                     <Link to={`/san-pham/${productData.slug}`}>{productData.slug}</Link>
                     được chụp tại T$T-Shop
                  </h4>
                        <ul className="detail__bottom">
                           {showImageFoot(productData.productImage)}
                        </ul>
                     </div>
                  </div>
               </div>
               <ProductSale />
            </div>
         }
      </div>
   )
}

export default withRouter(DetailProduct)
