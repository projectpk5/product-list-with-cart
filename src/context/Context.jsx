import React from 'react'
import { createContext, useState } from 'react'

export const Context1 = createContext()

const Context = ({children}) => {
    const [selectProduct, setSelectProduct] = useState([])
    let [mouseOver, setMouseOver] = useState(false)
    let [counter, setCounter] = useState(1)
    let [totalPrice, setTotalPrice] = useState(0)

    const setIncrement = () => {
        setCounter(++counter)
    }

    const setDecrement = () => {
        if (counter > 1) setCounter(--counter)
    }

    const buttonChangeOn = () => {
        setMouseOver(true)
    }

    const buttonChangeOff = () => {
        setMouseOver(false)
    }

    const exportVariables = {totalPrice, setTotalPrice, selectProduct, setSelectProduct, mouseOver, counter, setIncrement, setDecrement, buttonChangeOff, buttonChangeOn}
    return (
        <>
            <Context1.Provider value={exportVariables}>
                {children}
            </Context1.Provider>
        </>
  )
}

export default Context