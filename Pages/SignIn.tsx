import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { port } from "../src/port";

type Props = {
  signInUser: (data: any) => void;
  signInInstructor: (data: any) => void;
};

export function SignIn({ signInInstructor, signInUser }: Props) {
  let navigate = useNavigate();
  return (
    <div>
      <h2>
        <Link to={"/signUp"}> go to Sign Up</Link>
      </h2>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            const user = {
              //@ts-ignore
              email: event.target.email.value,
              //@ts-ignore
              password: event.target.password.value,
            };
            console.log(user);
            //@ts-ignore
            if (event.target.answer.value === "user") {
              fetch(`http://localhost:${port}/sign-in/user`, {
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
                    navigate("/homePage");
                  }
                });
              localStorage.user = "user";
            } else {
              const instructor = {
                //@ts-ignore
                email: event.target.email.value,
                //@ts-ignore
                password: event.target.password.value,
              };
              fetch(`http://localhost:${port}/sign-in/instructor`, {
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
          <div className="sign-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-900 mb-5">
                Sing In As
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

            {/* <h2>Sign In</h2> */}
            <div>
              <input
                // className="w-full rounded-md border border-blue-300 p-2 mt-3"
                type="email"
                name="email"
                required
              />
            </div>
            <div>
              <input
                // className="w-full rounded-md border border-blue-300 p-2 mt-3"
                type="password"
                name="password"
                required
              />
            </div>
            <button
              // className="w-full rounded-md bg-blue-600 py-2 text-white mt-5"
              onChange={() => {}}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
