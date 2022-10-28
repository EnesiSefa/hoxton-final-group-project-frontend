import { useEffect, useState } from "react";
import { port } from "../src/port";
import { CartItem, Course, User } from "../src/type";

type Props = {
  currentUser: User | null;
  refreshPage: () => void;
};

export function Cart({ currentUser, refreshPage }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  // const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:${port}/cartItems`, {
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => setCartItems(data));
  }, []);
  console.log(cartItems);
  function getTotal() {
    let total = 0;
    for (let course of cartItems) {
      total += course.course.price;
    }
    return total;
  }
  {
    /* <p className="total">
                Total:£{(product.flower.price * product.amount).toFixed(2)}
              </p>
            </article>
          </li>
        ))}
      </ul>
      <h2 className="total-basket">Total is: £{getTotal().toFixed(2)}</h2>
    </div>
  ); */
  }

  return (
    <div className="cart-container">
      <div className="userData">
        <h1 className="userName">{`${currentUser?.name}${"'s Cart"}`}</h1>
        <h4 className="userBalance">{updatedUser?.balance}</h4>
      </div>
      {cartItems
        ? cartItems.map((item) => (
            <div className="cart-body">
              <div className="cart-img-div">
                <img
                  className="cart-img"
                  src={item.course.image}
                  height={50}
                  alt="course here"
                />
              </div>
              <div className="cart-desc">
                <h2 className="cart-subTitle">{item.course.title}</h2>
                <p className="cart-price">
                  Price: {item.course.price.toFixed(2)}
                </p>
                <p onClick={() => {}} />
                <button
                  className="delete-cartItem"
                  variant="text"
                  color="error"
                  onClick={() => {
                    fetch(`http://localhost:${port}/cartitem/${item.id}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: localStorage.token,
                      },
                    })
                      .then((rsp) => rsp.json())
                      .then((data) => setCartItems(data));
                    refreshPage();
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        : ""}
      <p className="total-Price">Total price: ${getTotal().toFixed(2)}</p>

      {/* <button
            onClick={(e) => {
              e.preventDefault();
              const data = {
                balance: getTotal() - currentUser?.balance!,
              };
              if (getTotal() < currentUser?.balance!) {
                fetch(
                  `http://localhost:${port}/changeUserBalance/:${currentUser?.id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }
                )
                  .then((resp) => resp.json())
                  .then((data) => {
                    if (data.error) {
                      alert(data.error);
                      console.log(data.error);
                    } else {
                      fetch(`http://localhost:${port}/user/${currentUser?.id}`)
                        .then((resp) => resp.json())
                        .then((user) => setUpdatedUser(user));
                    }
                  });
              }
            }}
          >
            Buy
          </button> */}
    </div>
  );
}

// test
