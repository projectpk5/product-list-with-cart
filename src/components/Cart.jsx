import { useContext } from 'react'
import React from 'react'
import { Context1 } from '../context/Context'
const Cart = () => {
    const { selectProduct } = useContext(Context1)
  return (
        <>
            {
                selectProduct.length === 0 ?  
                    (<h1>Your Cart is Empty</h1> )
                    
                :
                    selectProduct.map((value, index) => (
                        <div className="card d-flex flex-row justify-content-between col-lg-5 border border-0 w-100" key={index}>
                            <div className="desc">
                                <p>{value.name} </p>
                                <p>{value.quantity}x Per Item {value.price}</p>
                            </div>
                            <div className="total">
                                <p>${value.quantity * value.price}</p>
                            </div>
                        </div>
                        
                    ))
            }
        </>
  )
}

export default Cart