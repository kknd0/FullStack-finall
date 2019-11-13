import React, { Fragment, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

// switch可以只显示一个元素,只显示自己遇到的第一个,
// import Header from './Header'
import history from './history'

import NavBar from './views/components/NavBar'

import MarketPage from './views/Pages/MarketPage'
import GetEthPage from './views/Pages/GetEthPage'
import { LoginPage } from './views/Pages/LoginPage'
import { RegisterPage } from './views/Pages/RegisterPage'
import Alert from './views/components/utils/Alert'
import { loadUser } from './actions/authActions/authValidate'
import { useDispatch } from 'react-redux'
import setAuthToken from './actions/authActions/setAuthToken'
import MapEthtoStore from './views/components/eth/MapEthtoStore'
import LandingPage from './views/Pages/LandingPage'
import Dashboard from './views/components/dashboard/Dashboard'
import PrivateRoute from './views/components/utils/PrivateRoute'

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [])
    return (
        <Fragment>
            <Router history={history}>
                <NavBar />

                <Switch>
                    <Route path='/' exact component={LandingPage} />
                    <section class='container'>
                        <Alert />
                        <Route path='/Login' exact component={LoginPage} />
                        <Route path='/Register' exact component={RegisterPage} />

                        <PrivateRoute path='/Market' exact component={MarketPage} />
                        <PrivateRoute path='/GetEth' exact component={GetEthPage} />
                        
                        <PrivateRoute path='/Dashboard' exact component={Dashboard} />
                    </section>
                </Switch>
            </Router>
            <MapEthtoStore />
        </Fragment>
    )
}

export default App
