import React, {useState, useEffect} from 'react';
import "./product.css";
import DataService from "../services/data-service"
import NotificationService, {NOTIF_WISHLIST_CHANGED} from "../services/notification-service";

let ds = new DataService();
let ns = new NotificationService();

export const Product = (props) =>{
  const [onWishList, setOnWishList] = useState(false);
  
  useEffect(() => {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, onWishListChanged);

    return function cleanup() {
      ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    };
  }, []);

  const onWishListChanged = (newWishList) => {
    setOnWishList(ds.itemOnWishList(props.product));
  }

//dds
  const onButtonClicked = () => {
    if(onWishList) {
      ds.removeWishListItem(props.product)
      console.log("Removed Product " + props.product.title);
    } else {
      ds.addWishListItem(props.product);
      console.log("Added product " + props.product.title);
    }
  
  }

  
  var btnClass;
  if(onWishList === true) {
    btnClass = "btn btn-danger";
  } else {
    btnClass = "btn btn-primary";
  }

  return(
   
    <div className="card product">
      <img className="card-img-top" src={props.product.imgUrl} alt="Product"></img>
      <div className="card-body">
        <h4 className="card-title">{props.product.title}</h4>
        <p className="card-text">Price: {props.product.price}$</p>
        <a href="#" onClick={() => onButtonClicked()} className={btnClass}>{onWishList ? "Remove From Wishlist" : "Add To Cart"}</a>
      </div>
    </div>                                                              
  )
}

//ss

export default Product;