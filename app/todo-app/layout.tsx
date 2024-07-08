"use client";
import React, { useState } from "react";
import Login from "../components/Login";

/**
 * Conditionally rendering app content based on user auth
 * @param children(the page.tsx component and all of its elements)
 * @returns children if the user is authenticated, login screen of they aren't
 */

const ToDoAppLayout = ({ children }: { children: React.ReactElement }) => {
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <div>
      <Login />
    </div>
  );
};

export default ToDoAppLayout;
