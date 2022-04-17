import { FastField, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { checkCart } from '../../../action/cart'
import orderApi from '../../../api/orderApi'
import dataCity from '../../../data.json'
import CheckFormField from './checkFormField'
import SelectField from './selectField'


const CheckOutForm = () => {
    const cartItem = useSelector(state => state.cart.cartTotal)
   
    const [city, setCity] = useState(dataCity)
    const [district , setDistrict] = useState([])
    const [commune, setCommune] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
   
    const initialValues = {
        name: "",
        phone: "",
        city: "",
        town: "",
        commune: "",
        address: ""
    }
    const validationSchema = yup.object().shape({
        name: yup.string().min(3).max(50).required("Vui lòng nhập tên"),
        phone: yup.string().required("Vui lòng điền số điện thoại"),
        city: yup.string().required("Vui lòng điền tên thành phố"),
        town: yup.string().required("Vui lòng điền tên Quận/Huyện"),
        commune: yup.string().required("Vui lòng nhập tên Xã"),
        address: yup.string().required("Vui lòng điền địa chỉ")
    })

    const onChangeFiled = (e) => {
        const { name, value } = e.target

        if (name === "city") {
          const result = city.find((city) => {
            return city.name === value
          })
          if (result) {
            setDistrict(result.huyen)
          }
        }
        if (name === "town") {
          const result = district.find((district) => {
            return district.name === value
          })
          if (result) {
            setCommune(result.xa)
          }
        }
      }
    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values =>{
                const {name,phone,city,town,address} = values
               
                const newCart = cartItem.cart.map((value) =>{
                    return{
                        productId: value.prod_id,
                        payablePrice: value.price,
                        purchaseQty: value.qty
                    }
                })

                const order = {
                    cardId: cartItem.id,
                    cart: newCart,
                    name,
                    phone,
                    city,
                    town,
                    address,
                    fee: 30000,
                    totalAmount: cartItem.totalPrice
                  }
                
                async function Order(){
                    try{
                         await orderApi.postOrder(order)
                        
                        const action = checkCart(false)
                        dispatch(action)
                        history.push('/lich-su-don-hang') 
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                Order()
            }}
        >
            {formikProps => {
                return (
                    <div className="checkform">
                        <h2 className="checkform--title">Thanh toán và giao hàng</h2>
                        <Form >
                            <FastField type="text"
                                name="name"
                                component={CheckFormField}
                                placeholder="Họ và tên"
                            />

                            <FastField type="number" 
                                name="phone" 
                                component={CheckFormField}
                                placeholder="Số điện thoại" 
                            />
                            <FastField name="city"
                                component={SelectField}
                                options={city}
                                onChangeFiled={onChangeFiled}
                                placeholder="Thành phố"
                            />
                            <FastField name="town"
                                component={SelectField}
                                options={district}
                                onChangeFiled={onChangeFiled}
                                placeholder="Quận/Huyện"
                            />
                            <FastField name="commune"
                                component={SelectField}
                                options={commune}
                                onChangeFiled={onChangeFiled}
                                placeholder="Xã"
                            />                            
                            <FastField type="text" 
                                name="address" 
                                component={CheckFormField}
                                placeholder="Địa chỉ" 
                            />

                            <div className="checkform__button">
                                <button type="submit">Thanh toán khi nhận hàng</button>
                            </div>

                        </Form>

                    </div>
                )
            }
            }
        </Formik>

    )
}

export default CheckOutForm
