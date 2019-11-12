

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Form,Button} from 'react-bootstrap'

const renderError = ({ error, touched }) => {

    if (touched && error) {
        return (
            <Form.Text className="text-muted">
                {error}
            </Form.Text>
        )
    }
}


const renderInput = ({ input, label, meta }) => {
    return (
        <Form.Group>
            <Form.Label>{label} </Form.Label>
            <Form.Control type="text" {...input} autoComplete="off" />
            {renderError(meta)}
        </Form.Group>
    )
}

let EthForm = props => {
    const { handleSubmit } = props




    return (
        <Form onSubmit={handleSubmit}>
            <Field
                name="productName"
                //name 必须有的
                label="请输入商品名"
                component={renderInput}
            />
            <Field name="price" label="请输入初始价" component={renderInput} />

            <Button type="submit">确定</Button>
        </Form>
    )
}

const validate = formValues => {
    //regEx
    const errors = {}
    const pricePattern = /^\d*\.?\d*$/
    const priceResult = pricePattern.test(formValues.price)

    if (!formValues.productName) {
        errors.productName = '商品名不能空'
    }
    if (!priceResult) {
        errors.price = '价格不能空'
    }
    return errors
}

EthForm = reduxForm({
    form: 'CreateProduct',
    validate,
})(EthForm)

export default EthForm


