import {ErrorMessage} from 'formik'
import React from 'react'

const CheckFormField = (props) => {
    const {field,type,placeholder} = props
    const {value, name, onChange,onBlur} = field
    
    return (
        <div className="form__field">
            <input name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                type={type}
            />
            <p className="field__error"><ErrorMessage name={name} /></p>

        </div>
    )
}

export default CheckFormField
