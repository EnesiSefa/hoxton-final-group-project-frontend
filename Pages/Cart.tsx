import { CartItem, Course, User } from "../src/type";
import { useEffect, useState } from "react";
import { EmptyCart } from "../components/EmptyCart";
import { FullCart } from "../components/FullCart";
import React from "react";
import { port } from "../src/port";
type Props = {
  currentUser: null | User;
  error: null | string[];
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  refreshPage: () => void;
  selectedCourse: Course;
};
export function Cart({
  selectedCourse,
  currentUser,
  error,
  setError,
  refreshPage,
}: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://localhost:${port}/cartitems`, {
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => setCartItems(data));
    cartItems.map((item) => setTotal(item.course.price));
  }, []);

  return (
    <div className="cart">
      <div>
        <ul>
          
            
              <li>
                <img src={selectedCourse.image} height={50} alt="" />
                <h3>{selectedCourse.title}</h3>
                <p>{selectedCourse.price}</p>
              </li>
              <h3>{total}</h3>
            
          
        </ul>
        <button
          onClick={() => {
            const data = {
              balance: currentUser?.balance! - total,
            };
            if (currentUser?.balance! > total) {
              fetch(`http://localhost:${port}/user/${currentUser?.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  if (data.error) {
                    alert(data.error);
                    console.log(data.error);
                  } else {
                    fetch(`http://localhost:${port}/user/${currentUser?.id}`)
                      .then((resp) => resp.json())
                      .then((currentUser) => setUpdatedUser(currentUser));
                  }
                });
            }
          }}
        >
          Buy
        </button>
      </div>
      <div>
        <h3>
          {currentUser?.name} {currentUser?.lastName}
        </h3>
        <p style={currentUser ? { color: "blue" } : { color: "red" }}>
          {updatedUser ? updatedUser.balance : currentUser?.balance}
          {/* nqs ka ardhur Useri i perditesuar vendoset balanca e perditesuar nqs jo ngelet balanca e currentUser  */}
        </p>
      </div>
    </div>
  );
}
