import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

// switch可以只显示一个元素,只显示自己遇到的第一个,
// import Header from './Header'
import history from './history'

import NavBar from './views/components/NavBar'


import HomePage from './views/Pages/HomePage'
import GetEthPage from './views/Pages/GetEthPage'
import { LoginPage } from './views/Pages/LoginPage'
import { RegisterPage } from './views/Pages/RegisterPage'
import Alert from './views/components/utils/Alert'


const App = () => {

    return (
        <div>
            <Router history={history}>
                <NavBar />
                <section class='container'>
                <Alert />
               
                    <Switch>

                        <Route path='/' exact component={HomePage} />
                        <Route path='/GetEth' exact component={GetEthPage} />
                        <Route path='/Login' exact component={LoginPage} />
                        <Route path='/Register' exact component={RegisterPage} />
                    </Switch>
                    </section>
            </Router>
        </div>
    )
}

export default App
