import { Button } from "@mui/material";
import { User } from "../src/type";
import React from "react";

type Props = {
  currentUser: User | null;
};
export function EmptyCart({ currentUser }: Props) {
  if (!currentUser) return <h1>Loading..</h1>;

  return (
    <section className="basket-container">
      <h2>{currentUser.name}'s Cart</h2>
      <ul>
        <article className="basket-container__item">
          Your cart is empty!
        </article>
      </ul>
      <div className="buy">
        <h3>Your total: {0} €</h3>
        <Button variant="contained" color="success" className="btn">
          Buy
        </Button>
      </div>
    </section>
  );
}
