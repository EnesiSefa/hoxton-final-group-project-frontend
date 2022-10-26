import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { port } from "../src/port";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";

import { Category, Instructor, User } from "../src/type";

type Props = {
  currentUser: User | null;
  signOutUser: () => void;
  currentInstructor: Instructor | null;
};

export function Header({ currentUser, signOutUser, currentInstructor }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch(`http://localhost:${port}/categories`)
      .then((resp) => resp.json())
      .then((categoriesFromServer) => setCategories(categoriesFromServer));
  }, []);

  return (
    <div className="hader-section">
      <ul className="header-ul">
        {currentUser ? (
          <nav className="header">
            <Link to="/homePage">
              <h2 className="logo">Online Courses</h2>
            </Link>

            <Link to="/courses">
              <li className="header-li">Courses</li>
            </Link>
            <li>
              <div className="dropdown">
                <button className="dropbtn">Categories</button>

                <div className="dropdown-content">
                  {categories.map((category) => (
                    <Link to={`/categories/${category.id}`} key={category.id}>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <Link to={"/favorite"}>
              <li className="header-li">Favorite</li>
            </Link>

            <Box px={{ xs: 4 }}>
          <Link to={"/cart"}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="logo"
            >
              <ShoppingCartCheckoutSharpIcon />
            </IconButton>
          </Link>
        </Box>

            <li>
              <button className="logIn-btn" onClick={signOutUser}>
                LogOut
              </button>
            </li>
          </nav>
        ) : (
          <header className="signIn-signUp">
            {/* <Link to={"/signIn"}>
              <button>
                <li className="signIn-li">
                  SignIn
                </li>
                </button>
              </Link>
              <p>||</p>
              <Link to={"/signUp"}>
                <button>
                <li className="signUp-li">
                  SignUp
                </li>
                </button>
              </Link> */}
          </header>
        )}
      </ul>
    </div>
  );
}
