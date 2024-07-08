"use client";
import React, { useState } from "react";
import style from "../styles/style";
import { auth } from "../lib/firebase/clientApp";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Login = () => {
  const [loading, setloading] = useState<boolean>(false);

  //handles logging in
  function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    //prevent default refresh behavior and set local email and pass values to user inputted email and pass
    e.preventDefault();
    let email = e.currentTarget.email.value;
    let pass = e.currentTarget.password.value;
    setloading(true);

    //Call firebase signin method, passing auth, email, and pass as params, then set loading to false and log user creds upon success
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log(userCredential);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(`${error} has occurred. Please try again later...`);
        setloading(false);
      });
  }

  function handleSignUp() {
    let email = document.getElementsByName("email")[0] as HTMLInputElement;
    let pass = document.getElementsByName("password")[0] as HTMLInputElement;
    setloading(true);

    //create a new user in the firebase backend
    createUserWithEmailAndPassword(auth, email.value, pass.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setloading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(error);
        alert(
          `Error "${errorCode}: ${errorMsg}" has occured. Either contact the admin of this app or try again later...`
        );
        setloading(false);
      });
  }

  return (
    <div className="container max-w-full h-screen flex justify-center items-center">
      <div className="flex justify-center">
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-5 w-[250px] min-w-fit items-center justify-center"
        >
          <h1 className="text-[2rem] font-semibold">Sign In</h1>
          <input
            className={`w-full ${style.inputStyles.lightThemeInput}`}
            type="email"
            name="email"
            placeholder="Enter Email"
            required
          />
          <input
            className={`w-full ${style.inputStyles.lightThemeInput}`}
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
          <button
            className={`w-full ${style.buttonStyles.lightThemeButton}`}
            type="submit"
          >
            Sign In
          </button>
          <button
            className={`w-full ${style.buttonStyles.lightThemeButtonAlt}`}
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <p>{loading ? "Signing in..." : ""}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
