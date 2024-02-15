// src/components/Login.js
import { useKeycloak } from "@react-keycloak/web";

const Login = () => {
  const { keycloak } = useKeycloak();

  const login = () => {
    keycloak.login();
  };

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
