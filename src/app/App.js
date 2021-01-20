import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

//Components
import Product from "../product/product";
import WishList from "../wishlist/wishlist";

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = (url) => {
    fetch(url)
    .then(results => results.json())
    .then(products => {
      setProducts(products);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    })
  };

  useEffect(() => {
    loadData("http://localhost:3004/product");
  }, []);
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Swag-Shop
        </p>
        
      </header>
      <div className="container-fluid App-main">
        <div className="row">
          <div className="col-sm-8">
            <div className="row">
              {loading ? <p> Loading...</p> : error ? error.message : 
              <ProductList prod={products}/> }
            </div>
          </div>
          <div className="col-sm-4">
            <WishList />
          </div>
        </div>
        
      </div>
    </div>
  );
}

const ProductList = ({prod}) => {
  let list = prod.map((product) => 
    <div className = "col-sm-4" key={product._id}>
      <Product product = {product}/>
    </div>
  );

  return (list);
}

export default App;
