import React from 'react'
import { createContext, useReducer } from 'react'
import data from '../data.json'

export const myCartContext = createContext()

const CartContext = ({children}) => {

    const datav1 = data.map((obj,i)=> ({...obj, id : `item${i}`, quantity: 0}))
    function reducer(state, action) {
        switch (action.type) {
            case 'add': {
                return state.map(
                    (value)=>value.id === action.payload
                    ? {...value, quantity: value.quantity + 1} : value
                )
            }
            case 'subtract': {
                return state.map(
                    (value) => value.id === action.payload && value.quantity > 0 
                    ? {...value, quantity: value.quantity - 1} : value
                )
            }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer,datav1);
    const addFun = (value) =>{
        dispatch(
            {type: 'add', payload: value.id}
        )
    }
    const subtractFun = (value) =>{
        dispatch(
            {type: 'subtract', payload: value.id}
        )
    }
    const myVar = {state, addFun, subtractFun}
    return (
        <>
            <myCartContext.Provider value={myVar}>
                {children}
            </myCartContext.Provider>
        </>
    )
}

export default CartContext