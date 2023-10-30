import React from 'react';
import '../assets/styles/App.css';
import Product from './Product';
import { Route, Routes } from 'react-router-dom';
import Diet from './Diet';
import { useLocalStorage } from '../hooks/useLocalStorage';

function App() {
  const [products, setProducts] = useLocalStorage('products', []);

  return (
    <div className='page'>
      <Routes>
        <Route path='/'
               element={<Diet products={products}
                              setProducts={setProducts} />} />
        <Route path='/products'
               element={<Product products={products}
                                 setProducts={setProducts} />} />
      </Routes>
    </div>
  );
}

export default App;
