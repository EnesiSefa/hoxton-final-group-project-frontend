import { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Course, Instructor, User } from "./type";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "../Pages/SignUp";
import { SignIn } from "../Pages/SignIn";
import { HomePage } from "../Pages/HomePage";
import { HomePageInstructor } from "../Pages/HomePageInstructor";
import { Home } from "../Pages/Home";
import { DetailPage } from "../Pages/DetailPage";
import { CategoryDetails } from "../Pages/CategoryDetails";
import { Header } from "../Components/Header";
import { port } from "./port";
import { Cart } from "../Pages/Cart";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentInstructor, setCurrentInstructor] = useState<Instructor | null>(
    null
  );
  const [error, setError] = useState<null | Array<string>>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course[]>([]);
  const refreshPage = () => {
    window.location.reload();
  };

  let navigate = useNavigate();

  function signInUser(data: any) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
    // localStorage.user = JSON.stringify(data.user);
    navigate("/home");
  }

  function signInInstructor(data: any) {
    setCurrentInstructor(data.instructor);
    localStorage.token = data.token;
    navigate("/home");
  }

  function signOutUser() {
    setCurrentUser(null);
    localStorage.clear();
    navigate("/signIn");
  }

  useEffect(() => {
    if (localStorage.token) {
      if (localStorage.user === "user")
        fetch(`http://localhost:${port}/validate/user`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
              console.log(data);
            } else {
              signInUser(data);
            }
          });
      if (localStorage.user === "instructor") {
        fetch(`http://localhost:${port}/validate/instructor`, {
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
      }
    }
  }, []);
  return (
    <div className="App">
      {/* <Header
        currentUser={currentUser}
        signOutUser={signOutUser}
        currentInstructor={currentInstructor}
      /> */}

      <Routes>
        <Route index element={<Navigate replace to="/signIn" />} />

        {currentUser && (
          <Route
            path="/courses"
            element={
              <HomePage
                currentUser={currentUser}
                signOutUser={signOutUser}
                currentInstructor={currentInstructor}
              />
            }
          />
        )}
        {currentInstructor && (
          <Route
            path="/coursesInstructor"
            element={
              <HomePageInstructor
                currentInstructor={currentInstructor}
                signOutUser={signOutUser}
              />
            }
          />
        )}

        <Route
          path="/home"
          element={
            <Home
              currentUser={currentUser}
              currentInstructor={currentInstructor}
              signOutUser={signOutUser}
            />
          }
        />

        <Route
          path="/course/:id"
          element={
            <DetailPage
              currentUser={currentUser}
              setSelectedCourse={setSelectedCourse}
            />
          }
        />
        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route
          path="/categories/:id"
          element={
            <CategoryDetails
              currentUser={currentUser}
              signOutUser={signOutUser}
              currentInstructor={currentInstructor}
            />
          }
        />

        <Route
          path="/signUp"
          element={
            <SignUp
              signInUser={signInUser}
              signInInstructor={signInInstructor}
            />
          }
        />
        <Route
          path="/signIn"
          element={
            <SignIn
              signInUser={signInUser}
              signInInstructor={signInInstructor}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              refreshPage={refreshPage}
              currentUser={currentUser}
              setError={setError}
              error={error}
              selectedCourse={selectedCourse}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// test
