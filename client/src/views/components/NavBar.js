import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../actions/authActions/authValidate'

const NavBar = () => {
    const account = useSelector(state => state.eth.account)
    const dispatch = useDispatch()
    const { isAuthenticated, authLoading } = useSelector(state => state.auth)
    const logout = () => {
        dispatch(logOut())
    }
    const authLinks = (
        <ul>
            
            <li>
                <Link to='/Dashboard'>
                    <i class='fas fa-user' />
                    <span className='hide-sm'> 个人中心</span>
                </Link>
            </li>
            <li>
                <Link to='/Market'>
                    <i class='fas fa-gavel' />
                    <span className='hide-sm'> 拍卖市场</span>
                </Link>
            </li>

            <li>
                <Link to='/GetEth'>
                    <i class='fas fa-coins' />
                    <span className='hide-sm'> 获取免费币</span>
                </Link>
            </li>

            <li>
                <Link onClick={logout} to='#!'>
                    <i className='fas fa-sign-out-alt' />
                    <span className='hide-sm'> 登出</span>
                </Link>
            </li>
            {/* <li>
            <Link to='GetEth'>您的账户:{account[0]}</Link>
        </li> */}
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to='/Login'>
                    {/* <i class='fas fa-sign-in-alt' /> */}
                    <span className='hide-sm'> 登陆</span>
                </Link>
            </li>
            <li>
                <Link to='/Register'>
                    {/* <i class='fas fa-user-plus' /> */}
                    <span className='hide-sm'> 注册</span>
                </Link>
            </li>
        </ul>
    )
    return (
        <nav class='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i class='fab fa-ethereum' />
                    <span className='hide-sm'> 区块链测试</span>
                </Link>
            </h1>
            {!authLoading && (isAuthenticated ? authLinks : guestLinks)}
        </nav>
    )
}

export default NavBar
