"use client";
import React, { useState } from "react";
import style from "../styles/style";

const Login = () => {
  const [loading, setloading] = useState<boolean>(false);
  function handleSignIn() {
    alert("signed in");
  }

  function handleSignUp() {
    alert("signing up");
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
            onSubmit={handleSignUp}
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
