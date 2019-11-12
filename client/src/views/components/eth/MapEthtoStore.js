import React, { useEffect } from 'react'
import Marketplace from '../../../ethContract/abis/Marketplace.json'
import GetFreeEth from '../../../ethContract/abis/GetFreeEth.json'
import { useDispatch } from 'react-redux'
import { loadWeb3, loadContract, listProduct } from '../../../actions/ethActions/web3Init'

//reducer
const MapEthtoStore = () => {
    const dispatch = useDispatch()

    const loadBlockchainData = async () => {
        const web3 = window.web3
        //Load account
        const accounts = await web3.eth.getAccounts()
        const marketplace = await loadContract(Marketplace)
        const getFreeEth = await loadContract(GetFreeEth)
        dispatch({ type: 'setAccount', payload: accounts })
        dispatch({ type: 'setContract', payload: marketplace })
        dispatch({ type: 'setfreeeth', payload: getFreeEth })
        dispatch(listProduct())
    }


    useEffect(() => {
        loadWeb3()
        loadBlockchainData()
        
        
    }, [])

    return null
}

export default MapEthtoStore
