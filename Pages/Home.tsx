import React from "react";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { Instructor, User } from "../src/type";
type Props = {
  currentUser: User | null;
  currentInstructor: Instructor| null;
  signOutUser: () => void;
};
export function Home({currentInstructor,currentUser,signOutUser}: Props) {
  return (
    <div>
      <Header currentInstructor={currentInstructor} currentUser={currentUser} signOutUser={signOutUser}/>
      <div className="home"></div>
      <Footer />
    </div>
  );
}
