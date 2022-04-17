import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import { message } from 'antd'
import 'antd/dist/antd.css'
import { FastField, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { userSignUp } from '../../action'
import { checkCart } from "../../action/cart"
import userApi from "../../api/userApi"
import SignupField from '../Signup/signupField'
import './style.css'
import { useState } from "react"
import LoadingButton from "../../components/Loading/loadingButton"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false);
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: ''
    }
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("nhập first name"),
        lastName: yup.string().required("nhập last name"),
        email: yup.string().email("email phải có kí tự").required("nhập email"),
        password: yup.string().min(6, "password chứa ít nhất 6 kí tự").required("nhập password"),
        confirmpassword: yup.string().oneOf([yup.ref("password"), null], "mật khẩu không khớp").required("nhập lại password")
    })
    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
                
                async function signup() {
                    try {
                        setloading(true)
                        const res = await userApi.postSignup(values.firstName,
                            values.lastName, values.email,
                            values.password, values.confirmpassword)
                        
                        history.push("/")
                        const action = userSignUp(res)
                        dispatch(action)
                        const actionCheck = checkCart(false)
                        dispatch(actionCheck)
                        toast.success("Đăng kí thành công!",{
                            position: toast.POSITION.TOP_RIGHT
                        })
                        setloading(false)
                    } catch (err) {
                        console.log(err.response.data.message);
                        message.error(err.response.data.message)

                    }
                }
                signup()
            }
            }>
            {formikProps => {
                return (
                    <div className="signup">
                        <div className="container">
                            <div className="signup__content">
                                <Form className="signup__nav">
                                    <FastField
                                        name="firstName"
                                        type="text"
                                        component={SignupField}
                                        placeholder="First Name"
                                        icon={<UserOutlined className="sign__up__icon" />}
                                        label="First Name:"
                                    />
                                    <FastField
                                        name="lastName"
                                        type="text"
                                        component={SignupField}
                                        placeholder="Last Name"
                                        icon={<UserOutlined className="sign__up__icon" />}
                                        label="Last Name:"
                                    />
                                    <FastField
                                        name="email"
                                        type="email"
                                        component={SignupField}
                                        placeholder="email"
                                        icon={<MailOutlined className="sign__up__icon" />}
                                        label="Email:"
                                    />
                                    <FastField
                                        name="password"
                                        type="password"
                                        component={SignupField}
                                        placeholder="Password"
                                        icon={<LockOutlined className="sign__up__icon" />}
                                        label="Password:"
                                    />
                                    <FastField
                                        name="confirmpassword"
                                        type="password"
                                        component={SignupField}
                                        placeholder="confirmpassword"
                                        icon={<LockOutlined className="sign__up__icon" />}
                                        label="Confirm Password:"
                                    />

                                    <div className="signup__button">
                                        {  
                                            loading ? <LoadingButton /> : 
                                            <button className="signup__submit" type="submit">Đăng kí</button>
                                        }
                                      
                                        <div className="signup__submit__item">
                                            <p>Bạn đã có tài khoản ?</p>
                                            <Link to="/login">Đăng nhập</Link>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                )
            }}

        </Formik>
    )
}

export default Signup
