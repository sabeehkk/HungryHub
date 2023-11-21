// src/App.tsx

import React from 'react';
import ProductForm from './components/ProductForm';

const App: React.FC = () => {
  const handleProductSubmit = (product: { name: string; category: string }) => {
    // Handle the submission logic here (e.g., send data to your server)
    console.log('Product submitted:', product);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-4">Online Food Ordering System</h1>
      <ProductForm onSubmit={handleProductSubmit} />
    </div>
  );
};

export default App;
