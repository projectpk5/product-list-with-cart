import React from 'react'
import Context from './context/Context'
import ProductList from './components/ProductList'
const App = () => {
    return (
        <>
            <Context>
              <ProductList />
            </Context>
        </>
    )
}

export default App