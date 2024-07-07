import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './types'
import './App.css'

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
      setProducts(response.data.products);
    };

    fetchProducts();
  }, []);

  const [ProductId, setExpandedId] = useState<number | null>(null);

  const Expand = (id: number) => {
    setExpandedId(ProductId === id ? null : id);
  };

  return (
    <div>
      <h1>Products List</h1>
      <div className="lista">
        {products.map(product => (
          <div key={product.id} className='products'>
            <h2>{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} />

            <button onClick={() => Expand(product.id)}>
              {ProductId === product.id ? 'Less' : 'More'}
              {ProductId === product.id && (
                <div className='expand'>
                  <p>Description: {product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ${product.price}</p>
                  <p>Brand: {product.brand}</p>
                </div>
              )} </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
