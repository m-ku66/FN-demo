"use client";
import React, { useState } from "react";
import Login from "../components/Login";
import useAuth from "../lib/hooks/useAuth";

/**
 * Conditionally rendering app content based on user auth
 * @param children(the page.tsx component and all of its elements)
 * @returns children if the user is authenticated, login screen of they aren't
 */

const ToDoAppLayout = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <div>
      <Login />
    </div>
  );
};

export default ToDoAppLayout;
