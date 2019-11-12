import history from '../../history'
let EthereumTx = require('ethereumjs-tx').Transaction
const adminAddress = '0xB986985bf405AF2e51c199e115236cbD7f050Be3'
const adminPrivatekey = '9882751D69287618C41550216876138EAD6D33E708F33DE344DE69C6AD1C943C'
const contractAddress = '0x66b7e54ff97fff22555a46dbd88b3182aa5bd44a'

export const getEth = () => async (dispatch, getState) => {
    const { getfreeeth, account } = await getState().eth

    //! AUTO contract START
    const data = getfreeeth.methods.sendEth(account[0]).encodeABI()
    const privateKey = Buffer.from(adminPrivatekey, 'hex')
    const nonce = await window.web3.eth.getTransactionCount(adminAddress)
    const txParams = {
        nonce,
        gasLimit: window.web3.utils.toHex(800000),
        gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data,
    }

    const tx = new EthereumTx(txParams, {
        chain: 'rinkeby',
        hardfork: 'petersburg',
    })
    tx.sign(privateKey)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')
    //Broadcast the transaction

    await window.web3.eth.sendSignedTransaction(raw)
    //!  AUTO contract END


    history.push('/')
}