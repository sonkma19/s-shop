import { ErrorMessage } from 'formik'
import React from 'react'
import './style.css'

const SignupField = (props) => {
const {field , type, placeholder, icon,label} = props
const {value, onChange, onBlur, name} = field

    return (
        <nav className="signup__item">
            {label && <label>{label}</label>}
            <input onChange={onChange} 
            name={name} 
            value={value} 
            type={type} 
            placeholder={placeholder} 
            onBlur={onBlur}
            />
            {icon}
            <p className="signup__error"><ErrorMessage name={name} /></p>
        </nav>
    )
}

export default SignupField
