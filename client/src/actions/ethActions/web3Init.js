import Web3 from 'web3'

export const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/55db114174f748f9b73b59a161b8efa8')
        window.web3 = new Web3(provider)
    }
}

export const loadContract = async ContractName => {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = ContractName.networks[networkId]

    const abi = ContractName.abi
    if (networkData) {
        const contract = await new web3.eth.Contract(abi, networkData.address)

        return contract
    } else {
        console.log('not deployed')
    }
}

export const listProduct = () => async (dispatch, getstate) => {
    const { marketplace } = await getstate().eth

    const productCount = await marketplace.methods.productCount().call()

    for (let i = 1; i <= productCount; i++) {
        // for (let i = productCount; i > 0; i--) {
        let payload = await marketplace.methods.products(i).call()
        dispatch({ type: 'addproductlist', payload })
    }
}

// //todo  Should ask whether the user IF HE WANT A DEMO ACCOUNT
// if(accounts[0]){
//     dispatch({ type: 'setAccount', payload: accounts  })
// }else{
//     const newAccount = window.web3.eth.accounts.create()

//     dispatch({ type: 'setAccount', payload: [newAccount.address]  })
//     window.alert(`您的临时账户密钥为:${newAccount.privateKey}`)
// }
