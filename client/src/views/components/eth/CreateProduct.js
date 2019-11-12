import React from 'react'

import { useDispatch } from 'react-redux'
import { createProduct } from '../../../actions/ethActions/ethAction'
import EthForm from './EthForm'

const CreateProduct = () => {
    const dispatch = useDispatch()
    const submit = ({ productName, price }) => {
        dispatch(createProduct(productName, price))
    }
    return (
        <div>
            <EthForm onSubmit={submit} />
        </div>
    )
}

export default CreateProduct
