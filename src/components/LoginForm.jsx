import React from "react";
import { useUserActions, useUserStore } from "../stores/userStore";

export const LoginForm = () => {
  const { login } = useUserActions();

  const { isLoggedIn: isUserLoggedIn } = useUserStore((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));
  console.count("LoginForm");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChange = (set) => (e) => set(e.target.value.trim());

  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  if (isUserLoggedIn) {
    return (
      <section>
        <h1>Login</h1>
        <p>You're already logged in.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <label>
          Username:
          <input value={username} onChange={onChange(setUsername)} />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={onChange(setPassword)}
          />
        </label>

        <button>Login</button>
      </form>
    </section>
  );
};
