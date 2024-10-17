import React from 'react';
import Login from '../components/Login/Login';
import Register from '../components/Register';
import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 30 },
];

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to My E-commerce Site</h1>
      <Login />
      <Register />
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
