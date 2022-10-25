import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { port } from "../src/port";

type Props = {
  signInUser: (data: any) => void;
  signInInstructor: (data: any) => void;
};
export function SignUp({ signInUser, signInInstructor }: Props) {
  const navigate = useNavigate()
  return (
    <div>
      <div className="bg-white py-8 shadow sm:rounded-lg sm:px-10">
        <h1></h1>
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            const user = {
              //@ts-ignore
              name: event.target.name.value,
              //@ts-ignore
              lastName: event.target.name.value,
              //@ts-ignore
              email: event.target.email.value,
              //@ts-ignore
              password: event.target.password.value,
            };
            console.log(user);
            //@ts-ignore
            if (event.target.answer.value === "user") {
              fetch(`http://localhost:${port}/sign-up/user`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  if (data.error) {
                    alert(data.error);
                  } else {
                    signInUser(data);
                    navigate("/signIn");
                  }
                });
              localStorage.user = "user";
            } else {
              const instructor = {
                //@ts-ignore
                name: event.target.name.value,
                //@ts-ignore
                lastName: event.target.name.value,
                //@ts-ignore
                email: event.target.email.value,
                //@ts-ignore
                password: event.target.password.value,
              };
              fetch(`http://localhost:${port}/sign-up/instructor`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(instructor),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  if (data.error) {
                    alert(data.error);
                  } else {
                    signInInstructor(data);
                  }
                });
              localStorage.instructor = "instructor";
            }
          }}
        >
          <div >
            <div className="Sing-Up-As">
              <h2 className="text-3xl font-bold text-blue-900 mb-5">
                Sing Up As:
              </h2>
              <select name="answer">
                <option value="user" className="font-bold  text-blue-500">
                  <h2 className="text-blue-500 font-medium">User</h2>
                </option>
                <option value="instructor" className="font-bold  text-blue-500">
                  Instructor
                </option>
              </select>
            </div>
          </div>
          <div className="sign-up">
          <div>
            <div className="text-center">
              <h2 className="text-3xl font-bold  text-blue-600">Sign Up</h2>
              <div className="sign-up--input">
                <input
                  className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  type="text"
                  name="name"
                  placeholder="Enter your name ..."
                />
              </div>
              <div>
                <input
                  className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  type="text"
                  name="lastName"
                  placeholder="Enter your lastName ... "
                />
              </div>
              {/* <div>
                <input
                  className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  name="image"
                  placeholder="Enter your image url..."
                />
              </div> */}
              <div>
                <input
                  // className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  required
                />
              </div>
              <div>
                <input
                  // className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                
              >
                Sign Up
              </button>
            </div>
          </div>
          </div>
        </form>
        
      </div>
    </div>
   
  );
}
