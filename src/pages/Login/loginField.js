import { ErrorMessage } from 'formik'
import '../Login/style.css'
// import {MailOutlined, LockOutlined} from '@ant-design/icons'

import React from 'react'

const LoginField = (props) => {
    const {field ,icon,
        type , label, placeholder
        } = props
        const {name,value,onChange,onBlur} = field
    return (
        <div className="login__nav">
            {label && <label className="login__nav__title">{label}</label>}
            <input onChange={onChange} 
            onBlur={onBlur}
            name={name} 
            value={value} 
            type={type} 
            placeholder={placeholder} 
            />
            {icon}
            <p className="login__error"><ErrorMessage name={name} /></p>
        </div>
    )
}

export default LoginField
