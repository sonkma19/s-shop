import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { message } from 'antd'
import 'antd/dist/antd.css'
import { FastField, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { userAction } from '../../action'
import { checkCart } from "../../action/cart"
import userApi from "../../api/userApi"
import LoginField from './loginField'
import { useState } from "react"
import './style.css'
import LoadingButton from "../../components/Loading/loadingButton"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const [loading, setLoading] = useState(false);
    const initialValues = { 
        email: '',
        password: '',
    }
    const validationSchema = yup.object().shape({
        email: yup.string().required("vui lòng nhập email"),
        password: yup.string().required("vui lòng nhập mật khẩu")
    })

    const dispatch = useDispatch()
    let history = useHistory();

    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
                async function login() {
                    try {
                        setLoading(true)
                        const res = await userApi.postLogin(values.email, values.password)
                        history.push('/')
                        const action = userAction(res)
                        dispatch(action)
                        const actionCheck = checkCart(true)
                        dispatch(actionCheck)
                        toast.success("Đăng nhập thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        setLoading(false)
                    } catch (err) {
                        message.error(err.response.data.message)
                        setLoading(false)

                    }
                }
                login()
            }
            }
        >
            {formikProps => {
                return (
                    <div className="login">
                        <div className="container">
                            <div className="login__content">
                                <Form className="login__item">
                                    <FastField
                                        name="email"
                                        type="text"
                                        component={LoginField}
                                        placeholder="email"
                                        label="Tài Khoản:"
                                        icon={<MailOutlined className="login__nav__icon" />}
                                    />
                                    <FastField
                                        name="password"
                                        type="password"
                                        component={LoginField}
                                        placeholder="Password"
                                        label="Mật Khẩu:"
                                        icon={<LockOutlined className="login__nav__icon" />}
                                    />
                                    <div className="login__button">
                                        {   loading ? <LoadingButton /> :
                                             <button type="submit">Đăng nhập</button>
                                        }
                                       
                                        <div className="login__button__item">
                                            <p>Bạn đã có tài khoản ?</p>
                                            <Link to="/sign-up">Đăng kí</Link>
                                        </div>
                                    </div>
                                </Form>

                            </div>
                        </div>

                    </div>
                )
            }
            }

        </Formik>
    )
}

export default Login
