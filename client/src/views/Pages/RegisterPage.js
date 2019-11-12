import React from 'react'
import Register from '../components/auth/Register'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postRegister} from '../../actions/authActions/formValidate'

export const RegisterPage = () => {
    const dispatch = useDispatch()

    const submit = value => {
        dispatch(postRegister(value))
     
    }

    return (
        <>
            <h1 class='large text-primary'>Sign In</h1>
            <Register onSubmit={submit} />
            <p class='my-1'>
                Already have an account? <Link to='/Login'>Sign In</Link>
            </p>
        </>
    )
}
