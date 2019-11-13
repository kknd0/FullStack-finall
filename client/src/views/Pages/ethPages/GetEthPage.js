import React from 'react'
import { useDispatch} from 'react-redux'
import {  loadingOn } from '../../../actions/ethActions/ethAction'
import { getEth } from '../../../actions/ethActions/sendFreeEth'


const GetEthPage = () => {

    const dispatch = useDispatch()

    const getFreeEth = () => {
        loadingOn()
        dispatch(getEth())
    }

    return (

             <div>
                    <p>点击按钮获得0.2Eth</p>
                    <button onClick={getFreeEth}>getEth</button>
             </div>

    )
}

export default GetEthPage
