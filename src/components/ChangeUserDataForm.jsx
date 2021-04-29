import React from "react";
import { useUserActions, useUserStore } from "../stores/userStore";

export const ChangeUserDataForm = () => {
  const { updateUser } = useUserActions();

  const { user, isLoggedIn: isUserLoggedIn } = useUserStore();
  console.count("ChangeUserDataForm");

  const [username, setUsername] = React.useState(user ? user.username : "");
  const [password, setPassword] = React.useState(user ? user.password : "");

  const onChange = (set) => (e) => set(e.target.value.trim());

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser({ user: { username, password } });
  };

  if (!isUserLoggedIn) {
    return (
      <section>
        <h1>Change User</h1>
        <p>Please login</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Change User</h1>

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

        <button>Change</button>
      </form>
    </section>
  );
};
