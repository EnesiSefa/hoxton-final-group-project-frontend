import React from "react";
import { Header } from "../Components/Header";
import { User } from "../src/type";

type Props = {
currentUser:User| null
}
export  function HomePage({}) {
  return (
    <div>
      <h1>Home Page</h1>
      <Header currentUser={currentUser} signOutUser={signOutUser} currentInstructor={currentInstructor}/>
      <main></main>
      <footer></footer>
      
    </div>
  );
}
