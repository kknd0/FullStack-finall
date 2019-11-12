const initialState = {
    account: '',
    productCount: 0,
    products: [],
    loading: true,
    marketplace: null,
    getfreeeth:null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'setAccount':
            return { ...state, account: payload }
        case 'setContract':
            return { ...state, marketplace: payload }
        case 'setfreeeth':
            return { ...state, getfreeeth: payload }
        case 'setloadingoff':
            return { ...state, loading: false }
        case 'setloadingon':
            return { ...state, loading: false }
        case 'addproductlist':
            return {...state, products:[...state.products,payload] }
        default:
            return state
    }
}
