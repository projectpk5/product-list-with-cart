import React from 'react'
import ListCart from './ListCart'
import CartContext from './Context/CartContext'
const App = () => {
  return (
    <>
      <CartContext>
        <ListCart />
      </CartContext>
    </>
  )
}

export default App