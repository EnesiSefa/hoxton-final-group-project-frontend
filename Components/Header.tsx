import React from "react";
import { Link } from "react-router-dom";
import { Instructor, User } from "../src/type";

type Props = {
  currentUser: User | null;
  signOutUser: () => void;
  currentInstructor: Instructor | null;
};

export function Header({ currentUser, signOutUser, currentInstructor }: Props) {
  return (
    <div>
      <header>
        <ul>
          {currentUser ? (
            <>
              <Link to="/courses">
                <li className="text-1xl text-gray-800 font-sans bg-gradient-to-br ">
                  Courses
                </li>
              </Link>
              {/* <li>
              <div className="dropdown">
                <button className="dropbtn">Categories</button>

                <div className="dropdown-content">
                  {categories.map((category) => (
                    <Link to={`/categories/${category.id}`} key={category.id}>
                      {" "}
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li> */}
              //{" "}
              <Link to={"/categories"}>
                //{" "}
                <li className="text-1xl text-gray-800 font-sans bg-gradient-to-br">
                  // Categories{" "}
                </li>
                //{" "}
              </Link>
              <Link to={"/favorite"}>
                <li className="text-1xl text-gray-800 font-sans bg-gradient-to-br">
                  Favorite
                </li>
              </Link>
              <li>
                <button
                  className="text-1xl text-gray-800 font-sans bg-gradient-to-br"
                  onClick={signOutUser}
                >
                  LogOut
                </button>
              </li>
            </>
          ) : (
            <>
              <Link to={"/signIn"}>
                <li className="text-3xl text-gray-500 font-sans bg-gradient-to-br ">
                  SignIn
                </li>
              </Link>
              <Link to={"/signUp"}>
                <li className="text-3xl text-gray-500 font-sans bg-gradient-to-br">
                  SignUp
                </li>
              </Link>
            </>
          )}
        </ul>
      </header>
    </div>
  );
}
