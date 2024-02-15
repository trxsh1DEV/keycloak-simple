// keycloak.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/", // URL do Keycloak
  realm: "Demo-Realm",
  clientId: "nodejs-microservice",
});

export const initKeycloak = () =>
  new Promise((resolve, reject) => {
    keycloak
      .init({
        onLoad: "login-required",
        scope: "openid",
        checkLoginIframe: true,
      })
      .then((authenticated) => {
        if (authenticated) {
          resolve(keycloak);
        } else {
          reject(new Error("Falha na autenticação do Keycloak"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export default keycloak;
