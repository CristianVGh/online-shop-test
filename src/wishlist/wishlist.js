import React, {useState, useEffect} from 'react';
import "./wishlist.css"; 

import ProductCondensed from "../product-condensed/product-condensed";
import NotificationService, { NOTIF_WISHLIST_CHANGED } from "../services/notification-service";

let ns = new NotificationService();

export const WishList = () =>{
  const [wishList, setWishList] = useState([]); 

  useEffect(() => {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, onWishListChanged);

    return function cleanup() {
      ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    };
  }, []);

  const createWishList = () => {
    let list;
    
    list = wishList.map((product) => 
      <ProductCondensed product={product} key={product._id}/>
    );
 
    return (list);
  }

  const onWishListChanged = (newWishList) => {
    setWishList([...newWishList]);
  }

  if (wishList.length === 0) {
    return (
      <div className="Card">
          <div className="card-body">
              <h4 className="card-title">Wish List</h4>
          </div>
      </div>                                                          
    );
  }

  return(
    <div className="Card">
        <div className="card-body">
            <h4 className="card-title">Wish List</h4>
            <ul className="list-group">
              {createWishList()}
            </ul>
        </div>
    </div>                                                          
  )

}

export default WishList;