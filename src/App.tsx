import { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Instructor, User } from "./type";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentInstructor, setCurrentInstructor] = useState<Instructor | null>(
    null
  );

  let navigate = useNavigate();

  function signInUser(data: any) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
    // navigate("/home");
  }
  function signInInstructor(data: any) {
    setCurrentInstructor(data.instructor);
    localStorage.token = data.token;
  }

  function signOutUser() {
    setCurrentUser(null);
    localStorage.removeItem("token");
    navigate("/signIn");
  }

  useEffect(() => {
    if (localStorage.token) {
      if (localStorage.user === "user")
        fetch(`http://localhost:4166/validate/user`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              signInUser(data);
            }
          });
    } else
      fetch(`http://localhost:4166/validate/instructor`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            signInInstructor(data);
          }
          console.log(data);
        });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/signUp" element={<SignUp signInUser={signInUser} />} />
        <Route
          path="/signIn"
          element={
            <SignIn
              signInUser={signInUser}
              signInInstructor={signInInstructor}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
