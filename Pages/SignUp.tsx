import React from "react";

type Props = {
  signInUser: (data: any) => void;
};
export function SignUp({ signInUser }: Props) {
  return (
    <div>
      <div className="bg-white py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();

            const user = {
              //@ts-ignore
              name: event.target.name.value,
              //@ts-ignore
              lastName: event.target.lastName.value,
              //   @ts-ignore
              profilePic: event.target.profilePic.value,
              // @ts-ignore
              email: event.target.email.value,
              //@ts-ignore
              password: event.target.password.value,
            };
            fetch(`http://localhost:4166/sign-up/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  alert(data.error);
                } else {
                  signInUser(data);
                }
              });
            console.log(user);
          }}
        >
          <div className="flex flex-col justify-center py-12 border-gray-400">
            <div className="text-center">
              <h2 className="text-3xl font-bold  text-blue-600">Sign Up</h2>
              <div>
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
              <div>
                <input
                  className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  name="image"
                  placeholder="Enter your image url..."
                />
              </div>
              <div>
                <input
                  className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  required
                />
              </div>
              <div>
                <input
                  className="w-full rounded-md border border-blue-300 p-2 mt-3"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 text-white mt-5"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
