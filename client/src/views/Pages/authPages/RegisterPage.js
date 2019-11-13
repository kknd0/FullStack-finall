import React from 'react'
import Register from '../../components/auth/Register'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postRegister} from '../../../actions/authActions/authValidate'

export const RegisterPage = () => {
    const dispatch = useDispatch()

    const submit = value => {
        dispatch(postRegister(value))
     
    }

    return (
        <>
            <h1 className='large text-primary'>注册</h1>
            <p className="lead"><i className="fas fa-user"/> 注册您的账户</p>
            <Register onSubmit={submit} />
            <p className='my-1'>
                已经有账户了? <Link to='/Login'>点此登陆</Link>
            </p>
        </>
    )
}
