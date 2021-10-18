import Head from "next/head";
import { useStateContext } from "../../HBOProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import ls from "local-storage";
import { useMounted } from "../../Hooks/useMounted";

const Login = () => {
  const globalState = useStateContext();
  const router = useRouter();
  const [loadingUsers, setLoadingUsers] = useState(false);

  let users = ls("users") !== null ? ls("users") : [];
  let { hasMounted } = useMounted();
  useEffect(() => {
    if (users < 1) {
      setLoadingUsers(false);
    }
    console.log("load effect", users);
  }, []);

  console.log("delcared users", users);

  const selectUser = (id) => {
    ls("activeUID", id);
    router.push("/");
  };

  const showUsers = () => {
    if (!loadingUsers) {
      return users.map((user) => {
        return (
          <div
            className="login-user__user-box"
            onClick={() => selectUser(user.id)}
            key={user.id}
          >
            <img
              className="login-user__user-img"
              src="https://i.pravatar.cc/300"
            />
            <div className="login-user__user-name">{user.user}</div>
          </div>
        );
      });
    }
  };

  const createUser = () => {
    router.push("/");
  };

  return (
    <div className="login-user">
      <div className="login-user__top">
        <div className="login-user__logo" />
        <span className="login-user__title">Who Is Watching?</span>
      </div>

      <div className="login-user__form">{hasMounted ? showUsers() : ""}</div>
      <div className="login-user__buttons">
        <button className="login-user__kid" onClick={createUser}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default Login;
