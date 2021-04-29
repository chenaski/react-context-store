import React from "react";
import "./App/App";
import { useUserActions, useUserStore } from "../stores/userStore";

export const LogoutButton = () => {
  const { logout } = useUserActions();

  const { isLoggedIn: isUserLoggedIn } = useUserStore((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));
  console.count("LogoutButton");

  if (!isUserLoggedIn) {
    return null;
  }

  return <button onClick={logout}>Logout</button>;
};
