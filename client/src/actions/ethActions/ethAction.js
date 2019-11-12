import history from '../../history'


export const loadingOn = () => {
    //Return an action
    return {
        type: 'setloadingon',
    }
}
export const loadingOff = () => {
    //Return an action
    return {
        type: 'setloadingoff',
    }
}




export const createProduct = (name, price) => async (dispatch, getState) => {
    dispatch({ type: 'setloadingon' })
    const { marketplace, account } = await getState().eth

    price = window.web3.utils.toWei(price, 'Ether')

    await marketplace.methods.createProduct(name, price).send({ from: account[0] })

    dispatch({ type: 'setloadingoff' })
    history.push('/')
}

export const buyProduct = id => async (dispatch, getState) => {
    dispatch({ type: 'setloadingon' })
    const { marketplace, account, products } = await getState().eth
    await marketplace.methods.purchaseProduct(id).send({ from: account[0], value: products[id - 1].price })

    dispatch({ type: 'setloadingoff' })
    history.push('/')
}




