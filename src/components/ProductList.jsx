import React, { useContext } from 'react'
import { Context1 } from '../context/Context'
import data from '../../data.json'
import shopcart from '/images/icon-add-to-cart.svg'
import Cart from './Cart'
const ProductList = () => {
    const { totalPrice, setTotalPrice, selectProduct, setSelectProduct, 
        mouseOver, counter, setIncrement, setDecrement, buttonChangeOff, buttonChangeOn } = useContext(Context1)
    return (
        <>
            <div className="container">
                <div className="d-flex">
                    <div className="row d-flex col-lg-6 gx-3">
                        <h1 className='my-3'>Choose from the Items</h1>
                        {data.map((value, index) => (
                            <div className="col-lg-4 gx-4" key={index}>
                                <div className="card position-relative w-100">
                                    <img src={value.image.desktop} alt=""/>
                                    <div onMouseEnter={()=>buttonChangeOn()} onMouseLeave={()=>buttonChangeOff()}
                                        className="card-img-overlay d-flex justify-content-center"
                                        onClick={()=>{
                                            const itemAlreadyInCart = selectProduct.find(
                                                (item) => item.name === value.name
                                            )
                                            console.log("found")
                                            if (itemAlreadyInCart) {
                                                setSelectProduct(
                                                    selectProduct.map((item) => {
                                                        return item.name === value.name ?
                                                        {...item, quantity: item.quantity + 1} :
                                                        item
                                                    })
                                                )
                                                // selectProduct.quantity += 1
                                                // setTotalPrice(selectProduct.price)
                                            } else {
                                                setSelectProduct([...selectProduct, {...value, quantity: 1}]);
                                                // selectProduct.quantity = 1
                                                // setTotalPrice(selectProduct.price)
                                            }
                                            setTotalPrice(totalPrice + value.price)
                                            // setSelectProduct(prev => {
                                            //     const updated = [value, ...prev];
                                            //     console.log("Updated products:", updated);
                                            //     return updated;
                                            // });
                                            console.log(selectProduct);
                                        }}>
                                        {!mouseOver ?
                                            (                
                                                <button className='btn btn-outline-danger mb-2'>
                                                    <img src={shopcart} alt="" />Add to Cart 
                                                </button>
                                            )
                                            :
                                            (
                                                <div className="btn btn-group btn-danger rounded-3 mx-3">
                                                    <button className='btn rounded-circle border' 
                                                        onClick={()=>{
                                                            var itemInCart = selectProduct.find((id)=>id.name === value.name)
                                                            if (itemInCart) {
                                                                value.quantity -= 1
                                                            } else {
                                                                value.quantity = 1
                                                            }
                                                            value.quantity = counter
                                                            }}>-</button>
                                                    <button className='btn'>{counter}</button>
                                                    <button className='btn rounded-circle border' 
                                                        onClick={()=>{
                                                            setIncrement()
                                                            value.quantity = counter
                                                            }}>+</button>
                                                </div>
                                            )
                                        }      
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className='text-secondary fs-6 fw-lighter'>{value.category}</p>
                                    <p className='text-black fw-bold'>{value.name}</p>
                                    <p className='text-danger'>${(value.price.toFixed(2))}</p>
                                    <br />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row d-flex flex-column col-lg-3 gx-3">
                        <h1 className='my-3'>Your Orders</h1>
                        <Cart />
                        <div className="container d-flex justify-content-between my-3">
                            TotalPrice:<h1>${totalPrice.toFixed(2)}</h1>
                        </div>
                        <button className='btn btn-danger'
                        data-bs-toggle="modal" data-bs-target="#confirmOrder">Confirm Order</button>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="confirmOrder">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1>Order Confirmed</h1>
                            <p>We hope you enjoy the food</p>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {selectProduct.length > 0 &&
                                selectProduct.map((value,index) => {
                                    <div className="col-lg-4" key={index}>
                                        <img src={value.image.thumbnail} alt="" />
                                        <p>{value.name}</p>
                                        <p>{value.quantity}x ${value.price}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductList