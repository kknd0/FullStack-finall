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

let Register = props => {
    const { handleSubmit } = props

    return (


            <form onSubmit={handleSubmit} className='form'>
            <Field name='name' label='请输入用户名' component={renderField} type='text' />
                <Field name='phone' label='请输入手机号码' component={renderField} type='text' />
                <Field name='password' label='请输入密码' type='password' component={renderField} />
                <Field name='confirmPassword' label='请输入确认密码' type='password' component={renderField} />
                <button type='submit' class='btn btn-primary'>
                    提交
                </button>
            </form>

    )
}

const validate = formValues => {
    //regEx
    const errors = {}
    const phonePattern = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    const phoneResult = phonePattern.test(formValues.phone)
    if (!formValues.name) {
        errors.name = '请输入用户名'
    }
    if (!formValues.password) {
        errors.password = '请输入密码'
    }
    if (!phoneResult) {
        errors.phone = '请输入手机号码'
    }
    if (formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = '密码不匹配'
    }

    return errors
}

Register = reduxForm({
    form: 'Register',
    validate,
})(Register)

export default Register
