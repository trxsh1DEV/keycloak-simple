// src/components/Logout.js
import { useKeycloak } from "@react-keycloak/web";

const Logout = () => {
  const { keycloak } = useKeycloak();

  const logout = () => {
    keycloak.logout();
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
