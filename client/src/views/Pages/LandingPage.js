import React from 'react'
import {Link ,Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
const LandingPage = () => {
    const {isAuthenticated} = useSelector( state => state.auth )
    if(isAuthenticated){
     return <Redirect to="/Dashboard"/>
    }
    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>区块链测试</h1>
                    <p className='lead'>In the beginning was the Word, and the Word was with God, and the Word was God.</p>
                    <div className='buttons'>
                        <Link to='/Register' className='btn btn-primary'>
                            注册
                        </Link>
                        <Link to='/Login' className='btn btn'>
                            登陆
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
