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
            <Field name='name' label='Enter name' component={renderField} type='text' />
                <Field name='phone' label='Enter phone' component={renderField} type='text' />
                <Field name='password' label='Enter Password' type='password' component={renderField} />
                <Field name='confirmPassword' label='Confirm Password' type='password' component={renderField} />
                <button type='submit' class='btn btn-primary'>
                    Submit
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
        errors.name = 'You must enter a name'
    }
    if (!formValues.password) {
        errors.password = 'You must enter a password'
    }
    if (!phoneResult) {
        errors.phone = 'You must enter a phone'
    }
    if (formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = 'Does not match'
    }

    return errors
}

Register = reduxForm({
    form: 'Register',
    validate,
})(Register)

export default Register
