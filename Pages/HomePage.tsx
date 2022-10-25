import React from "react";
import { Header } from "../Components/Header";
import { Instructor, User } from "../src/type";

type Props = {
  currentUser: User | null;
  signOutUser: () => void;
  currentInstructor: Instructor | null;
};
export function HomePage({signOutUser,currentUser,currentInstructor}:Props) {
  return (
    <div>
      <h1>Home Page</h1>
      <Header
        currentUser={currentUser}
        signOutUser={signOutUser}
        currentInstructor={currentInstructor}
      />
      <main></main>
      <footer></footer>
    </div>
  );
}
