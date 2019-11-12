import React from 'react'
import Login from '../components/auth/Login'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postLogin } from '../../actions/authActions/formValidate'

export const LoginPage = () => {
    const dispatch = useDispatch()
    
    const submit = value => {
        dispatch(postLogin(value))
    }

    return (
    <>
            <h1 class='large text-primary'>Sign In</h1>
            <Login onSubmit={submit} />
            <p class='my-1'>
                Don't have an account? <Link to='/Register'>Sign Up</Link>
            </p>
        </>
    )
}
