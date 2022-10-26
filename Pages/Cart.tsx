import { CartItem, User } from "../src/type"
import { useEffect, useState } from "react";
import { EmptyCart } from "../components/EmptyCart";
import { FullCart } from "../components/FullCart";
import React from "react";
import { port } from "../src/port";
type Props = {
  currentUser: null | User;
  error: null | string[];
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  refreshPage: () => void
};
export function Cart({ currentUser, error, setError, refreshPage}: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch(`http://localhost:${port}/cartitems`, {
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => setCartItems(data));
  }, []);
  if (cartItems.length === 0)
    return (
      <>
       
        <EmptyCart currentUser={currentUser} />
      </>
    );

  
  return (
    <>
    
      <FullCart
        currentUser={currentUser}
        setError={setError}
        cartItems={cartItems}
        refreshPage={refreshPage}
        setCartItems={setCartItems}
        error={error}
      />
    </>
  );
}
