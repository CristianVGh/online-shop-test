import React from 'react';
import DataService from '../services/data-service';
import "./product-condensed.css";

let ds = new DataService();

export const ProductCondensed = (props) =>{
  
  const removeProduct = () => {
   ds.removeWishListItem(props.product);
  }

  return(
    <li className="list-group-item pc-condensed">
         <a className="btn btn-outline-danger" onClick={() => removeProduct()}>X</a>
         <p>{props.product.title} | <b>${props.product.price}</b></p>
    </li>                                                             
  )
}
//ssss
export default ProductCondensed;