// api.js
import axios from "axios";
import { initKeycloak } from "../config/keycloak";

const api = axios.create({
  baseURL: "http://localhost:3000", // Sua URL do backend
});

export const securedApi = async () => {
  const keycloak = await initKeycloak();
  const token = keycloak.token;
  console.log("-------------------------------------------");
  console.log(keycloak.idTokenParsed);
  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
