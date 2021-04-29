import "./App.css";
import { LoginForm } from "../LoginForm";
import { UserStoreProvider } from "../../stores/userStore";
import { LogoutButton } from "../LogoutButton";
import { ChangeUserDataForm } from "../ChangeUserDataForm";
import { UserGreetingMessage } from "../UserGreetingMessage";

function App() {
  console.count("App");

  return (
    <UserStoreProvider>
      <div className={"App"}>
        <UserGreetingMessage />
        <LoginForm />
        <ChangeUserDataForm />
        <LogoutButton />
      </div>
    </UserStoreProvider>
  );
}

export default App;
