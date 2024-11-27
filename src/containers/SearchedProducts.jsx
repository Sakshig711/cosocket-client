import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { useLocation } from 'react-router-dom';

const SearchedProducts = () => { 
    
    const location = useLocation();
  const products = location.state; // Access the passed state
  
  return (
    <Layout>
        <div className="grid grid-cols-4 gap-6 p-10">
        {
            products.map((product, index) => (
                <ProductCard imgUrl={product.image} name={product.name} description={product.description} />
            ))
        }
        </div>
    </Layout>
  )
}

export default SearchedProducts