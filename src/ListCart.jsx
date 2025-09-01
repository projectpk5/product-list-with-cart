import React, {useReducer} from 'react'
import AddToCartIcon from '/images/icon-add-to-cart.svg'
import EmptyCart from '/images/illustration-empty-cart.svg'
import CarbonNeutralIcon from '/images/icon-carbon-neutral.svg'
import OrderConfirmed from '/images/icon-order-confirmed.svg'
import { useContext, useState } from 'react'
import { myCartContext } from './Context/CartContext'
const ListCart = () => {
    const {state, addFun, subtractFun} = useContext(myCartContext)
    const [buttonChange, setButtonChange] = useState(null)
    const handleClick = (val) =>{
        setButtonChange(prev=> prev === val? null : val)
    }
    
    const grandTotal = state.filter(item => item.quantity > 0)
                        .reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    return (
        <>
        <div className="container">
            <h1>Desserts</h1>
        </div>
        <div className="container d-flex  ">
            <div className='container col-lg-9 col-md-5 d-flex'>
                <div className="row">
                    {state.map(value=>(
                        <div className="col-lg-3 g-3 mx-3" key={value.id}>
                            <div className={`card border ${buttonChange === value.id ? 'border-2 border-danger' : 'border-0'}` }>
                                <img src={value.image.desktop} style={{cursor: 'pointer'}} height="100%" width="100%" onClick={()=>handleClick(value.id)}/>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-center" >
                                    <button className={`btn btn-outline-danger rounded-pill myCustomBtn ${buttonChange === value.id ? 'border-0' : 'border-1 border-danger'}`}>
                                        {buttonChange === value.id ?
                                        (
                                            <span className='btn btn-danger d-flex align-items-center rounded-pill'>
                                                <span className='btn text-white' onClick={()=>addFun(value)}>+</span>
                                                <p className='mx-3 my-2 text-white'>{value.quantity}</p>
                                                <span className='btn text-white' onClick={()=>subtractFun(value)}>-</span>
                                            </span>
                                        )
                                        :
                                        (
                                            <span className='btn btn-outline-danger border border-0 rounded-pill'>
                                                <span className='text-danger'><img src={AddToCartIcon}/>Add to Cart</span>
                                            </span>
                                        ) 
                                        }
                                    </button>
                                </div>
                                <p>{value.name}</p>
                                <p>{value.category}</p>
                                <p>{value.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-lg-5 col-sm-12">
                <h4>Cart Summary</h4>
                {state.map(value => value.quantity > 0) ? 
                    (   
                        <>
                            <ul className='list-unstyled'>
                                {state.filter(item => item.quantity > 0).map(item => (
                                    <>
                                        <li key={item.id}>
                                            {item.name} 
                                        </li>
                                        <li key={item.id}>
                                            {item.quantity} x ${item.price.toFixed(2)} &nbsp;&nbsp;&nbsp; ${(item.quantity * item.price).toFixed(2)}
                                        </li>
                                    </>
                                ))}
                            </ul>
                            <div className="fw-bold mt-3">
                                Grand Total: ${grandTotal.toFixed(2)}
                            </div>
                        </>
                    ) : 
                    (
                        <div className="container">
                            <img src={EmptyCart} alt="" />
                            <p>No items in your cart</p>
                        </div>
                    )
                }

                    <div className="container w-50 rounded text-dark m-2 p-2" style={{backgroundColor: 'hsl(20, 50%, 98%)'}}>
                        <span>
                            <img src={CarbonNeutralIcon} alt="" />
                            This is a carbon neutral delivery
                        </span>
                        
                    </div>
                    <button type="button" className='btn btn-danger rounded-pill mx-5' data-bs-toggle="modal" data-bs-target="#confirmOrderModal">
                        Confirm Order
                    </button>
            </div>
        </div>
        <div className="modal fade" id="confirmOrderModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">
                    <img src={OrderConfirmed} alt="" /><br />
                    <h2>Order Confirmed</h2>
                    <p>We hope you enjoy your food</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                        <div className="modal-body">
                            <ul className='list-unstyled'>
                                {state.filter(item => item.quantity > 0).map(item => (
                                    <div className="container d-flex justify-content-between">
                                        <img src={item.image.thumbnail} width = "20%" alt="" />
                                        <div className="container">
                                            <li>
                                                {item.name} 
                                            </li>
                                            <li>
                                                {item.quantity} x ${item.price.toFixed(2)} 
                                            </li>
                                        </div>
                                        <li>
                                            ${(item.quantity * item.price).toFixed(2)}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                            <div className="fw-bold mt-3 text-center">
                                <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
                                <button className='btn btn-danger rounded-pill mx-3'>Start New Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            
    </>
    )



}

export default ListCart