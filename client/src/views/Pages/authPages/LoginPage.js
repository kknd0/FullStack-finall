import React from 'react'
import Login from '../../components/auth/Login'
import { Link , Redirect} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postLogin } from '../../../actions/authActions/authValidate'

export const LoginPage = () => {
    const dispatch = useDispatch()

    const submit = value => {
        dispatch(postLogin(value))
    }
    //! REDIRECT!!!!!
    // if(token){
    //     return <Redirect to = "/dashboard"/>
    // }

    return (
        <>
            <h1 className='large text-primary'>登陆</h1>
            <p className="lead"><i className="fas fa-user"/>登陆您的账户</p>
            <Login onSubmit={submit} />
            <p className='my-1'>
                还没有账户?<Link to='/Register'>点此注册</Link>
            </p>
        </>
    )
}
