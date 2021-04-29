import React from "react";
import { useUserStore } from "../stores/userStore";

export const UserGreetingMessage = () => {
  const { user, isLoggedIn: isUserLoggedIn } = useUserStore((store) => ({
    isLoggedIn: store.isLoggedIn,
    user: store.isLoggedIn ? { username: store.user.username } : store.user,
  }));
  console.count("UserGreetingMessage");

  if (!isUserLoggedIn) {
    return (
      <section>
        <h1>Hello!</h1>
        <p>Please login to continue.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Hello {user.username}!</h1>
    </section>
  );
};
