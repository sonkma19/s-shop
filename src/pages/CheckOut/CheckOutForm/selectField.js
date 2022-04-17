import { ErrorMessage } from 'formik'
import React from 'react'

const SelectField = (props) => {
    const {field,options,placeholder,form,onChangeFiled} = props
    const {value, name} = field
   
    const onChangeValue = (e) => {
        const { name, value } = e.target
        
        form.setFieldValue(name, value)
        
        if (name === 'city') {
          onChangeFiled(e)
          form.setFieldValue('town', value)
        }
        if (name === 'town') {
          onChangeFiled(e)
          form.setFieldValue('commune', value)
        }
      }
   
    return (
        <div className="form__field">
           <select
          name={name}
          value={value}
          {...field}
          onChange={(e) => onChangeValue(e)}
        >
          <option value="">
            {placeholder}
          </option>
          {
            options.map((option, index) => {
              return (
                <option
                  value={option.name}
                  key={index}
                >
                  {option.name}
                </option>
              )
            })
          }
        </select>
            <p className="field__error"><ErrorMessage name={name} /></p>

        </div>
    )
}

export default SelectField
