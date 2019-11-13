//   const submit = value =>{
//        console.log(value)
//    }
//    <Login onSubmit={submit}/>

import React from 'react'
import { Field, reduxForm } from 'redux-form'

  
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className='form-group'>
        <input type={type} {...input} autoComplete='off' placeholder={label} />
        {touched && error && <div className='alert alert-danger'>{error}</div>}
    </div>
)

let Login = props => {
    const { handleSubmit, submitting } = props
 
    return (
        <form onSubmit={handleSubmit} className='form'>
            <Field name='phone' label='请输入手机号码' component={renderField} type='text' />
            <Field name='password' label='请输入密码' type='password' component={renderField} />
            <button type='submit' class='btn btn-primary' disabled={submitting}>
                登陆
            </button>
        </form>
    )
}

const validate = formValues => {
    //regEx
    const errors = {}
    const phonePattern = /(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    const phoneResult = phonePattern.test(formValues.phone)

    if (!formValues.password) {
        errors.password = '请输入一个密码'
    }
    if (!phoneResult) {
        errors.phone = '请输入手机号码'
    }
    return errors
}

Login = reduxForm({
    form: 'Login',
    validate,
})(Login)

export default Login
