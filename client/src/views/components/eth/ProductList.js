import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { buyProduct } from '../../../actions/ethActions/ethAction'
import { Button } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './styles.css'

const ProductList = () => {


    //eslint-disable-next-line
    const { products, account, marketplace } = useSelector(state => state.eth)
    
    const dispatch = useDispatch()



    const buy = id => {
        dispatch(buyProduct(id))
    }

    return (
        <table className="table">
  
            <tbody>
       

  
              
                        <TransitionGroup className="todo-list">
                        <tr>
                    <td >编号</td>
                    <td >物品名</td>
                    <td >价格</td>
                    <td >持有人</td>
                    <td >竞拍</td>
                </tr>
                            {products.map(({ id, name, price, owner }) => {
                                return (
                                    <CSSTransition
                                        key={id}
                                        timeout={700}
                                        classNames="item"
                                    >
                                      
                                            <tr key={id} className='item'>
                                                <td scope="row">{id}</td>
                                                <td>{name}</td>
                                                {/* <td>{price}</td>  */}
                                                <td>
                                                    {window.web3.utils.fromWei(
                                                        price,
                                                        'ether'
                                                    )}
                                                    以太
                                                </td>
                                                <td>
                                                    {account[0] === owner
                                                        ? '该商品目前是由您持有'
                                                        : owner}
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="success"
                                                        onClick={() => {
                                                            buy(id)
                                                        }}
                                                    >
                                                        竞拍
                                                    </Button>
                                                </td>
                                            </tr>
                                     
                                    </CSSTransition>
                                )
                            })}
                        </TransitionGroup>
           
          
            </tbody>
        </table>
    )
}

export default ProductList
