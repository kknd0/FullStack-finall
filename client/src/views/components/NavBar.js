import React from 'react'
import { Link } from 'react-router-dom'
import MapEthtoStore from './eth/MapEthtoStore'

const NavBar = () => {
    // const account = useSelector(state => state.eth.account)

    return (
        <nav class='navbar bg-dark'>
            <MapEthtoStore />
            <h1>
                <Link to='/'>
                     <i class='fas fa-code'></i> 区块链测试
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to='/'>拍卖市场</Link>
                </li>
                <li>
                    <Link to='/Login'>Login</Link>
                </li>
                <li>
                    <Link to='/Register'>Register</Link>
                </li>
                <li>
                    <Link to='/GetEth'>获取免费币</Link>
                </li>

                {/* <li>
                    <Link to='GetEth'>您的账户:{account[0]}</Link>
                </li> */}
            </ul>
        </nav>
    )
}

export default NavBar
