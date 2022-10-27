import { useEffect, useState } from "react";

export function Cart() {
    const [cartItems, setCartItems] = useState([]);
    // const [cartItem, setCartItem] = useState(null);
    useEffect(() => {
      fetch("http://localhost:4167/cartItem", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((rsp) => rsp.json())
        .then((data) => setCartItems(data));
    }, []);
  return (
    <div className="cart-container">
      <div className="cart-row">
        <h1 className="cart-title">Your Cart</h1>
      </div>
      <div className="cart-row">
        <div className="cart-col">
          {cartItems.map((item) => (
            <div className="cart-card">
              <div className="cart-header">
                <h2 className="cart-subTitle">{item.course.title}</h2>
                <span className="cart-varient">{item.course.type}</span>
              </div>
              <div className="cart-body">
                <img src={item.course.image} alt="pizzzaaa here"  />
              </div>
              <div className="cart-footer">
                <div className="cart-footer-top">
                  <p className="cart-price">
                    Price:  {(item.course.prices).toFixed(2)}
                  </p>
                  <p></p>
                </div>
                <div className="cart-footer-bottom">
                  <div className="cart-footer-bottom-left">
                    <p onClick={() => {}} />
                  </div>
                  <div className="cart-footer-bottom-right">
                  
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
